<template>
  <div style="margin-bottom:20px;width:50%" class="lesson-card" >
    <el-card style="" shadow="none" class="rounded-08 pg-50 cp">
      <div @click="$emit('clickDetails')">    
        <div style="opacity: 0.8; font-size: 20px; font-weight: 600;">
          {{ title }}
        </div>
        <br />
        <el-row style="border-bottom: 1px solid #fcdfbd; padding-bottom: 15px">
          <el-col :span="8">
            <div style="font-weight: 300; opacity: 0.8">Alloted</div>
            <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
              {{ Alloted }}
            </div>
          </el-col>

          <el-col :offset="3" :span="12">
            <div style="font-weight: 300; opacity: 0.8">Taken by</div>
            <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
              {{ Takenby }}
            </div>
          </el-col>
        </el-row>
        <div style="opacity: 0.8; font-weight: 600; padding: 14px 0">
          {{ sub_topics.length }} Subtopics
        </div>
        <div style="padding: 0 10px 1.5rem;" :style="{ width: window.width > 767 ? '50%' : '100%' }" >
          <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
            <div v-for="i in sub_topics" :key="i" class="cousole-wrap">
              <div class="syllabus-courosle" v-for="i in sub_topics" :key="i">
                <e-svg class="pointer-icon" icon="Pointer" />
                <div class="syllabus-cousol__info mg-t-10">
                  {{ i.name }}
                </div>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </el-card>
  </div>
</template> 
<script>
import VueSlickCarousel from "vue-slick-carousel";
import { dispatchGraphql  } from '@/api/dispatcher'
import screenSize from '@/mixins/screenSize'

export default {
  props:['title','Alloted','Takenby','topic','topic_id'],
  components: { VueSlickCarousel },
  mixins: [screenSize],
  data: () => ({
    activeName: "activeSubtopic",
    msg: "Lorem ipsum dolor sit amet consectetur",
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    sub_topics: [],
    query: `query($id: uuid){
      sub_topics(where: {topic_id: {_eq: $id}}) {
        id
        name
        topic_id
        status
      }
    }`
  }),
  created() {
    console.log('yhfjfugudfg',this.topic_id)
    this.getTopics()
  },
  methods: {
    getTopics: function() { 
      dispatchGraphql(this.query, { id: this.topic_id }).then(response => {
        this.sub_topics = response.sub_topics
        console.log('sub_topics', this.sub_topics)
      })
    },
  }
};
</script>

<style lang="scss">



.class-btn__coursle {
  border-radius: 16px;
  border: none;
  font-size: 12px;
  padding: 6px 16px;
  background: #fcdfbd;
  margin-left: 18px;
  margin-top: 35px;
  margin-bottom: 20px;
  color: #00000080;
  display: block;
  margin: auto;
}
.coursle-name {
  color: #222222;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding-bottom: 21px;
}

.slick-dots {
  bottom: -10px;
  li button:before,
  li.slick-active button:before {
    color: transparent;
    opacity: 1;
  }
  li button:before {
    background-color: transparent;
    border: 1px solid #bc6c42;
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    width: 10px;
  }
  li.slick-active button:before {
    background-color: #bc6c42;
  }
}

.slick-dots li button::before {
  height: 10px !important;
  widows: 10px !important;
  background: #fff;
}
.cousole-wrap {
  padding: 10px 0;
}
.syllabus-courosle {
  display: flex;
  margin-bottom: 18px;
}
.pointer-icon {
  display: inline-block;
  margin-top: 8px;
  margin-right: 8px;
}
.syllabus-cousol__info {
  font-size: 14px;
  font-weight: 300;
  opacity: 0.6;
}
.student-tab .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.subtopic {
  padding-bottom: 67px;
}
.i-icon:hover .syllabus-toltip {
  visibility: visible !important;
}

.tooltip .tooltip-inner {
  background: white;
  color: black;
  border-radius: 10px;
  border: 2px solid #fcdfbd;
  width: 130px;
  padding: 10px 15px;
  font-size: 12px;
}
</style>
