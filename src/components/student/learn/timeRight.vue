<template>
  <div>
    <side-bar class="sheare-right-side" :show="show" @onClose="__onCancel">
      <div style="background: #1e1e1e !important">
        <div style="background: #282828; padding: 16px">
          <h5 class="text-white">{{ slotData.classrooms.length > 0 ? slotData.classrooms[0].name : '' }}</h5>
        </div>
        <div style="padding: 14px; height: calc(100vh - 85px); overflow-x: scroll">
          <div class="d-flex">
            <div style="width: 10rem">
              <div class="text-white">Subject</div>
              <div class="fs-16 f-600 text-white">{{ slotData.subject.name }}</div>
            </div>
            <div style="width: 12rem">
              <div class="text-white">Day</div>
              <div class="fs-16 f-600 text-white">{{ slotData.week_day }}</div>
            </div>
            <div style="width: 12rem">
              <div class="text-white">Time</div>
              <div class="fs-15 f-600 text-white">{{ getTime(slotData.start_time) }} - {{ getTime(slotData.end_time) }}</div>
            </div>
          </div>
          <br />
          <el-card class="rounded-08 bg-black-3" style="border: none">
            <div class="fs-16 text-white" style="padding-bottom: 10px;text-align: center;">
              About the topic
            </div>
            <div class="fs-16 text-white" style="padding-bottom: 10px">
              <b>{{ slotData.classrooms.length > 0 ? slotData.classrooms[0].topic.name : '' }}:</b>
            </div>
            <div style="color: #cfcfcf">
              <p>&emsp;{{ slotData.classrooms.length > 0 ? slotData.classrooms[0].topic.description : '' }}.</p>
            </div>
          </el-card>
          <br />
          <el-card class="rounded-08 bg-black-3" style="border: none">
            <div class="fs-16 text-white" style="padding-bottom: 10px">
              Focus areas
            </div>
            <ul style="color: #cfcfcf">
              <li v-for="(sub, i) in getSubTopics(slotData.classrooms[0].topic)" :key="i">
                {{ sub.name }}.
              </li>
            </ul>
          </el-card>
          <br />
          <div class="hr"></div>
          <br/>
          <es-button text="Join Group" :plain="true"></es-button>
        </div>
      </div>
    </side-bar>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  components: {},
  props: {
    slotData: {
      type: Object
    },
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    tab: "tab1",
  }),
  methods: {
    getTime(time) {
      return moment(time).format('HH:mm A')
    },
    getSubTopics(topic) {
      if (topic) {
        return topic.sub_topics
      }
      // return topic.sub_topics
    }
  }
};
</script>
