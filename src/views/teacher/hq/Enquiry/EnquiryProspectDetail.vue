<template>
  <e-container hideHeader>
    <nav-bar
      heading="View Prospect Enquiry"
      @backClick="$router.push($url.HQ_ENQUIRES)"
    ></nav-bar>
    <e-form :gutter="50" heading="Prospective student Detail">
      <el-col
        :span="4"
        v-for="(enq, index) in enquiryProspect"
        :key="index"
        class="mg-t-40"
      >
        <p class="title">{{ enq.text }}</p>
        <p class="text">{{ enq.value }}</p>
      </el-col>
    </e-form>

    <e-form :gutter="50" heading="Enquiry Details">
      <el-col
        :span="5"
        v-for="(enq, index) in enquiry"
        :key="index"
        class="mg-t-40"
      >
        <p class="title">{{ enq.text }}</p>
        <p v-if="enq.text !== 'Enquirer Status'" class="text">
          {{ enq.value }}
        </p>
        <p
          v-else
          class="text"
          :style="{ color: enq.value === 'Open' ? 'Red' : '##0BC32E' }"
        >
          {{ enq.value }}
        </p>
      </el-col>
      <el-col :offset="20">
        <e-button :plain="true" :span="4" label="Mark Respondant"> </e-button>
      </el-col>
    </e-form>

    <el-row>
      <e-button
        :span="20"
        label="Cancel"
        width="180"
        type="default"
        @click="handleCancel"
        class="p-45"
      ></e-button>
      <e-button
        :span="4"
        label="Print"
        width="180"
        @click="handleClick"
        css="float-right"
        class="p-45"
      ></e-button>
    </el-row>
  </e-container>
</template>
<script>
import navBar from "@/components/pageNavBar";
import { mapMutations } from "vuex";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      enquiryProspect: [
        {
          text: "Full Name",
          value: "Lorem",
        },
        {
          text: "Gender",
          value: "Female",
        },
        {
          text: "Standard",
          value: "X",
        },
        {
          text: "Mobile Number",
          value: "Lorem",
        },
        {
          text: "Date of birth",
          value: "Lorem",
        },
        {
          text: "Place of Birth",
          value: "Lorem",
        },
        {
          text: "Nationality",
          value: "Indian",
        },
        {
          text: "Caste",
          value: "Lorem",
        },
        {
          text: "Blood Group",
          value: "Lorem",
        },
        {
          text: "Religion",
          value: "Lorem",
        },
        {
          text: "Father Name",
          value: "Lorem",
        },
        {
          text: "Mother Name",
          value: "Lorem",
        },
        {
          text: "Before School",
          value: "Lorem",
        },
        {
          text: "City",
          value: "Lorem",
        },
        {
          text: "State",
          value: "Lorem",
        },
        {
          text: "Country",
          value: "Lorem",
        },
        {
          text: "Pincode",
          value: "Lorem",
        },
      ],
      enquiry: [
        {
          text: "Enquirer Name",
          value: "Lorem",
        },
        {
          text: "Enquiry filing date",
          value: "Lorem",
        },
        {
          text: "Ref Email",
          value: "Lorem",
        },
        {
          text: "Mobile Number of Enquirer",
          value: "Lorem",
        },
        {
          text: "Enquirer Status",
          value: "Responded",
        },
        {
          text: "Enquiry Details / Purpose",
          value: "LoreIpsum, sector 14, 131001, Sonipat,Harayana",
        },
      ],
    };
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    handleClick() {},
    handleCancel() {},
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
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
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style scoped>
.title {
  text-align: left;
  font: 16px;
  letter-spacing: 0px;
  color: #000000cc;
  font-weight: bolder;
}
.text {
  text-align: left;
  font: 16px;
  letter-spacing: 0px;
  color: #bcbcbc;
}
</style>
