<template>
  <e-container hideHeader pageTitle="Create lesson" :back="$url.LN_LESSON" class="learn-add-lesson">
    <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width: 470px"
    ></e-steps>

    <lesson-create-1
      v-if="activeTab == 1"
      @save="lessonData"
    />
    <lesson-create-2
      ref="tab2"
      v-if="activeTab == 2"
      @save="lessonData2"
    />
    <lesson-create-3
      v-if="activeTab == 3"
      @save="lessonData3"
      :teachers="teachers"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import lessonCreate1 from "@/components/learn/lesson/lessonCreate1.vue";
import lessonCreate2 from "@/components/learn/lesson/lessonCreate2.vue";
import lessonCreate3 from "@/components/learn/lesson/lessonCreate3.vue";
import { dispatchGraphql, dispatchGraphqlMutation  } from '@/api/dispatcher'


// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { lessonCreate1, lessonCreate2, lessonCreate3 },
  data() {
    return {
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "hq/healthRecords",
          title: "Type",
        },
        {
          id: 2,
          icon: "learn/Help",
          title: "Questions",
        },
        {
          id: 3,
          icon: "learn/Audience",
          title: "Audience",
        },
      ],
      lesson1: '',
      subTopicData: [],
      lesson2: {},
      lesson3: {},
      lesson4Data: {},
      req: {
        subjects: [],
      },
      query: `query($id: uuid){
        sections(where: {standard_id: {_eq: $id}}) {
          id
          section_teachers {
            id
            teacher_id
          }
        }
      }`,
      userQuery: `query($ids: [uuid!]) {
        users(where: {id: {_in: $ids}}) {
          id
          first_name
        }
      }`,
      mutation: `mutation insert_multiple_sub_topic($objects: [sub_topics_insert_input!]! ) {
          insert_sub_topics(objects: $objects) {
            returning {
            id
            name
            }
          }
        }`,
      userIds: [],
      teachers: [],
      subtopic: []
    };
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
    getVariables() {
      return {
        "ids": this.userIds[0]
      }
    },
    lessonData(val,data) {
      this.activeTab = 2;
      this.scrollTop();
      console.log("subtopicData",val ,data)
      this.lesson1 = val
      this.subTopicData = data
    },
    lessonData2(val) {
      this.activeTab = 1
      this.activeTab = 3
      console.log("25864586",val)
      this.lesson2 = val

    },
    lessonData3(val) {
      this.activeTab = 2
      this.activeTab = 1
      // console.log('##############33',val)
      this.lesson3 = val
      this.saveLessons()
    },
    getTeachers() {
      dispatchGraphql(this.query, { id: this.$route.params.standard_id }).then(response => {
        this.userIds = response.sections.map(x => x.section_teachers.map(y => y.teacher_id))
        console.log('$$$$$$$$$$$$$$$$$$44', this.userIds)
        dispatchGraphql(this.userQuery, this.getVariables()).then(response => {
          console.log('users', response)
          this.teachers = response.users
        })
      })
    },
    saveLessons() {
      console.log('aaaaaaaaaaa', this.getLessonVariables())
      dispatchGraphqlMutation('topics', ['id', 'name'], this.getLessonVariables()).then((response) => {
        console.log("show", response);
        const topic_id = response.insert_topics_one.id
        console.log('topic_id',response.insert_topics_one.id)
        dispatchGraphql(this.mutation, this.getSubtopicVariables(topic_id) ).then(response => {
          console.log('attend', response)
        })
      })
    },
    getLessonVariables() {
      this.lesson4Data.key_objectives = '{' + (this.lesson2.key_objectives || []).map(x => x).join(',') + '}'
      this.lesson4Data.session_tasks = '{' + (this.lesson2.session_tasks || []).map(x => x).join(',') + '}'
      this.lesson4Data.session_activities = '{' + (this.lesson2.session_activities || []).map(x => x).join(',') + '}'
      this.lesson4Data.homework = '{' + (this.lesson2.homework || []).map(x => x).join(',') + '}'
      this.lesson4Data.name = this.lesson1.name
      this.lesson4Data.description = this.lesson2.description
      this.lesson4Data.assigned_teacher_id = this.lesson3.user_id
      console.log('finalData', this.lesson4Data)
      return this.lesson4Data
    },
    getSubtopicVariables(id) {
      this.subTopicData.map(x => {
        this.subtopic.push({
          name: x.topic,
          topic_id: id
        })
      })
      console.log("sub", this.subtopic)
      return {
        "objects": this.subtopic
      } 
    }

  },
  mounted() {
    this.setAsideMenuCollapse(false);
    setTimeout(() => {
      this.setAsideWidth("290px");
    }, 100);
  },
  created() {
    this.getTeachers()
    this.setAsideMenuCollapse(false);
    this.setAsideWidth("290px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style>
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
