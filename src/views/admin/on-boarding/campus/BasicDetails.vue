<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <e-container-lite
    showFooter
    saveBtnText="Cancel"
    nextBtnText="Update"
    @back="$go('/on-boarding/campus-basic-details/' + $route.params.id)"
    @next="handleSubmit(handleClick)"
  >
    <template #titleHead>
      <div class="h1">Basic details</div>
      <div class="h5">
        Below are the basic details about North Campus of your institute
      </div>
    </template>
    <e-form heading="Invite Members"  themeFooter :rules="rules"> 
      <div v-for="i in admin" :key="i.id">
      <e-input label="Member Name" :span="6" v-model="i.first_name" rules="required" />
      <e-input label="Email Address" :span="6" v-model="i.email" rules="required"/></div>
      <br />
      <template #themeFooter>
        <div style="padding: 10px 30px; color: #000000; opacity: 0.8">
          Mark the campus, for which you want to give the user the Admin Role
        </div>
        <el-col :span="4" v-for="(camp, i) in campuses" :key="i">
          <el-checkbox class="eCheckbox">{{camp.name}}</el-checkbox>
        </el-col>
        <!-- <el-col :span="4">
          <el-checkbox class="eCheckbox" v-model="checked"
            >South Campus</el-checkbox
          >
        </el-col>
        <el-col :span="4">
          <el-checkbox class="eCheckbox" v-model="checked"
            >West Campus</el-checkbox
          >
        </el-col>
        <el-col :span="4">
          <el-checkbox class="eCheckbox" v-model="checked"
            >East Campus</el-checkbox
          >
        </el-col> -->
      </template>
    </e-form>

    <e-form bgColor="transparent">
      <!-- <e-button v-if="add" label="Invite More People" icon="el-icon-plus" @click="add++"  /> -->
       <e-button  @click="addUser" label="Invite More People" icon="el-icon-plus"   />
    </e-form>
  </e-container-lite>
  </ValidationObserver>
</template>
<script>
import {dispatchGraphql} from '@/api/dispatcher'
export default {
  data() {
    return {
      rules: {},
      add: 1,
      academic: [],
      campuses: [],
      // firstName: '',
      // email: '',
      admin: [],
      mutation: `mutation insert_multiple_users($objects: [users_insert_input!]! ) {
          insert_users(objects: $objects) {
            returning {
              id
            }
          }
      }`,
    };
  },
  computed: {
    isValid () {
      return this.i.first_name && this.i.email;
    }
  },
  created() {
    // console.log("accountid",this.$route.params)
    // this.getaccounts()
    this.getAdmin()
    this.getCampuses()
    // this.getAcademic()
    this.campusId = this.$route.params.id
  },
  methods: {
    addUser: function () {
      this.admin.push({ first_name: '',email:'' });
    },
    // getaccounts: function() {
    //     dispatchGraphqlQueryByPk('accounts',['id', 'name','email'],{id: this.$route.params.id}).then((response) => {
    //       this.accounts = response.accounts_by_pk
    //     console.log("acc",this.accounts)
    //   })
    // },
    //  getAcademic(){
    //   const  academisQuery=`query($campus_id: uuid!){
    //       academic_years(where:{campus_id:{_eq: $campus_id}}){
    //         id
    //         campus_id
    //         name
    //       }
    //     }`
    //   dispatchGraphql(academisQuery,{campus_id:this.$route.params.id}).then((response) =>{
    //     this.academic = response.academic_years
    //     console.log("eee", this.academic)
    //   })
    // },
    getCampuses(){ 
      const campusQuery=`query($account_id: uuid!){
          campuses(where:{account_id:{_eq: $account_id}}){
            id
            name
          }
        }`
      dispatchGraphql(campusQuery,{ account_id: this.$route.params.accountId }).then((response) =>{
        this.campuses = response.campuses
          console.log("account", response)
      })
    },
    getAdmin(){
      const query=`query {
        users (where:  {role: {_eq: "admin"}}){
          id
          first_name
          email
        }
      }`
      dispatchGraphql(query).then((response) =>{ 
        this.admin = response.users
        // this.firstName = this.adm[0].first_name
        // this.email = this.adm[0].email
        console.log("admin*******", this.admin)
      })
    },
    getFilterVariables: function() {
      console.log(" iam in get varjiavles")
      this.admin=this.admin.filter(x => x.first_name!= "ravi")
      this.admin.forEach(object => {
        object.role="admin"    
    });
      return { "objects": this.admin}
    },
    handleClick() {
      dispatchGraphql(this.mutation, this.getFilterVariables()).then((response) => {
       this.admin = response.insert_users
       console.log("handleclick", this.admin)
        this.$go(this.$url.INVITE_PEOPLE +  '/' + this.campusId )
      })
    }
  }
};
</script>
