<template>
  <div>
    <e-container
      class="learn-add-certificate"
      hideHeader
      pageTitle="Create certificate"
      :back="$url.LN_CERTIFICATE"
    >
      <e-steps
        :steps="steps"
        :active="activeTab"
        @activeTab="activeTabChange"
         style="width:300px"
      ></e-steps>
      <certificate-form-1
        v-if="activeTab == 2"
        :certificateId="certificateId"
        :contract-template="contractTemplate"
        :sections="sections"
        :teachers="teachers"
        :management="management"
        :non_teaching="non_teaching"
        @tabOne="tabOneData"
        @save="scrollTop"
      />
      <certificate-form-3
        v-if="activeTab == 3"
        :contract-template="contractTemplate"
        @handleSubmit="handleSubmit"
        @handleDeleteTemplate="handleDeleteTemplate"
      />
      <certificate-form-4
        v-if="activeTab == 4"
        :contract-template="contractTemplate"
        @handleSubmit="handleSubmit"
      />
      <certificate-form-2
        ref="tab2"
        v-if="activeTab == 1"
        :certificateFormOneData="certificateFormOneData"
        :contract-template="contractTemplate"
        @handleSubmit="handleSubmit"
        @back="activeTab = 2"
      />
      <!-- getCertificateId($event) -->
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import certificateForm1 from "@/components/learn/certificate/certificateForm1.vue";
import certificateForm2 from "@/components/learn/certificate/certificateForm2.vue";
import certificateForm3 from './contracts/create_new_template/EditDocument'
import certificateForm4 from './contracts/create_new_template/Preview'

import { mapMutations } from "vuex";

export default {
  components: { certificateForm1,certificateForm2, certificateForm3, certificateForm4 },
  data: () => ({
    activeTab: 1,
    certificateId: '',
    sections:[],
    certificateFormOneData: {},
    contractTemplate: {
      name: '',
      title: ''
    },
    steps: [
      {
        id: 1,
        icon: "hq/healthRecords",
        title: "Details",
      },
      {
        id: 3,
        icon: "hq/healthRecords",
        title: "Edit Document",
      },
      {
        id: 4,
        icon: "hq/healthRecords",
        title: "Preview Document",
      },
      {
        id: 2,
        icon: "hq/student",
        title: "Audience",
      },
    ],
    users: [],
    teachers: [],
    management: [],
    non_teaching: []
  }),
  methods: {
    handleDeleteTemplate() {
      this.contractTemplate.name = null
      this.contractTemplate.attachment_id = null
    },
    handleSubmit(el, tab_name) {
      if (this.contractTemplate.attachment_id) {
        this.activeTab = el
      }
    },
    getTemplate(id) {
      this.selectLoading = true
      dispatchHttp('/contract_templates/' + id, {}, 'get')
        .then(response => {
          this.contractTemplate = response.data
        })
        .catch(() => {
          console.log('Error')
        })
    },
     getStandards() {
      const query = `
        query {
          sections(order_by: {standard: {name: asc}}) {
            id
            name
            standard {
              id
              name
            }
          }
        }`
      dispatchGraphql(query).then(response => {
        this.sections = response.sections
        console.log("standard sections", this.sections)
      })
    },
    getTeachers() {
      const query = `
        query {
          users {
            id
            first_name
            role
          }
        }
      `
      dispatchGraphql(query).then(response => {
        this.users = response.users
        this.teachers = this.users.filter(x => x.role === 'teacher')
        this.management = this.users.filter(x => x.role === 'management')
        this.non_teaching = this.users.filter(x => x.role === 'admin')
        // console.log('users', this.teachers, this.management, this.non_teaching)
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    getAudience(data) {
      return {
        "objects": data
      }
    },
    scrollTop(data) {
      // this.activeTab = 1
      const mutation = `mutation($objects: [audiences_insert_input!]!) {
        insert_audiences(objects: $objects) {
          affected_rows
          returning {
            id
          }
        }
      }`
      dispatchGraphql(mutation, this.getAudience(data)).then(response => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Certificate Added'
        })
        this.$go(this.$url.LN_CERTIFICATE)
      })
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
    tabOneData(data){
      if(data) {
        // data.audience.forEach((element) => {
        //   let user = this.users.find(x => x.id == element.user_id);
        //   console.log(user);
        //   element.name = user.first_name
        // });
      this.certificateFormOneData = data;
      console.log(data);
      }
    }
    //  getCertificateId(data){
    //   this.certificateId = data
    //   console.log('save data', data)
    // }
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
    this.getStandards()
    this.getTeachers()
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
