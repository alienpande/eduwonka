<template>
  <div class="form-type-2">
    <p class="label" style="margin-bottom: 30px">
      {{ `List of medication taken by ${student.first_name}` }}
    </p>
    <div
      class="form-block"
      style="background: transparent; padding: 0px 0px 10px 0px"
      v-for="(item, index) in medications"
      v-bind:item="item"
      v-bind:key="index"
    >
      <el-row :gutter="20">
        <e-input
          :span="5"
          name="Medicine Name"
          v-model="item.medicine_name"
          @input="inputChange(item)"
        ></e-input>
        <e-input
          :span="5"
          name="Description"
          v-model="item.description"
          @input="inputChange(item)"
        ></e-input>
        <!-- <div class="custom-date-picker"> -->
          <el-col :span="5" style="">
            <p class="label">Taken At</p>
            <el-date-picker
              v-model="item.taken_at"
              type="datetime"
              placeholder="Taken at">
            </el-date-picker>
          </el-col>
        <!-- </div> -->
        <e-input
          :span="3"
          name="Dose"
          v-model="item.dosage"
          @input="inputChange(item)"
        ></e-input>
        <e-radio
          :span="5"
          label="Medicine is"
          :options="medicineProvider"
          v-model="item.medication_given_by"
          @input="inputChange(item)"
        />
        <el-col :span="1">
          <e-svg
            v-show="medications.length > 1"
            icon="close2"
            @click="deleteSection(index)"
            css="h35 mt30"
          />
        </el-col>
      </el-row>
    </div>

    <e-button label="Add More" type="" icon="el-icon-plus" @click="addMore" />
  </div>
</template>
<script>
import { dispatchGraphqlDelete } from "@/api/dispatcher";
import moment from 'moment'
export default {
  props: {
    medications: {
      type: Array,
      default() {
        return []
      },
    },
    student: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      medicineProvider: [
        {
          title: "Given by School",
          value: "Given by School"
        },
        {
          title: "Self",
          value: "Self"
        },
      ],
    };
  },
  methods: {
    getTime(val) {
      return moment(val).format('HH:mm')
    },
    addMore() {
      var medication = {
        medicine_name: "",
        description: "",
        taken_at: "",
        dosage: "",
        medication_given_by: "",
        student_id: this.$route.params.studentId
      }
      console.log(medication)
      this.medications.push( medication )
    },
    deleteSection(i) {
      dispatchGraphqlDelete('medications', { id: this.medications.splice(i, 1)[0].id }).then((response) => {
        console.log('medications delete', response)
        this.medications.splice(i, 1)
      })
    },
    inputChange(item) {
      this.$emit("input", item)
    },
  },
  created() {
    this.medications = this.value;
    if (this.value.length <= 0) {
      this.addMore();
    }
    this.inputChange();
  },
  watch: {
    value(newVal) {
      this.medications = newVal;
    },
  },
};
</script>

<style scoped></style>
