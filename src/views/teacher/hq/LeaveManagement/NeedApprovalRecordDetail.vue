<template>
  <e-container
    hideHeader
    pageTitle="Details of Leave Application"
    :back="$url.HQ_LEAVE_MANAGEMENT_NEED_APPROVAL"
  >
    <e-form bgColor="transparent">
      <el-col :span="24">
        <el-row>
          <el-col
            :span="item.span || 8"
            v-for="(item, index) in keyValues"
            :key="index"
          >
            <e-key-value :span="24" :item="item" />
          </el-col>
        </el-row>
      </el-col>
    </e-form>

    <el-row>
      <el-col>
        <e-button
          :span="4"
          css="float-right"
          label="Reject"
          plain
          @click="dialogReject = true"
        />
        <e-button :span="4" css="float-right" label="Approve" type="primary" />
      </el-col>
    </el-row>

    <e-dialog
      title="Please Provide the reason for rejection"
      v-model="dialogReject"
      width="70%"
      top="40vh"
      noEsc
      noPersist
      @cancel="dialogReject = false"
      @confirm="dialogReject = false"
      btnConfirmText="Submit"
    >
      <e-input
        :span="24"
        type="textarea"
        :rows="4"
        placeholder="Type here to enter reason of rejection"
      ></e-input>
    </e-dialog>
  </e-container>
</template>
<script>
export default {
  data() {
    return {
      dialogReject: false,
      leave: {
        name: "Aruna Maheswari",
        fromDate: "01-02-2020",
        toDate: "02-02-2020",
        designation: "English Teacher",
        department: "Teaching",
        purpose:
          "Lorem ipsum dolar sit Lorem ipsum dolar sit Lorem ipsum dolar sit Lorem ipsum dolar sit",
      },
    };
  },
  computed: {
    keyValues() {
      return [
        {
          key: "Name",
          value: this.leave.name,
        },
        {
          key: "From Date",
          value: this.leave.fromDate,
        },
        {
          key: "To Date",
          value: this.leave.toDate,
        },
        {
          key: "Designation",
          value: this.leave.designation,
        },
        {
          key: "Department",
          value: this.leave.department,
        },
        {
          key: "Purpose",
          value: this.leave.purpose,
          span: 24,
        },
      ];
    },
  },
};
</script>

<style scoped>
/* .label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.e-form {
  background-color: white;
  height: auto;
  overflow-x: hidden;
} */

.button-approve {
  color: #bc6c42;
}
</style>
