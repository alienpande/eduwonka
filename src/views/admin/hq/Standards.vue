<template>
  <div v-loading="loading">
  <e-container
    class="hq-standards"
    :pageTitle="account_settings.standard_label"  btnIcon="el-icon-plus" 
    :btnText= (text)+(account_settings.standard_label)
    @btnClick="addNewStandard">

    <p class="heading">Below is the list of details for each Standard of School</p>
    <div>

    <!-- <el-row  class="searchCard">
      <el-col :span="5"  class="dropdown-tab">
        <el-dropdown >
          <span class="el-dropdown-link primary-text text" primary>
            Standard<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in sections" :key="item.id" :command="item.id">{{ item.standard.name + ' ' + item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3" class=" primary-text dropdown-tab">
        <div @click="getSections()" class="text"> Clear filter </div>
      </el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>      
    </el-row> -->
      
      <el-row class="standard-list">
        <el-col :span="22" :offset="1" v-for="(item, index) in standards" v-bind:item="item" v-bind:key="index" style="margin: 0px;width: 100%;">
          <div class="standard-menu" @click="showStandardMenu(item)">
            <el-row class="standard-card" >
              <el-col
                
                  :span="4"
                  style="
                "
              >
                {{ item.name }}
              </el-col>
              <el-col :span="14" style="">
                <table style="width: 100%; padding: 15px 0px">
                  <tr>
                    <td>{{ account_settings.section_label }}s</td>
                    <td>Students</td>
                    <td>Teachers</td>
                  </tr>
                  <tr
                    v-for="(i, index) in item.standard_sections"
                    v-bind:item="i"
                    v-bind:key="index"
                  >
                    <td style="text-transform: uppercase;font-weight: bold;font-size:large">{{ i.name }}</td>
                    <td style="text-transform: uppercase;font-weight: bold;font-size:large">{{ i.section_students.length }}</td>
                    <td style="text-transform: uppercase;font-weight: bold;font-size:large">{{ i.section_teachers.length }}</td>
                  </tr>
                </table>
              </el-col>
              <el-col class="hq-standards-section-text" :span="5" style="">
                <div style="padding: 8px 15px;background: #f0f0f0;font-weight: bold;" class="primary-text">
                  Add {{ account_settings.section_label }}
                </div>
              </el-col>
            </el-row>
            <div style="width: 130px"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { mapMutations } from "vuex"
import { getId } from '@/util/auth'
import { Routes } from "@/util/menus/hq.menus"
export default {
  data() {
    return {
      loading: true,
      standards: [],
      account_settings: {},
      text: 'Add New '
    };
  },
  created() {
    this.getAccountSettingId()
    this.getStandards()
  },
  mounted() {
    this.hideAsideMenuMobile();
  },
  methods: {
    ...mapMutations("Common", ["setStandardMenu","hideAsideMenuMobile"]),
    addNewStandard() {
      this.$router.push(this.$url.HQ_STANDARD_FORM);
    },
    showStandardMenu(i) {

      const defaultRoutes = [
        {
          id: 22,
          title: "Students",
          to: `${Routes.HQ_STANDARD_STUDENTS}/${i.id}`,
        },
        {
          id: 23,
          title: "Teachers",
          to: `${Routes.HQ_STANDARD_TEACHERS}/${i.id}`,
        },
        {
          id: 24,
          title: "Inactive Students",
          to: `${Routes.HQ_STANDARD_INACTIVE_STUDENTS}/${i.id}`,
        },
      ];

      this.setStandardMenu({
        title: `Standard ${i.standard}`,
        routes: defaultRoutes,
        standard: i.standard,
        sections: i.sections,
      });
      this.$router.push(`${Routes.HQ_STANDARD_STUDENTS}/${i.id}`);
    },
    getStandards() {
      const query = `query {
        standards {
          id
          name
          standard_sections {
            id
            name
            section_students {
              id
            }
            section_teachers {
              id
              teacher_id
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standards = response.standards
      })
    },

    getAccountSettingId(){
      const query = `
        query user($id: uuid!) {
          users_by_pk(id: $id) {
            id
            account{
              id
              account_settings{
                id
              }
            }
          }
        }
        `
        dispatchGraphql(query, { id: getId() }).then(response => {
          this.users = response.users_by_pk
          const account_setting_id = this.users.account.account_settings[0].id
          this.getAccountSettings(account_setting_id)

        })
    },
    getAccountSettings(account_setting_id) {
      const query =`query account_setting($id: uuid!){
          account_settings_by_pk(id: $id) {
          standard_label
          section_label
        }
      }`
      dispatchGraphql(query, { id: account_setting_id }).then((response) => {
        this.account_settings = response.account_settings_by_pk
        this.loading = false
        console.log('AccountSettingsFetch', this.account_settings)
      })
    }
  },
  // destroyed() {
  //   this.setStandardMenu({ title: "", routes: [] });
  // },
};
</script>
<style scoped>
.standard-list {
  height: 80px;
  padding: 30px 0px 30px 0px;
  cursor: pointer;
}
.standard-menu {
  height: 150px;
  box-shadow: 0px 13px 21px #0000000d;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
}
.standard-menu .el-row::after,
.standard-menu .el-row::before{
  display: none;
}


@media only screen and (device-width: 768px) {
  .standard-list {
    padding: 15px 7px 15px 7px;
  }
}

@media only screen and (max-width:767px){
  .standard-menu,
  .standard-menu > .el-row,
  .standard-menu > .el-row > div:first-child
  {
    height:auto !important;
  }
  .standard-menu > .el-row{
    flex-direction: column;
  }

  .standard-menu > .el-row > div:first-child{
    border-radius: 10px 10px 0px 0px !important;
    padding-top: 30px !important;
    padding-bottom: 30px;
  }
  .standard-menu > .el-row > div:not(:last-child){
    width: 100% !important;
  }  
  .standard-menu > .el-row > div:not(:first-child){
    align-self:auto !important;
    margin-left: 0px !important;
  }

}
</style>