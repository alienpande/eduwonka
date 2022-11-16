<template>
  <div>
    <es-container
      hideHeader
      pageTitle="Add skills to your skillset"
      :back="$url.LN_SKILL"
    >
      <div class="d-flex" style="margin-top: -20px">
        <div class="skill-side">
          <div class="fs-16 p10 f-600 white-1">Skills</div>
          <div
            class="fs-16 p10 white-1"
            v-for="(skill, i) in skills"
            :key="i"
            :class="{ 'select-skill': selectSkill == i }"
            @click="selectSkill = i"
          >
            {{ skill }}
          </div>
        </div>
        <div class="skill-body p20">
          <div
            class="d-flex bg-black-2 rounded-08 p20 justify-bet"
            style="width: 77vw"
          >
            <div class="d-flex">
              <img src="@/assets/images/cricketIcon.png" />
              <div style="width: 196px" class="f-600 fs-20 white-1 ml10">
                All about Cricket
              </div>
            </div>
            <es-button
              text="Add Skill to my Skillset"
              :plain="true"
              icon="addPluseBlack"
            ></es-button>
          </div>
          <br />
          <div class="p20 bg-black-2 rounded-08" style="width: 77rem">
            <img
              style="width: 1229px; height: 473px"
              src="@/assets/images/videoScreen.png"
            />
          </div>
          <br />
          <div class="d-flex">
            <div
              class="bg-black-2 p20 rounded-08"
              style="width: 35rem; margin-right: 60px"
            >
              <div class="fs-16 f-600 white-1">Key Highlights</div>
              <div
                class="p10 mt10 rounded-08"
                style="border: 1px solid #404040"
              >
                <div class="white-1">
                  <ul>
                    <li v-for="i in 5" class="f-400" :key="i">
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting industry.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bg-black-2 rounded-08 p20" style="width: 35rem">
              <div class="fs-16 f-600 white-1">Key Highlights</div>
              <div
                class="p10 mt10 rounded-08"
                style="border: 1px solid #404040"
              >
                <VueSlickCarousel
                  class="dashboard-catousel"
                  v-bind="settingsRecom"
                  :arrows="false"
                  :dots="true"
                >
                  <ul v-for="j in 5" :key="j" class="white-1">
                    <li class="fs-16 padding-right-44" v-for="i in 4" :key="i">
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting industry.
                    </li>
                  </ul>
                </VueSlickCarousel>
                <br />
              </div>
            </div>
          </div>
          <br />
          <div
            class="bg-black-2 p20 rounded-08"
            style="width: 77rem; margin-right: 60px"
          >
            <div class="fs-16 f-600 white-1">Key Highlights</div>
            <div class="p20 mt10 rounded-08" style="border: 1px solid #404040">
              <div class="bg-black-3 white-1 f-16 f-400 rounded-08 p20">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </div>
            </div>
          </div>
        </div>
      </div>
    </es-container>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";

import { mapMutations } from "vuex";

export default {
  components: { VueSlickCarousel },

  data: () => ({
    skills: ["Salsa", "Skating", "Swimming", "Cricket"],
    selectSkill: 3,
    settingsRecom: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
  }),
  methods: {
    ...mapMutations("Common", [
      "setAsideMenuCollapse",
      "setAsideWidth",
      "setBg",
    ]),
  },
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("0px");
    }, 100);
    this.setBg("black");
  },
  created() {
    this.setAsideMenuCollapse(true);
    this.setAsideWidth("0px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style lang="scss">
.dashboard-catousel .slick-dots {
  bottom: -20px !important;
  li button:before,
  li.slick-active button:before {
    color: #1492e6 !important;
    opacity: 1;
  }
  li button:before {
    background-color: #8b8282 !important;
    border: none !important;
    border-radius: 50%;
    color: #8b8282 !important;
    display: inline-block;
    height: 15px !important;
    width: 15px !important;
  }
  li.slick-active button:before {
    background-color: #1492e6 !important;
    height: 15px !important;
    width: 15px !important;
  }
}

.dashboard-catousel .slick-dots li button::before {
  height: 15px !important;
  width: 15px !important;
  background: #fff;
  opacity: 0.5;
}
.skill-side {
  width: 200px;
  height: calc(100vh - 300px);
  background: #1e1e1e;
  overflow-x: auto;
  padding: 30px;
  cursor: pointer;
}
.skill-body {
  height: calc(100vh - 290px);
  overflow-x: auto;
}
.select-skill {
  background: #1492e64d;
  border-radius: 4px;
}
</style>
