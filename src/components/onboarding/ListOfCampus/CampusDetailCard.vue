<template>
  <el-row
    style="
      background: #ffffff 0% 0% no-repeat padding-box;
      border-radius: 10px;
      padding: 30px 0px;
    "
    :gutter="gutter"
    :styles="style2"
  >
    <el-col :span="window.width > 767 ? 8 : 24">
      <el-row>
        <el-col :span="4">
          <e-svg icon="campus-primary" />
        </el-col>
        <el-col :span="20" class="h3">{{ campus.name }}</el-col>
      </el-row>
      <!-- <el-progress :percentage="getPercentage(campus)" :campus="campus" class="mt30" /> -->
      <progress-bar :campusid="campus.id" class="mt-30" />
      <el-row>
        <e-button
          :span="24"
          :label="label"
          :type="50 === 100 ? 'text' : 'primary'"
          class="mt30"
          @click="redirectTo"
        />
      </el-row>
    </el-col>
    <el-col :span="window.width > 767 ? 12 : 24" :style="window.width > 767 ? 'border-left: 1px solid #ececec' : 'border-top: 1px solid #ececec; padding-top: 30px; margin-top: 30px;'">
      <el-row>
        <el-col :span="24" v-for="(item, index) in keyValues" :key="index">
          <e-key-value :span="12" :item="item" keyCss="h5" valueCss="h5" />
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="window.width > 767 ? 4 : 24">
      <e-more-menu
        @edit="editCampus"
        @delete="deleteCampus"
        @default="setAsDefault"
        style="display: block; position: absolute; right: 15px; top: 0px"
      >
      </e-more-menu>
    </el-col>
    <e-dialog
      title="Please Provide the details to add the campus"
      v-model="addCampusPopup"
      width="50%"
      top="10vh"
      noEsc
      @cancel="addCampusPopup = false"
      @confirm="handleClick"
    >
      <e-input label="Campus Name" v-model="campus.name" />
      <e-input
        label="Description of campus"
        type="textarea"
        v-model="campus.description"
      />
      <e-input label="Permanent Address" v-model="campus.address" />
      <e-input label="Email Address of Admin" v-model="admin.email"/>
      <e-input label="Academic Year" v-model="academic_year.name" />
      <e-date-picker v-model="academic_year.start_date" placeholder="Pick a Date" label="Year Start Date" @change="handleStartDate" />
      <e-date-picker v-model="academic_year.end_date" placeholder="Pick a Date" label="Year End Date" @change="handleEndDate" />
    </e-dialog>
    <div>
      <el-dialog title="Please Select Academic Year" :append-to-body="true" :visible.sync="dialogBox" width="40%" :before-close="updateViewDialogBoxValue">
        <div class="pd-10">
          <el-row class="mg-t-20" v-for="academic_year in campus.academic_years" :key="academic_year.id">
            <el-col :span="10" class="mg-t-10">
              <span class="tx-18">{{academic_year.name}}</span>
            </el-col>
            <el-col :span="7" :offset="1">
              <e-button
                label="set as default"
                type="primary"
                :disabled="academic_year.id === user.default_academic_year_id ? true : false"
                @click="handleSubmit(academic_year.id)"
              />
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
          <!-- <el-button class="hash-btn-r" style="height: 38px;" @click="handleSubmit()">Proceed</el-button> -->
        </span>
      </el-dialog>
    </div>
  </el-row>
</template>
<script>
import eButton from "@/controls/eButton.vue";
import ProgressBar from "@/components/onboarding/ProgressBar";
import { dispatchGraphql, dispatchGraphqlMutation } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
import screenSize from '@/mixins/screenSize'
export default {
  components: { eButton, ProgressBar },
  mixins: [screenSize],
  props: {
    campus: {
      type: Object,
    },
    style2: {
      type: String,
    },
    gutter: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      dialogBox: false,
      user: {},
      academic_year: {},
      admin:{
        academic_year_ids: []
      },
      addCampusPopup: false,
      menu: [{ text: "Edit" }, { text: "Delete" }],
    };
  },
  computed: {
    label() {
      const p = 50;
      switch (p) {
        case 100:
          return "Onboarding Completed";
        case 0:
          return "Onboard Campus";
        default:
          return "Continue Onboarding";
      }
    },
    keyValues() {
      const kvs = [];
      if (this.campus.address) {
        kvs.push({ key: "Address", value: this.campus.address });
      }
      if (this.campus.campus_code) {
        kvs.push({ key: "Campus Code", value: this.campus.campus_code });
      }
      if (this.campus.email) {
        kvs.push({ key: "Email", value: this.campus.email });
      }
      if (this.campus.academic_years) {
        kvs.push({ key: "Academic year", value: this.campus.academic_years[0].name });
      }
      return kvs;
    },
  },
  created(){
    this.getUser()
  },
  methods: {
    handleSubmit: function(academicYearId){
      dispatchGraphqlMutation('users', ['id'], {id: getId(), default_academic_year_id: academicYearId}).then((response) => {
        console.log(response)
        this.dialogBox = false
        this.$router.push(`/`);
      })
    },
    updateViewDialogBoxValue: function(){
      this.dialogBox = false
    },
    getUser() {
      const query = `query($id: uuid!) {
        users_by_pk(id:$id) {
          id
          account_id
          academic_year_ids
          default_academic_year_id
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.user = response.users_by_pk
      })
    },
    handleStartDate(val) {
      this.academic_year.start_date = moment(val).format('')
    },
    handleEndDate(val) {
      this.academic_year.end_date = moment(val).format('')
    },
    handleClick() {
      delete this.academic_year.users
      delete this.campus.standards
      delete this.campus.subjectssetAsDefault
      delete this.campus.setting
      delete this.campus.exam_types
      delete this.campus.account
      delete this.campus.fee_line_items
      delete this.campus.payslip_line_items
      delete this.campus.academic_years
      dispatchGraphqlMutation('campuses', ['id'], this.campus).then((response) => {
        console.log('Final Resp', response)
        const academicMutation = this.academic_year.id ? this.academicUpdateMutation : this.academic_Mutation
        dispatchGraphql(academicMutation, this.getFilterVariables(this.academic_year)).then((response) => {
          console.log('academic', response)
          if (!this.academic_year.id) {
            this.academic_year.id = response.insert_academic_years_one.id
          }
        })
          const usersMutation = this.admin.id ? this.updateMutation : this.mutation
          this.admin.role = 'institute_admin'
          if (this.admin.id === undefined) {
            this.admin.default_academic_year_id = this.academic_year.id
            this.admin.account_id = this.institute
            this.admin.academic_year_ids.push(this.academic_year.id)
          }
          dispatchGraphql(usersMutation, this.getFilterUserVariables(this.admin)).then((response) => {
            console.log('user', response)
          })
        this.addCampusPopup = false
      })
    },
    getFilterVariables: function(data) {
      if (data.id) {
        return {
          "id": data.id,
          "changes": data
        }
      } else {
        return {"object": data}
      }
    },
    getFilterUserVariables: function(data) {
      data.academic_year_ids = '{' + (data.academic_year_ids || []).map(x => x).join(',') + '}'
      if (data.id) {
        return {
          "id": data.id,
          "changes": data
        }
      } else {
        return {"object": data}
      }
    },
    // getPercentage(campus) {
    //   let count = 0
    //   if (campus.account.account_settings) {
    //     count = campus.account.account_settings.standard_label ? count + 5.5 : count
    //     count = campus.account.account_settings.section_label ? count + 5.5 : count
    //   } if (campus.standards.length > 0) {
    //     count = campus.standards[0].name ? count + 5.5 : count
    //     if (campus.standards[0].standard_sections) {
    //       count = campus.standards[0].standard_sections.length > 0 ? count + 5.5 : count
    //     } if (campus.standards[0].standard_subjects.length > 0) {
    //       count = campus.standards[0].standard_subjects.length > 0 ? count + 11 : count
    //     }
    //   } if (campus.subjects.length > 0) {
    //     count = campus.subjects[0].name ? count + 11 : count
    //   } if (campus.setting) {
    //     count = campus.setting.attendance_type ? count + 5.5 : count
    //   } if (campus.exam_types.length > 0) {
    //     count = campus.exam_types[0].name ? count + 3 : count
    //     count = campus.exam_types[0].occurence ? count + 2.5 : count
    //   }
    //   if (campus.setting) {
    //     count = campus.setting.non_working_days ? count + 3 : count
    //     count = campus.setting.working_hours ? count + 3 : count
    //     count = campus.setting.campus_breaks ? count + 3 : count
    //     count = campus.setting.start_time ? count + 1.5 : count
    //     count = campus.setting.end_time ? count + 1.5 : count
    //   }
    //
    //   if (campus.academic_years[0].departments.length > 0) {
    //     let departments = campus.academic_years[0].departments
    //     count = departments[0].name ? count + 5.5 : count
    //     if(departments[0].designations.length > 0){
    //       count = departments[0].designations[0].designation_type ? count + 5.5 : count
    //     }
    //   }
    //
    //   if (campus.account.account_settings) {
    //     count = campus.account.account_settings.date_time_format ? count + 3 : count
    //     count = campus.account.account_settings.currency_format ? count + 2.5 : count
    //   }
    //
    //   if (campus.fee_line_items.length > 0) {
    //     count = campus.fee_line_items[0].fee_line_item_type ? count + 5.5 : count
    //   }
    //
    //   if (campus.payslip_line_items.length > 0) {
    //     count =  count + 11
    //   }
    //
    //   console.log('percent', count)
    //   return count
    // },
    redirectTo: function() {

      this.$router.push(`/on-boarding/onboard-campus/${this.campus.id}`)
    },
    editCampus() {
      console.log('%%%%%%%EEEEEEE', this.campus)
      this.academic_year = this.campus.academic_years[0]
      this.academic_year.campus_id = this.campus.id
      this.admin = this.campus.academic_years[0].users.length > 0 ? this.campus.academic_years[0].users[0] : {academic_year_ids: []}
      this.addCampusPopup = true
      console.log("Edit Campus - " + this.campus.name);
    },
    deleteCampus() {
      console.log("De;ete Campus - " + this.campus.name);
    },
    getAudienceVariables(audience, status) {
      return {
        "id": this.user.id,
        "change": {
          "status": status
        }
      }
    },
    setAsDefault: function(){
      console.log('%$%$%$%$%$%', this.campus);
      this.dialogBox = true
      // const mutation = `mutation($id: uuid!, $change: audience_set_input) {
      //   update_user_by_pk(pk_columns: {id: $id}, _set: $change) {
      //     id
      //   }
      // }`
      // dispatchGraphql(mutation, this.getVariables(status)).then((response) => {
      //   console.log(response)
      //   this.$emit('update')
      // })
    }
  },
};
</script>
