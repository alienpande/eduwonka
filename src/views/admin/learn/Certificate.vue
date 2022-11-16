<template>
  <div>
    <e-container
      class="learn-certificate"
      pageTitle="Certificate"
      subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
      btnIcon="el-icon-download"
      btnText="Download Template"
      @btnClick="downloadTemplete"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Category 1" name="catagory1">
          <el-row class="view-no-form">
            <el-col :span="8" v-for="i in 9" :key="i">
              <el-card
                style="margin: 15px"
                shadow="none"
                class="certificate-img rounded-08 pg-50 cp"
              >
                <div style=" position: relative">
                  <div
                    class="choose-btn__section"
                    style="
                      position: absolute;
                      width: 100%;
                      background: rgb(230 234 237 / 90%);
                      border-radius: 20px;
                      height: 250px;
                      visibility: hidden;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <button
                      style="
                        border-radius: 5px;
                        border: none;
                        font-size: 16px;
                        font-weight: 600;
                        padding: 8px 16px;
                        background: #bc6c42;
                        color: white;
                        /* margin: 110px 19px 1px 115px; */
                      "
                    >
                      Choose
                    </button>
                  </div>
                  <img
                    style="width: 100%"
                    src="@/assets/images/cert.png"
                    alt=""
                  />
                </div>

                <div style="display: flex">
                  <div
                    style="
                      font-weight: bold;
                      font-size: 16px;
                      opacity: 0.8;
                      width: 475px;
                      margin-right: 13px;
                    "
                  >
                    Lorem ipsum dolor sit amet consectetur
                  </div>
                  <e-button :span="12" plain type="" icon="el-icon-view" />
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Category 2" name="catagory2"> </el-tab-pane>

        <el-tab-pane label="Category 3" name="catagory3"> </el-tab-pane>
        <el-tab-pane label="Category 4" name="catagory4"> </el-tab-pane>
        <el-tab-pane label="Category 5" name="catagory5"> </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex"
export default {
  components: {},
  data() {
    return {
      showSideBar: false,
      activeName: "catagory1",
      filter: [
        { text: "Standard" },
        { text: "Standard 2" },
        { text: "Standard 3" },
      ],
      filter2: [
        { text: "Subject" },
        { text: "Subject 1" },
        { text: "Subject 2" },
      ],
      activeEmployeesReport: [
        {
          title: "Total Employees",
          value: "60",
          icon: "hq/employees",
        },
        {
          title: "Total Boys",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "30",
          icon: "hq/girl",
        },
      ],
      inActiveEmployeesReport: [
        {
          title: "Total Employees",
          value: "3",
          icon: "hq/employees",
        },
        {
          title: "Total Boys",
          value: "2",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "1",
          icon: "hq/girl",
        },
      ],
    };
  },
  mounted() {
    this.hideAsideMenuMobile()
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    downloadTemplete() {
      this.$router.push(this.$url.LN_CERTIFICATE_FORM);
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
<style>
.certificate-img:hover .choose-btn__section {
  visibility: visible !important;
}
</style>
