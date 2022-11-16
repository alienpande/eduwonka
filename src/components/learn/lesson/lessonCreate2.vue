<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="0">
        <div style="font-size: 16px; font-weight: 500; margin-bottom: 10px">
          Description
        </div>
        <textarea style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px; background: white; padding: 10px;" v-model="lesson2.description" placeholder="Type here to add notes" rows="3" cols="62" />
      </el-col>
    </el-row>
    <el-col>
      
      <!-- <el-card
        shadow="none"
        style="margin-bottom: 10px;border: 1px solid #C26C47;"
        class="rounded-08 pg-50 cp"
      >
        <div style="opacity: 0.6">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        </div>
      </el-card> -->
    </el-col>
    <el-row>
      <el-col :span="8">
        <add-option
          title="Key Objectives"
          :store="keyObject"
          btnText="Add Key Objectives"
        />
      </el-col>
      <el-col :span="1">
          <e-svg
            v-show="keyObject.length > 1"
            icon="close2"
            @click="keyObjectdeleteSection(index)"
            css="h35 mt30"
          />
        </el-col>
      <el-col :span="8">
        <add-option
          title="Tasks of the session"
          :store="addTask"
          btnText="Add Task"
        />
      </el-col>
      <el-col :span="1">
          <e-svg
            v-show="addTask.length > 1"
            icon="close2"
            @click="addTaskdeleteSection(index)"
            css="h35 mt30"
          />
        </el-col>
      <br />
    </el-row>
    <br />
    <el-row>
      <el-col :span="8">
        <add-option
          title="Activities for the session"
          placeholder="Activity"
          :store="addActivity"
          btnText="Add Activity"
        />
      </el-col>
      <el-col :span="1">
          <e-svg
            v-show="addActivity.length > 1"
            icon="close2"
            @click="addActivitydeleteSection(index)"
            css="h35 mt30"
          />
        </el-col>
      <el-col :span="8">
        <add-option
          title="Homework"
          :store="subtopic"
          btnText="Add Homework"
        />
      </el-col>
       <el-col :span="1">
          <e-svg
            v-show="subtopic.length > 1"
            icon="close2"
            @click="subtopicdeleteSection(index)"
            css="h35 mt30"
          />
        </el-col>
    </el-row>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="9">
        <e-button
          :span="15"
          label="Cancel"
          width="180"
          css="cancel_btn"
          type="default"
          class="p-45"
        ></e-button>
        <e-button
          :span="8"
          label="Proceed"
          width="180"
          @click="setData()"
          css="float-right"
          class="p-45"
        ></e-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    subtopic: [],
    keyObject:[],
    addTask:[],
    addActivity:[],
    lesson2:[],
    lessonData: {}
  }),
  methods: {
    setData() {
      this.lessonData.homework = this.subtopic.map(x => x.topic)
      this.lessonData.session_activities = this.addActivity.map(x => x.topic)
      this.lessonData.session_tasks = this.addTask.map(x => x.topic)
      this.lessonData.key_objectives = this.keyObject.map(x => x.topic)
      this.lessonData.description = this.lesson2.description
      // console.log('lessonData',this.lessonData)
      this.$emit('save', this.lessonData)
    },
    keyObjectdeleteSection(i) {
        this.keyObject.splice(i, 1)
    },
    addTaskdeleteSection(i) {
        this.addTask.splice(i, 1)
    },
    addActivitydeleteSection(i) {
        this.addActivity.splice(i, 1)
    },
    subtopicdeleteSection(i) {
        this.subtopic.splice(i, 1)
    },
  }
};
</script>
