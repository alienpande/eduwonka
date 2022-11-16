<template>
<div  v-loading="loading">
  <e-container class="hq-add-class" hideHeader :pageTitle=  (text)+(this.account_settings.standard_label)
  :back="$url.HQ_STANDARDS">
    <e-steps

      width="350px"
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
    ></e-steps>

    <standard-form-tab-1
      v-if="activeTab == 1"
      @save="getStandardId"
    />
    <!-- @save="activeTab = 2;scrollTop();" -->
    <standard-form-tab-2
      ref="tab2"
      :standard="standard_id"
      v-if="activeTab == 2"
      @back="activeTab = 1"
      @save="activeTab = 3"
    />
  </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { mapMutations } from "vuex";
import { getId } from '@/util/auth'
import StandardFormTab1 from "@/components/hq/Standards/StandardForm.Tab1.vue";
import StandardFormTab2 from "@/components/hq/Standards/StandardForm.Tab2.vue";
export default {
  components: {
    StandardFormTab1,
    StandardFormTab2,
  },
  data() {
    return {
      account_settings: {},
      text: 'Add ',
      activeTab: 1,
      loading: true,
      standard_id: '',
      student: {
        name: "",
        gender: "female",
      },
      qualifications: [
        {
          label: "Post-Graduation",
          value: "pg",
        },
        {
          label: "Graduation",
          value: "g",
        },
        {
          label: "Secondary School",
          value: "ss",
        },
      ],
      profession: [
        {
          label: "Buisness",
          value: "business",
        },
        {
          label: "Service",
          value: "service",
        },
        {
          label: "Home Maker",
          value: "homemaker",
        },
      ],
      steps: [
        {
          id: 1,
          icon: "hq/standards",
          title: "Details",
        },
        {
          id: 2,
          icon: "hq/healthRecords",
          title: "Sequencing",
        },
      ],
    };
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    addNewStudent() {
      alert("asasd");
    },
    getStandardId(id){
      this.activeTab = 2
      console.log('standard_id_emit', id)
      this.standard_id = id
    },
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
    getAccountSettingId(){
      const query = `query user($id: uuid!) {
        users_by_pk(id: $id) {
          id
          account{
            id
            account_settings {
              id
              standard_label
              section_label
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then(response => {
        this.users = response.users_by_pk
        this.account_settings = this.users.account.account_settings[0]
        this.loading = false
        // const account_setting_id = this.users.account.account_settings[0].id
        // this.getAccountSettings(account_setting_id)
      })
    },
    getAccountSettings(account_setting_id) {
      console.log(account_setting_id)
      const query =`query {
        account_settings_by_pk(id: "${account_setting_id}) {
          standard_label
          section_label
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.account_settings = response.account_settings_by_pk
        this.loading = false
        console.log('AccountSettingsFetch', this.account_settings)
      })
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
    this.getAccountSettingId()
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style scoped>
.label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.e-form {
  background-color: white;
  height: auto;
  overflow-x: hidden;
}
</style>