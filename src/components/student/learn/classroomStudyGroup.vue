<template>
  <div>
    <el-tabs class="floatTabHeader studentTab" v-model="tab">
      <el-tab-pane label="Created by me" name="tab1">
        <div style="display: flex; justify-content: space-between">
          <div style="color: #cfcfcf">You have created 4 groups</div>
          <es-button
            icon="addPluse"
            @click="$router.push($url.LN_CLASS_CREATE_GROUP)"
            text="Create Group"
          ></es-button>
        </div>
        <br />
        <el-row>
          <el-col :span="8" v-for="i in 6" :key="i">
            <el-card
              class="rounded-08 bg-black-2"
              style="border: none; margin: 8px"
              shadow="none"
            >
              <div @click="createDetail()">
             
                <el-row>
                  <el-col :span="2">
                    <img
                      style="margin-top: -5px"
                      src="@/assets/images/mathIcon.png"
                      alt=""
                    />
                  </el-col>
                  <el-col :span="15" :offset="1">
                    <div class="f-600" style="color: #f3f3f3">
                      Mathematics Class
                    </div>
                  </el-col>
                  <el-col style="position: relative" :span="1" :offset="5">
                    <div @click.stop="showOptionBar(i)">
                      <e-svg
                      :class="{ 'select-tab-dot': selectTab == i }"
                      
                      icon="optionDot"
                    ></e-svg>
                    </div>
                    <div
                      v-if="selectTab == i"
                      style="
                        position: absolute;
                        background: #353535;
                        border-radius: 8px;
                        width: 142px;
                        left: -135px;
                        z-index: 9999;
                      "
                    >
                      <div
                        @click.stop="$router.push($url.LN_CLASS_DETAIL_GROUP)"
                        style="
                          color: #f3f3f3;
                          padding: 7px 10px;
                          cursor: pointer;
                          border-bottom: 1px solid #404040;
                        "
                      >
                        View Details
                      </div>
                      <div
                      @click.stop="$router.push($url.LN_CLASS_DETAIL_GROUP)"
                        style="
                          color: #f3f3f3;
                          padding: 7px 10px;
                          cursor: pointer;
                          border-bottom: 1px solid #404040;
                        "
                      >
                        Edit Details
                      </div>
                      <div
                        style="
                          color: #f3f3f3;
                          padding: 7px 10px;
                          cursor: pointer;
                          border-bottom: 1px solid #404040;
                        "
                      >
                        Add Members
                      </div>
                      <div
                        style="
                          color: #f3f3f3;
                          padding: 7px 10px;
                          cursor: pointer;
                        "
                      >
                        Delete Group
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <div class="hr"></div>
                <br />
                <div style="color: #f3f3f3; font-weight: 600">
                  Anil Sir’s Mathematics class Group, please share all notes and
                  books here.
                </div>
                <br />
                <el-row>
                  <el-col :span="12">
                    <div class="d-flex">
                      <div style="postion: relative">
                        <img
                          v-for="i in 4"
                          :key="i"
                          style="
                            width: 36px;
                            height: 36px;
                            border: 1px solid #707070;
                            border-radius: 50%;
                            margin-left: -10px;
                          "
                          src="@/assets/images/profile.jpg"
                          alt=""
                        />
                      </div>
                      <div
                        style="
                          border: 1px solid rgb(112, 112, 112);
                          border-radius: 17px;
                          font-size: 12px;
                          text-align: center;
                          height: 28px;
                          padding-top: 7px;
                          width: 35px;
                          display: inline-block;
                          margin-left: -14px;
                          margin-top: 1px;
                          background: rgb(20, 146, 230);
                          color: white;
                        "
                      >
                        +20
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <es-button text="Join Group" :plain="true"></es-button>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <create-detail
          :show="createDetails"
          :__onCancel="() => (createDetails = !createDetails)"
        />
      </el-tab-pane>
      <el-tab-pane label="Invited" name="tab2">
        <div style="display: flex; justify-content: space-between">
          <div style="color: #cfcfcf">You have created 4 groups</div>
          <es-button icon="addPluse" text="Create Group"></es-button>
        </div>
        <br />
        <el-row>
          <el-col :span="8" v-for="i in 6" :key="i">
            <div @click="showDetail = true">
              <el-card
                class="rounded-08 bg-black-2"
                style="border: none; margin: 8px"
                shadow="none"
              >
                <el-row>
                  <el-col :span="2">
                    <img
                      style="margin-top: -5px"
                      src="@/assets/images/mathIcon.png"
                      alt=""
                    />
                  </el-col>
                  <el-col :span="15" :offset="1">
                    <div class="f-600" style="color: #f3f3f3">
                      Mathematics Class
                    </div>
                  </el-col>
                  <el-col :span="1" :offset="5">
                    <e-svg icon="optionDot"></e-svg>
                  </el-col>
                </el-row>
                <div class="hr"></div>
                <br />
                <div style="color: #f3f3f3; font-weight: 600">
                  Anil Sir’s Mathematics class Group, please share all notes and
                  books here.
                </div>
                <br />
                <el-card
                  class="rounded-08 bg-black-3"
                  style="border: none; margin: 10px"
                  shadow="none"
                >
                  <el-row>
                    <el-col :span="4">
                      <el-avatar
                        :size="40"
                        :src="require('@/assets/images/profile.jpg')"
                      />
                    </el-col>
                    <el-col :span="8">
                      <div style="color: #9d9d9d; font-size: 12px">
                        Created by
                      </div>
                      <div style="color: #f3f3f3; font-weight: bold">
                        Anjali Mishra
                      </div>
                    </el-col>
                    <el-col :span="8" :offset="4">
                      <div style="color: #9d9d9d; font-size: 12px">
                        Participants
                      </div>
                      <div style="color: #f3f3f3; font-weight: bold">5</div>
                    </el-col>
                  </el-row>
                </el-card>
                <el-row>
                  <el-col :span="11">
                    <es-button text="Reject"></es-button>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <es-button text="Accept" :plain="true"></es-button>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <invite-detail
          :show="showDetail"
          :__onCancel="() => (showDetail = !showDetail)"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import esButton from "../../../studentControl/esButton.vue";
import inviteDetail from "./../../student/learn/class/inviteDetail.vue";
import createDetail from "./../../student/learn/class/createDetail.vue";

export default {
  components: { esButton, inviteDetail, createDetail },
  data: () => ({
    tab: "tab1",
    selectTab: "",
    showDetail: false,
    createDetails: false,
  }),
  methods: {
    showOptionBar(i) {
      if (this.selectTab == "") {
        this.selectTab = i;
      } else if (this.selectTab !== i) {
        this.selectTab = i;
      } else {
        this.selectTab = "";
      }
    },
    createDetail() {
      this.createDetails = true;
    },
  },
};
</script>

<style scoped>
.select-tab-dot {
  padding-bottom: 3px;
  background: #575757;
  border-radius: 2px;
  padding-left: 6px;
  margin-left: -6px;
  width: 7px;
}
</style>
