<template>
  <div>
    <e-container
      hideHeader
      pageTitle="Add standard fees line item"
      :back="$url.FI_SETTINGS_STANDARD_FEE"
    >
      <div style="color: #000000cc; padding-bottom: 10px" class="fs-20 f-500">
        View Add or Edit standard fees line item
      </div>
      <el-card
        shadow="none"
        style="background: #fcdfbd66; padding: 0 20px 40px 20px"
      >
        <el-row>
          <el-col :span="12">
            <e-select
              label="CHOOSE STANDARD"
              placeholder="X-A"
              v-model="req.standard"
              :options="standards"
            ></e-select>
          </el-col>
        </el-row>
      </el-card>
      <br />
      <el-card shadow="none">
        <el-row>
          <el-col class="standard-title" :span="5">Line Item</el-col>
          <el-col class="standard-title" :span="9">Total Amount (INR)</el-col>
          <el-col class="standard-title" :span="5">Total Amount (INR)</el-col>
        </el-row>
        <div v-for="(detail, i) in standardDetails" :key="i">
          <el-row>
            <el-col class="standard-text" :span="5">{{
              detail.lineitem
            }}</el-col>
            <el-col class="standard-text" :span="9">{{
              detail.totalAmaount
            }}</el-col>
            <el-col class="standard-title" :span="5">
              <div style="display: flex; padding: 5px 0; padding-top: 5px">
                <e-svg
                  v-if="detail.icon[0] === 'pen'"
                  style="margin-right: 10px"
                  icon="pens"
                  @click="editDialog = true"
                ></e-svg>
                <e-svg @click="deleteDialog=true"
                  v-if="detail.icon[1] === 'cross'"
                  style="margin-right: 10px"
                  icon="closes"
                ></e-svg>
                <e-svg v-if="detail.icon[2] === 'del'" icon="details"></e-svg>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row style="margin-top: 10px">
          <el-col :span="5" style="padding-right: 20px">
            <e-select
              v-model="req.menu"
              placeholder="Choose line item"
              :options="standards"
            ></e-select>
          </el-col>
          <el-col
            :span="9"
            style="padding-right: 20px; overflow: hidden; height: 73px"
          >
            <e-input></e-input>
          </el-col>
          <el-col style="display: flex" :span="5">
            <e-button
              :span="10"
              label="Done"
              css="sort-icon"
              :plain="true"
            ></e-button>
            <e-svg
              style="margin-right: 10px; margin-top: 5px"
              icon="closes"
            ></e-svg>
          </el-col>
        </el-row>
        <e-button
          icon="el-icon-plus"
          :plain="true"
          label="Add Line Item"
        ></e-button>
        <br />
        <br />
        <br />
      </el-card>
      <div class="heading">Total</div>
      <el-row>
        <el-col :span="8">
          <div
            style="
              color: #000000cc;
              font-size: 20px;
              font-weight: 500;
              padding: 10px 30px 10px 10px;
              background: #fcdfbd66;
            "
          >
            70,000 (Seventy thousand only)
          </div>
        </el-col>
        <el-col :span="3" :offset="3">
          <e-button label="View Logs" css="sort-icon" :plain="true"></e-button>
        </el-col>
      </el-row>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="10">
          <e-button
            :span="16"
            label="Cancel"
            width="180"
            css="cancel_btn"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="6"
            label="Update"
            width="180"
            @click="handleClick"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-container>
    <e-dialog
      :title="'Edit Logs of Lorem'"
      v-model="editDialog"
      width="50%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="editDialog = false"
      @confirm="editDialog = false"
    >
      <modal-text title="Created on 24/September/2020 Amount: Rs 20,000/-" />
      <modal-text subtitle="Edited by Anushka"
        >On 26/September/2020 Amount <b> changed </b> to: Rs
        10,000/-</modal-text
      >
      <modal-text class="last-child" subtitle="Edited by Anushka"
        >On 26/September/2020 Amount <b> changed </b> to: Rs
        10,000/-</modal-text
      >
    </e-dialog>

    <e-dialog
      :title="'Delete/Add Log'"
      v-model="deleteDialog"
      width="50%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="deleteDialog = false"
      @confirm="deleteDialog = false"
    >
      <modal-text
        title="On 24/September/2020 Ipsum was deleted by Arun"
        subtitle="Deleted by Anushka"
      />
      <modal-text
        title="On 24/September/2020 Ipsum was deleted by Arun"
        subtitle="Deleted by Anushka"
      />
      <modal-text
        class="last-child"
        title="On 24/September/2020 Ipsum was deleted by Arun"
        subtitle="Deleted by Anushka"
      />
    </e-dialog>
  </div>
</template>
<script>
import modalText from "@/components/finance/modalText.vue";
export default {
  components: { modalText },
  data: () => ({
    req: {},
    deleteDialog: false,
    editDialog: false,
    standardDetails: [
      {
        lineitem: "Lorem",
        totalAmaount: "20,000",
        icon: ["pen", "cross", "del"],
      },
      {
        lineitem: "Lorem",
        totalAmaount: "20,000",
        icon: ["pen", "cross"],
      },
      {
        lineitem: "Lorem",
        totalAmaount: "20,000",
        icon: ["pen", "cross"],
      },
      {
        lineitem: "Lorem",
        totalAmaount: "20,000",
        icon: ["pen", "cross", "del"],
      },
      {
        lineitem: "Lorem",
        totalAmaount: "20,000",
        icon: ["pen", "cross", "del"],
      },
    ],
    standards: [
      {
        label: "X",
        value: "x",
      },
      {
        label: "IX",
        value: "ix",
      },
      {
        label: "VIII",
        value: "viii",
      },
      {
        label: "VII",
        value: "vii",
      },
      {
        label: "VI",
        value: "vi",
      },
    ],
  }),
};
</script>
<style>
.standard-title {
  color: #000000cc;
  font-size: 16px;
  font-weight: 500;
}
.standard-text {
  color: #00000099;
  font-size: 16px;
  padding: 15px 0;
}
.last-child .all-modal-text {
  border: none !important;
}
</style>
