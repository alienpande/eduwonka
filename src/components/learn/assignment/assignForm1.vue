<template>
  <div style="padding-left: 25px" class="sm-p-l-0">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <el-row :rules="rules">
      <el-col :span="6" style="margin-right: 33px" class="sm-width-100 sm-margin-r-0">
        <e-input
          v-model="assignment.name"
          name="Name of the test"
          placeholder="Text Field"
          rules="required"
        ></e-input>
      </el-col>
      <el-col :span="5" style="margin-right: 33px" class="sm-width-100 sm-margin-r-0">
        <e-input
          v-model="standard"
          name="Standard"
          placeholder="Class 4"
          readonly
        ></e-input>
        <div style="display: inline-flex">
          <e-svg icon="Group" />
          <div style="margin-left: 11px; opacity: 0.4; font-size: 14px">
            The standard is default chosen from you left navigation selection
          </div>
        </div>
      </el-col>
      <el-col :span="5" class="sm-width-100 sm-margin-r-0">
        <e-input
          v-model="subject"
          name="Subject"
          placeholder="Mathematics"
        readonly
        ></e-input>
        <div style="display: inline-flex">
          <e-svg icon="Group" />
          <div style="margin-left: 11px; opacity: 0.4; font-size: 14px">
            The subject is default chosen from you left navigation selection
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="sm-flex sm-d-c">
      <el-col :span="9" class="sm-width-100 sm-margin-r-0">
        <div style="opacity: 0.8; margin-bottom: 10px" class="fs-16 f-600">
          Description
        </div>
        <textarea
          class="assign-textarea"
          placeholder="Text Field"
          style="
            background: #ffffff 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 3px #11111112;
            border: 1px solid #cccccc;
            border-radius: 4px;
            padding: 10px;
          "
          name=""
          id=""
          v-model="assignment.description"
          cols="55"
          rows="10"
          rules="required"
        ></textarea>
      </el-col>
      <el-col :span="4" style="padding-top: 30px;margin-left:100px" class="sm-width-100 sm-margin-l-0">
        <div class="syllabus-courosle" v-for="i in 3" :key="i">
          <e-svg class="pointer-icon" icon="Pointer" />
          <div class="syllabus-cousol__info">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </div>
        </div>
      </el-col>
    </el-row>        
    <div style="opacity: 0.8; margin-bottom: 5px;margin-top:7px;" class="fs-16 f-600">
      Parts
    </div>
    <div style="display: flex;   margin-right: -4px; flex-wrap: wrap">
      <div   v-for="item in add" :key="item" class="sm-width-100 sm-margin-r-0">
        <e-input :span="13" class="sm-width-100 sm-height-auto" style="margin-right: -100px" v-model="assignment.required_parts[item-1]" rules="required" ></e-input>
      </div>
      <e-button
        class="btn sm-width-100 sm-margin-t-5"
        :span="6"
        icon="el-icon-plus"
        label="Add part"
        :plain="true"
        style="margin-top: 0px"
        @click="handlePart"
        rules="required"
      />
    </div>
    <div style="opacity: 0.8; margin-bottom: 10px;margin-top:9px;" class="fs-16 f-600">
      Upload attachments
    </div>

    <div style="display: flex; flex-wrap: wrap">
      <div
        v-for="i in 2"
        :key="i"
        style="
          display: flex;
          margin-top: 5px;
          background: white;
          padding: 10px 15px;
          width: fit-content;
          border: 1px solid #000000;
          border-radius: 10px;
          margin-right: 15px;
        "
      >
        <e-svg icon="Attachment-icon"></e-svg>
        <div style="opacity: 0.8; margin-left: 10px" class="fs-16">
          Study data.pdf
        </div>
      </div>
      <e-button
        class="btn"
        :span="13"
        icon="el-icon-plus"
        label="Upload attachment"
        :plain="true"
        style="margin-top: 7px"
      />
    </div>
    <el-row
      style="
        border-top: 1px solid #fcdfbd;
        margin-top: 20px;
        padding-bottom: 15px;
      "
      class="form-last-buttons"
    >
      <!-- <el-col style="float: right" :span="9"> -->
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
          width="200"
          @click="handleSubmit(handleClick)"
          css="float-right"
          class="p-45"
        ></e-button>
      <!-- </el-col> -->
    </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphqlQueryByPk  } from "@/api/dispatcher";
export default {
  data: () => ({
    add: 1,
    assignment: {
      required_parts: []
    },
    part: '',
    requiredParts: [],
    subject: '',
    standard: '',
    req: {},
  }),
  created() {
    this.getStandard()
    console.log(this.$route.params)
  },
  computed: {
    isValid () {
      return this.assignment.name && this.standard && this.subject && this.assignment.description && this.assignment.required_parts[item-1];
    }
  },
  methods: {     
    handlePart() {
      this.add++
      console.log(this.add, this.add-1)
      this.assignment.required_parts[this.add] = ""
      this.assignment.required_parts = this.assignment.required_parts.filter(x => x != "")
      console.log("sdfjfjk",this.assignment.required_parts)
      console.log(this.assignment.required_parts.length)
      this.assignment.required_parts[this.add-1]=this.part
      console.log("parts", this.assignment.required_parts)
    },
    getStandard: function() {
      dispatchGraphqlQueryByPk('standards', ['id', 'name'], { id: this.$route.params.standard_id }).then((response) => {
      this.standard= response.standards_by_pk.name
      this.assignment.standard_id= response.standards_by_pk.id
      console.log("jhklasgja", this.standard)
     })  
     dispatchGraphqlQueryByPk('subjects', ['id', 'name'], { id: this.$route.params.subject_id }).then((response) => {
       this.subject= response.subjects_by_pk.name
       this.assignment.subject_id= response.subjects_by_pk.id
       console.log("jhklasgja", this.subject)
      })
    },
    handleClick() {
      const assignmentId =  this.assignment
      console.log(assignmentId)
      this.$emit("save", assignmentId)
    },
  },
};
</script>
<style>
.assign-textarea:focus {
  border: 1px solid #ba6c47 !important;
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
.cancel_btn {
  font-weight: bold;
  background: transparent !important;
  border: none !important;
  color: #bc6c42 !important;
}
</style>
