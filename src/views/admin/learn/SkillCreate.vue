<template>
  <div>
    <e-container class="learn-add-skill" hideHeader pageTitle="Create skill" :back="$url.LN_SKILL">
      <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width: 300px" />
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <div class="form-type-3">
        <el-row :rules="rules" >
          <el-col :span="5" :offset="2">
            <e-input label="Name of the skill" class="custom-input" placeholder="Enter Skill" v-model="skill.name" rules="required" />
          </el-col>
          <el-col :span="3" :offset="1">
            <e-select label="Category" class="select-dropdown" placeholder="Select Category" v-model="skill.category_id" :options="categories" :optionName="'name'" :valueKey="'id'" @visible-change="verifyCategory" rules="required" />
          </el-col>
          <el-col :span="3" :offset="1">
            <e-select label="Standard" :span="24" class="select-dropdown" placeholder="Select Standard" v-model="skill.standard_id" :options="standards" :optionName="'name'" :valueKey="'id'" @visible-change="verifyStandard" rules="required" />
            <br /><br /><br /><br />
            <div class="d-flex" style="width: 100%">
              <e-svg icon="Group"></e-svg>
              <div style="margin-left: 10px; color: #000000; opacity: 0.6">
                All the above class students will have access to this skill
              </div>
            </div>
          </el-col>
        </el-row>
        <el-col :span="5" :offset="2" :rules="rules">
          <e-select label="Assign a mentor" class="select-dropdown" placeholder="Select Mentor" v-model="skill.mentor_id" :options="mentors" :optionName="'first_name'" :valueKey="'id'" @visible-change="verifyMentor" rules="required" />
        </el-col>
        <br /><br /><br /><br />
      </div>
        <el-row style="border-top: 1px solid #fcdfbd;margin-top: 20px;padding-bottom: 15px;" class="form-last-buttons">
          <!-- <el-col style="float: right" :span="9" class="form-last-buttons wd-full"> -->
            <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
            <e-button :span="8" label="Proceed" width="200" @click="handleSubmit(handleClick)" css="float-right" class="p-45" />
          <!-- </el-col> -->
        </el-row>
        </ValidationObserver>
    </e-container>
  </div>
</template>
<script>
// import certificateForm1 from "../../components/learn/certificate/certificateForm1.vue";
// import certificateForm2 from "../../components/learn/certificate/certificateForm2.vue";
import { mapMutations } from "vuex";
import eSelect from "@/controls/eSelect.vue";
import { dispatchGraphqlQuery , dispatchGraphql , dispatchGraphqlMutation } from "@/api/dispatcher"
export default {
  components: { eSelect },
  //   components: { certificateForm1,certificateForm2 },
  data: () => ({
    activeTab: 1,
    categories: [],
    standard_sections: [],
    standards: [],
    mentors: [],
    rules: {},
    steps: [
      {
        id: 1,
        icon: "hq/healthRecords",
        title: "Details",
      }
    ],
    skill: {},
  }),
  methods: {
    verifyStandard(value) {
      this.skill.standard_id = value
    },
    verifyMentor(value) {
      this.skill.mentor_id = value 
    },
    verifyCategory(value) {
     this.skill.category_id = value
    },
    handleClick() {
      dispatchGraphqlMutation('skills', ['id', 'name','category_id', 'mentor_id'], this.skill).then((response) => {
        console.log(response)
        this.$router.push(this.$url.LN_SKILL)
      })
    },
    getData() {
      const query = `query {
        users (where:  {role: {_eq: "teacher"}}) {
          id
          first_name
        }
      }`
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
        dispatchGraphqlQuery('categories', ['id', 'name']).then((response) => {
          this.categories = response.categories
          dispatchGraphql(query).then((response) => { 
            this.mentors = response.users
          })
        })
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
    this.getData()
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
