<template>
  <div>   
    <div style="width: 100%; margin: auto">
      <div style="margin-bottom: 10px; font-weight: bold">
        Audience selection
      </div>
      <el-row class="view-no-form">
        <el-col :span="9">
          <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny">
            <div style="display: flex" @click="studentAudience()">
              <e-svg style="margin-right: 10px" icon="AllStudents" /> All the students of the class
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <div @click="handleCustomAudience">
            <el-card shadow="none" class="rounded-08 elimeny">
              <div style="display: flex">
                <e-svg style="margin-right: 10px" icon="customselection" />Make a custom selection
              </div>
            </el-card>
          </div>
        </el-col>
        <div style="display: inline-flex; margin-top: 10px">
          <e-svg icon="Group" />
          <div style="margin-left: 11px;opacity: 0.4;font-size: 14px;padding-right: 20px;">
            I got it working as a custom head script but I am not sure how to
            get the window object call working.
          </div>
        </div>
      </el-row>

      <e-dialog :title="'Custom audience selection '" v-model="addStudentDialog" width="60%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="addStudentDialog = false" @confirm="addStudentDialog = false">
        <el-col :span="24" style="margin-bottom: 20px; margin-top: -30px; padding-bottom: 20px; font-size: 12px; display: flex; justify-content: space-between; border-bottom: 2px solid rgb(252, 223, 189);">
          <div style="width: 350px; opacity: 0.6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
            venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
          </div>
          <div>
            <e-button icon="el-icon-search" :plain="true" size="small" type="primary"></e-button>
          </div>
        </el-col>
        <el-row :gutter="20" style="margin-bottom: 15px">
          <el-col :span="6" style="font-size: 18px; font-weight: bold; padding-left: 20px">
            {{ customAudience.length + 'Students' }}
          </el-col>
          <el-col :span="4"></el-col>
          <el-col :span="4" :offset="10" class="primary-text">
            <e-button :span="4" label="Deselect All" width="100" css="cancel_btn" @click="deselectCustom" />
          </el-col>
          <el-col :span="4">
            <e-button :span="10" label="Done" width="100" @click="addStudentDialog = false"></e-button>
          </el-col>
        </el-row>
        <selection-card :users="customAudience" :audience="audience" @input="handleCustomSelect" @deselect="deselectCustomSelect" />
        <el-col>
          <el-pagination @current-change="currentPage" @size-change="sizeChange" @prev-click="previousClick" @next-click="nextClick" background layout="prev, pager, next" style="text-align: center" :total="50" />
        </el-col>
      </e-dialog>
    </div>
    <el-row class="form-last-buttons">
      <!-- <el-col :span="16">
        <div style="display: inline-block"></div>
      </el-col> -->
      <!-- <el-col :span="4"> -->
        <e-button :span="4" label="Cancel" :plain="true" width="140" css="float-right cancel_btn " class="p-45" />
      <!-- </el-col> -->
      <!-- <el-col :span="4"> -->
        <e-button :span="10" label="Create a classroom" width="220" css="float-right" class="p-45" @click="createAudience" />
      <!-- </el-col> -->
    </el-row>
  </div>
</template>
<script>
import selectionCard from "@/components/school/EventCalender/selectionCard.vue"
import { mapGetters } from "vuex";
import { dispatchGraphql } from "@/api/dispatcher";
export default {
  components: { selectionCard },
  props: {
    tabOneData: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    addStudentDialog: false,
    query: `query ($id: uuid!) {
      standards_by_pk(id: $id) {
        id
        standard_sections {
          id
          section_students {
            id
            first_name
            role
          }
        }
      }
    }`,
    standard: {},
    audience: [],
    customAudience: []
  }),
  computed: {
    ...mapGetters("Common", ["standardMenu"]),
  },
  created() {
    this.getStandard()
  },
  methods: {
    getStandard() {
      dispatchGraphql(this.query, { id: this.tabOneData.standard_id } ).then(response => {
        this.standard = response.standards_by_pk
      })
    },
    handleCustomAudience() {
      var audience = []
      for (const section of this.standard.standard_sections) {
        for (const student of section.section_students) {
          audience.push(student)
        }
      }
      if (audience.length > 0) {
        this.customAudience = audience
        this.addStudentDialog = true
      }
    },
    studentAudience() {
      for (const section of this.standard.standard_sections) {
        section.section_students.map(x => {
          this.audience.push({
            user_id: x.id,
            audienceable_id: this.tabOneData.classroom_id,
            audienceable_type: 'Classroom',
            status: 'pending',
            user_type: x.role
          })
        })
      }
      this.$notify({
        type: 'success',
        title: 'Saved'
      })
      console.log('studentaud', this.audience)
    },
    handleCustomSelect(val) {
      console.log('val', val)
      this.audience.push({
        user_id: val.id,
        audienceable_id: this.tabOneData.classroom_id,
        audienceable_type: 'Classroom',
        status: 'pending',
        user_type: val.role
      })
      console.log('handleCustomSelect', this.audience)
    },
    deselectCustomSelect(val) {
      const user = this.audience.filter(x => x.id === val.id)[0]
      const index = this.audience.indexOf(user)
      this.audience.splice(index, 1)
      console.log('aud', this.audience)
    },
    deselectCustom() {
      for (const item of this.customAudience) {
        const user = this.audience.filter(x => x.id === item.id)[0]
        const index = this.audience.indexOf(user)
        this.audience.splice(index, 1)
      }
      console.log('aud', this.audience)
    },
    createAudience() {
      const mutation = `mutation($objects: [audiences_insert_input!]!){
        insert_audiences(objects: $objects) {
          affected_rows
          returning {
            id
            user_type
          }
        }
      }`
      dispatchGraphql(mutation, this.getAudience()).then(response => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Classroom Audience Added'
        })
        this.$router.push(this.$url.LN_CLASSROOM)
      })
    },
    getAudience() {
      return {
        "objects": this.audience
      }
    },
    currentPage(i) {
      this.emitPager(i);
    },
    nextClick() {
      this.pageEvent = "NextClick";
    },
    previousClick() {
      this.pageEvent = "PreviousClick";
    },
    sizeChange(i) {
      this.pageEvent = "SizeChanged";
      console.log(i);
    },
  },
};
</script>
<style>
.elimeny:hover {
  border: 1px solid #bc6c42;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  color: #bc6c42;
  cursor: pointer;
}
.cancel_btn {
  font-weight: bold;
  background: transparent !important;
  border: none !important;
  color: #bc6c42 !important;
}
</style>
