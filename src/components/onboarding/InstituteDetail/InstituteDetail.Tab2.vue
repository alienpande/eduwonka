<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <e-form :gutter="50" formInnerBorder :rules="rules">
        <p>
          You have no campus added yet, lets add some campus. <br />If you have
          only single branch, you can skip this step and complete the onboarding.
        </p>
        <e-button
          style="margin-top: 30px"
          label="Add Campus"
          icon="el-icon-plus"
          @click="addCampusPopup = true"
        />
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
            rules="required"
          />
          <e-input label="Permanent Address" v-model="campus.address" rules="required"/>
          <e-input label="Email Address of Admin" v-model="admin.email" rules="required"/>
          <e-input label="Academic Year" v-model="academic_year.name" rules="required"/>
          <e-date-picker v-model="academic_year.start_date" placeholder="Pick a Date" label="Year Start Date" @change="handleStartDate" rules="required"/>
          <e-date-picker v-model="academic_year.end_date" placeholder="Pick a Date" label="Year End Date" @change="handleEndDate" rules="required" />
        </e-dialog>
      </e-form>
    </ValidationObserver>
    <el-row>
      <e-button
        :span="24"
        label="Skip"
        width="180"
        plain
        @click="onSubmit"
        css="float-right"
        class="footer-top-border"
      ></e-button>
    </el-row>

    
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlMutation } from "@/api/dispatcher"
import moment from 'moment'
export default {
  data() {
    return {
      addCampusPopup: false,
      campus: {},
      academic_year: {},
      userData: {},
      domain: "eduwonka.com",
      admin:{
        academic_year_ids: []
      },
      rules: {},
      mutation: `mutation insert_single_user($object: users_insert_input! ) {
      insert_users_one(object: $object) {
        id
        account_id
      }
      }`,
      updateMutation: `mutation update_user ($id:uuid!, $changes: users_set_input!) {
        update_users_by_pk(pk_columns: {id: $id},_set: $changes) {
          id
          account_id
        }
      }`,
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
    };
  },
  // props: ['institute'],
  props: {
    institute: {
      type: String,
      default: "",
    },
  },
  computed: {
    isValid () {
      return this.campus.name && this.campus.address && this.admin.email && this.campus.description && this.academic_year.name && this.academic_year.start_date && this.academic_year.end_date;
    }
  },
  created(){
    this.getCampus()
    this.admin.account_id = this.institute
  },
  methods: {
    handleStartDate(val) {
      this.academic_year.start_date = moment(val).format('')
    },
    handleEndDate(val) {
      this.academic_year.end_date = moment(val).format('')
    },
    getCampus() {
      this.loading = true
      const query = `
        query campuses ($id: uuid!){
          campuses(where: {account_id: {_eq: $id}}){
            id
            address
            name
            description
            academic_years{
              id
              name
              start_date
              end_date
              users(where: {email: {_neq: "admin@test"}}){
                id
                email
                role
              }
            }
          }
        }
      `
      dispatchGraphql(query, {id: this.institute}).then(response => {
        this.loading = false
        this.campus = response.campuses[0]
        this.academic_year = this.campus.academic_years[0]
        this.academic_year.campus_id = this.campus.id
        this.admin = this.campus.academic_years[0].users.length > 0 ? this.campus.academic_years[0].users[0] : {academic_year_ids: []}
        console.log('$$$$$$$$$$$$$$$$$ss', response.campuses[0])
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
    onSubmit() {
      delete this.academic_year.users
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
        this.$emit("save", this.campus)
      })
    },
  },
};
</script>
