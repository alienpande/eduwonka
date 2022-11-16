<template>
<ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <es-container hideHeader pageTitle="Add Enquiry" :back="$url.HQ_ENQUIRES" class="bg-black-5">
    <el-card class="rounded-08 bg-black-2" style="border: none; margin: 30px" shadow="none" :rules="rules">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Enquiry Details</span>
        </el-col>
      </el-row><br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c" :rules="rules">
        <el-row>
          <el-form :model="enquiry" :rules="rules">
            <el-col :span="8" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Enquirer Name</span>
              <el-form-item prop="name" rules="required">
                <es-input placeholder="Enter a name" v-model="enquiry.student_name" rules="required"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Enquiry Filling Date</span>
              <el-form-item prop="name">
                <es-date-picker placeholder="Choose date" v-model="enquiry.enquiry_date" @change="setDate" rules="required" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Ref Email</span>
              <el-form-item prop="name">
                <es-input placeholder="Enter Email" v-model="enquiry.ref_email" rules="required"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Mobile Number</span>
              <el-form-item prop="name" rules="required">
                <es-input placeholder="Enter Mobile number" v-model="enquiry.mobile_number" rules="required" />
              </el-form-item>
            </el-col>
            <el-col :span="17" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Your Enquiry</span>
              <el-form-item prop="name" rules="required">
                <es-input placeholder="Enter Details/Purpose ..." v-model="enquiry.purpose" rules="required"/>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-card>
    </el-card>
    <el-row style=" margin-top: 20px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      <el-col :span="5" :offset="14">
        <es-button text="Cancel" width="200" />
      </el-col>
      <el-col style="float: right" :span="5">
        <es-button text="Submit" width="200" @click="handleSubmit(submit)" :plain="true" />
      </el-col>
    </el-row>
  </es-container>
</ValidationObserver>
</template>
<script>
import { mapMutations } from "vuex";
import { dispatchGraphqlMutation,dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  data() {
    return {
      enquiry: {},
      standard: ''
    }
  },
  computed: {
    isValid () {
      return this.enquiry.student_name && this.enquiry.enquiry_date && this.enquiry.ref_email && this.enquiry.mobile_number && this.enquiry.purpose ;
    }
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
    this.getUser()
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    setDate: function(value) {
      this.enquiry.enquiry_date =  moment(value).format('')
    },
    submit() {
      this.enquiry.standard_id = this.standard
      this.enquiry.enquiry_type = 'Student'
      this.enquiry.status = 'Open'
      dispatchGraphqlMutation('enquiries',['id'], this.enquiry).then((response) => {
        console.log(response)
        this.$router.push(this.$url.HQ_ENQUIRES)
      })
    },
    getUser() {
      const query = `{
        users_by_pk(id: "${getId()}") {
          id
          section {
            id
            standard_id
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standard = response.users_by_pk.section.standard_id
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
    save() {
      this.$router.push(this.$url.HQ_ENQUIRES)
    }
  },
};
</script>
