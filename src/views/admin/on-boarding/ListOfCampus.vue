<template>
  <e-container-lite>
    <template #titleHead>
      <div class="h1">Onboarding all your Campus</div>
      <div class="h5">
        Choose the campus for which you want to complete the onboarding Details
      </div>
    </template>
    <template #rightHead>
      <e-button label="Add Campus" icon="el-icon-plus" plain class="mt30" @click="addCampusPopup = true"/>
    </template>
    <campus-detail-card
      class="mb30"
      :campus="campus"
      v-for="(campus, index) in campuses"
      :key="index"
    />
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <e-form :gutter="50" :rules="rules">
        <e-dialog
          title="Please Provide the details to add the campus"
          v-model="addCampusPopup"
          width="50%"
          top="10vh"
          noEsc
          @cancel="addCampusPopup = false"
          @confirm="handleSubmit(onSubmit)"
        >
          <e-input label="Campus Name" v-model="campus.name" rules="required"/>
          <e-input
            label="Description of campus"
            type="textarea"
            v-model="campus.description"
          />
          <e-input label="Permanent Address" v-model="campus.address" rules="required"/>
          <e-input label="Email Address of Admin" v-model="admin.email" rules="required"/>
          <e-input label="Academic Year" v-model="academic_year.name" rules="required"/>
          <e-date-picker v-model="academic_year.start_date" placeholder="Pick a Date" label="Year Start Date" @change="handleStartDate" />
          <e-date-picker v-model="academic_year.end_date" placeholder="Pick a Date" label="Year End Date" @change="handleEndDate" />
        </e-dialog>
      </e-form>
    </ValidationObserver>
  </e-container-lite>
</template>
<script>
import { dispatchGraphql,dispatchGraphqlMutation } from "@/api/dispatcher"
import CampusDetailCard from "@/components/onboarding/ListOfCampus/CampusDetailCard.vue";
import moment from 'moment'
export default {
  components: { CampusDetailCard },
  data() {
    return {
      campuses: [],
      rules: {},
      addCampusPopup: false,
      academic_Mutation: `mutation insert_single_academic_years($object: academic_years_insert_input! ) {
        insert_academic_years_one(object: $object) {
          id
          name
        }
      }`,
      academicUpdateMutation: `mutation update_academic_year ($id:uuid!, $changes: academic_years_set_input!) {
        update_academic_years_by_pk(pk_columns: {id: $id},_set: $changes) {
          id

        }
      }`,
      campus: {},
      academic_year: {},
      admin:{
        academic_year_ids: []
      },
    };
  },
  created() {
    console.log('#########@@@@@@@@@@', this.$route.params.institute_id)
    this.getCampuses()
  },
  methods: {
    handleStartDate(val) {
      this.academic_year.start_date = moment(val).format('')
    },
    handleEndDate(val) {
      this.academic_year.end_date = moment(val).format('')
    },
    getCampuses: function() {
      const query = `
        query campuses ($account_id: uuid!){
          campuses(where: {account_id: {_eq: $account_id}}){
            id
            address
            name
            campus_code
            description
            academic_years {
              id
              name
              start_date
              end_date
            }
          }
        }
      `
      // academic_years {
      //   id
      //   name
      //   start_date
      //   end_date
      //   users(where: {email: {_neq: "admin@test"}}){
      //     id
      //     email
      //     role
      //   }
      //   departments {
      //     id
      //     name
      //     designations {
      //       id
      //       designation_type
      //     }
      //   }
      // }
      // standards {
      //   id
      //   name
      //   standard_sections {
      //     id
      //     name
      //   }
      //   standard_subjects {
      //     id
      //   }
      // }
      // subjects {
      //   id
      //   name
      // }
      // setting {
      //   id
      //   attendance_type
      //   non_working_days
      //   working_hours
      //   campus_breaks
      //   start_time
      //   end_time
      // }
      // exam_types {
      //   id
      //   name
      //   occurence
      // }
      // account {
      //   id
      //   account_settings {
      //     id
      //     standard_label
      //     section_label
      //     date_time_format
      //     currency_format
      //   }
      // }
      // fee_line_items {
      //   id
      //   fee_line_item_type
      //   default_amount
      // }
      // payslip_line_items {
      //   id
      // }
      dispatchGraphql(query, {account_id: this.$route.params.institute_id}).then(response => {
        this.campuses = response.campuses
        console.log('$$$$$$$$$$$$$$$$$ss', response.campuses)
      })
    },
    activeTabChange(e) {
      this.activeTab = e;
    },
    onSubmit() {
      delete this.academic_year.users
      delete this.campus.academic_years
      this.campus.account_id = this.$route.params.institute_ids
      dispatchGraphqlMutation('campuses', ['id'], this.campus).then((response) => {
        console.log('Final Resp', response)
        this.academic_year.campus_id = response.insert_campuses_one.id
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
        this.$emit("save", this.campus)
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
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
  background-color: #f7f9fb;
  overflow-y: scroll;
}
</style>
