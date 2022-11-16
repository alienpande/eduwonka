<template>
  <el-row>
    <el-col :span="24">
      <el-menu class="exam-subject-title">
        <el-menu-item class="sub-menu-title">
          <span slot="title"> {{ standard.title }}</span>
        </el-menu-item>
      </el-menu>
      <el-menu :class="standardClass">
        <el-menu-item
          v-for="(item, index) in standards"
          v-bind:item="item"
          v-bind:key="index"
          @click="standardMenuClick(item)"
          :class="
            activeStandard === item.name ? 'active-menu' : 'noactive-menu'
          "
        >
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="24" v-show="selectedSubjects.length">
      <el-menu class="exam-subject-title">
        <el-menu-item class="sub-menu-title">
          <span slot="title">Subject</span>
        </el-menu-item>
      </el-menu>
      <el-menu :class="subjectClass">
        <el-menu-item
          v-for="(item, index) in selectedSubjects"
          v-bind:item="item.subject"
          v-bind:key="index"
          @click="subjectMenuClick(item)"
          :class="
            activeSubject === item.subject.name ? 'active-menu' : 'noactive-menu'
          "
          :ref="item.name"
        >
          <span slot="title">{{ item.subject.name }}  </span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { mapGetters, mapMutations } from "vuex"
import { getId } from '@/util/auth'
export default {
  props: ["golink",'this.standardId','this.i.id'],
  
  
  data() {
    return {
      activeSubject: "",
      activeStandard: "",
      standards: {},
      standardId: "",
      subjectId: "",
      user: '',
      // subject: {
        // title: "Subject",
        // menu: [
        //   { id: 1, title: "Mathematics", routes: [] },
        //   { id: 2, title: "Science", routes: [] },
        //   { id: 3, title: "Social Studies", routes: [] },
        //   { id: 4, title: "English", routes: [] },
        //   { id: 5, title: "Hindi", routes: [] },
        //   { id: 6, title: "French", routes: [] },
        //   { id: 7, title: "Environment Studies", routes: [] },
        //   { id: 8, title: "Sanskrit", routes: [] },
        //   { id: 9, title: "Physical Education", routes: [] },
        // ],
      // },
      selectedSubjects: [],
    };
  },
  methods: {
    ...mapGetters("Common", ["view", "examMenu"]),
    ...mapMutations("Common", ["setExamMenu"]),
    standardMenuClick(i) {
      this.standardId = i.id
      // console.log("standard id",this.standardId)
      this.selectedSubjects = i.standard_subjects
      console.log('subjects', i)
      this.activeStandard = i.name;
      this.setExamMenu({
        subject: {},
        standard: i,
      });
      // this.$emit("collapse", i);
    },
    subjectMenuClick(i) {
      // console.log('subject active', this.$url.SH_EXAM)
      i = i.subject
      //this.$go(this.golink, { name: i.title });
      console.log('rpute', this.$route)
      if(this.golink === '/learn/exam'){
        this.$go('/learn/exam/standard/' + this.standardId + '/subject/' + i.id, { name: i.title });
      }else if (this.golink === '/learn/assignments'){
        this.$go('/learn/assignments/standard/' + this.standardId + '/subject/' + i.id, { name: i.title });
      }else if (this.golink === '/learn/lesson'){
        this.$go('/learn/lesson/standard/' + this.standardId + '/subject/' + i.id, { name: i.title });
      }else if (this.golink === '/learn/questions'){
        this.$go('/learn/questions/standard/' + this.standardId + '/subject/' + i.id, { name: i.title });
      }else if (this.$route.name === "KN_OVERVIEW") {
        this.$go('/knowledge/queries/standard/' + this.standardId + '/subject/' + i.id, { name: i.title });
      }else if (this.$route.name === "SH_OVERVIEW"){
        if(this.user.role === 'student'){
          this.$go(this.$url.SH_EXAM + '/subject/' + i.id, { name: i.title });
        }else{
          this.$go(this.$url.SH_EXAM + '/standard/' + this.standardId + '/subject/' + i.id, { name: i.title });
        }
      }else if (this.$route.name === "KN_QUERY") {
        this.$go('/knowledge/queries/standard/' + this.standardId + '/subject/' + i.id, { name: i.title });
      }

      //Previous Code 
      // if (this.$route.path === "/school/overview") {
      //   this.$go(this.$url.SH_EXAM + '/standard/' + this.standardId + '/subject/' + i.id, { name: i.title });
      // } else if (this.$route.name === "KN_OVERVIEW") {
      //   this.$go('/knowledge/queries/standard/' + this.standardId + '/subject/' + i.id, { name: i.title })
      // } else if (this.$route.name === "LN_DASHBOARD") {
      //   console.log('chec k', this.$route)
      //   this.$go(this.$url.LN_QUESTIONS + '/standard/' + this.standardId + '/subject/' + i.id, { name: i.title })
      // }


      //this.$go('/school/exam/standard/'+this.standardId+'/subject/'+i.id, { name: i.title });
      // for (let b = 0; b < this.subject.menu.length; b++) {
      //   const element = this.subject.menu[b];
      //   if (element.title === i.title && element.routes.length) {
      //     this.$go(`${this.golink}/${element.routes[0]}`, { name: i.title });
      //   }
      // }

      this.activeSubject = i.name;
      this.setExamMenu({
        subject: i,
        standard: this.standards,
      });
      console.log('subject_details', i)
      this.$emit("collapse", i);
      this.subjectId=i
    },
    // toScroll(refName, position) {
    //   this.$nextTick(() => {
    //     this.$refs[refName]?.scrollTo({ top: position, behavior: "smooth" });
    //   });
    // },
    getStandards: function() {      
      const query = `query MyQuery {
        standards{
          id
          name
          standard_subjects {
            id
            subject {
              id
              name
            }
          } 
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log('standards', response)
        this.standards = response.standards
      })
    },
    getUser() {
      const query = `
      query user($id: uuid!) {
        users_by_pk(id: $id) {
          id
          role
        }
      }
      `
      dispatchGraphql(query, { id: getId() }).then(response => {
        this.user = response.users_by_pk
      })
    },
  },
  computed: {
    subjectClass() {
      return this.view() === "xl" ? "exam-subject-h45" : "exam-subject-h35";
    },
    standardClass() {
      return this.selectedSubjects.length > 0
        ? this.view() === "xl"
          ? "exam-standard-h35"
          : "exam-standard-h30"
        : "exam-standard-h70";
    },
    standard() {
      return {
        title: "Standard",
        // menu: [
        //   { id: 1, title: "LKG", routes: this.subject.menu },
        //   { id: 2, title: "UKG", routes: this.subject.menu },
        //   { id: 3, title: "Class 1", routes: this.subject.menu },
        //   { id: 4, title: "Class 2", routes: this.subject.menu },
        //   { id: 5, title: "Class 3", routes: this.subject.menu },
        //   { id: 6, title: "Class 4", routes: this.subject.menu },
        //   { id: 7, title: "Class 5", routes: this.subject.menu },
        //   { id: 8, title: "Class 6", routes: this.subject.menu },
        //   { id: 9, title: "Class 7", routes: this.subject.menu },
        //   { id: 10, title: "Class 8", routes: this.subject.menu },
        //   { id: 11, title: "Class 9", routes: this.subject.menu },
        //   { id: 12, title: "Class 10", routes: this.subject.menu },
        //   { id: 13, title: "Class 11", routes: this.subject.menu },
        //   { id: 14, title: "Class 12", routes: this.subject.menu },
        // ],
      };
    },
  },
  created() {
    this.getStandards()
    this.getUser()
    if (this.standards.name) {
      this.activeStandard = this.standards.name;
      this.selectedSubjects = this.standards.standard_subjects;
    }
    console.log("router subject",this.$route)
    //console.log("sub_idsssss",this.$route.query.subject_id)
    // if (this.standards.standard_subjects.subject) {
    //   this.activeSubject = this.standards.standard_subjects.subject.name;
    // }
  }
};
</script>
<style></style>
