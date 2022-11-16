<template>
  <div>
    <e-container hideHeader pageTitle="Add standard fee line item" :back="$url.FI_SETTINGS_STANDARD_FEE">
      <div style="color: #000000cc; padding-bottom: 10px" class="fs-20 f-500">
        View Add or Edit standard fees line item
      </div>
      <el-card shadow="none" style="background: #fcdfbd66; padding: 0 20px 40px 20px">
        <el-row>
          <el-col :span="12">
            <p>Choose Standard</p>
            <el-select v-model="standardFeeLine.standard_id" @change="handleChange(standardFeeLine.standard_id)">
              <el-option v-for="standard in standards" :key="standard.id" :label="standard.name" :value="standard.id" />
            </el-select>
            <!-- <e-select label="CHOOSE STANDARD" placeholder="standard" 
              v-model="standardFeeLine.standard_id"
              :options="standards"
              :optionName="'label'"
              :valueKey="'value'"
              @input="handleStandard"
            /> -->
          </el-col>
        </el-row>
      </el-card>
      <br />
      <el-card shadow="none">
        <el-row>
          <el-col class="standard-title" :span="9">Line Items</el-col>
          <el-col class="standard-title" :span="9">Total Amount (INR)</el-col>
          <el-col class="standard-title" :span="5">Actions</el-col>
        </el-row>
        <div v-for="(item, i) in standardFeelIneItems" :key="i">
          <el-row>
            <el-col class="standard-text" :span="9">{{ item.fee_line_item_type }}</el-col>
            <el-col class="standard-text" :span="9">{{ item.default_amount }}</el-col>
            <el-col class="standard-title" :span="5">
              <div style="display: flex; padding: 5px 0; padding-top: 5px">
                <e-svg style="margin-right: 10px" icon="pens" @click="editDialog = true" />
                <e-svg @click="deleteDialog=true" style="margin-right: 10px" icon="closes" />
                <e-svg icon="details"></e-svg>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row v-for="(item, i) in newLineItems" :key="i" style="margin-top: 10px">
          <el-col :span="9" style="padding-right: 20px">
            <e-input v-model="item.fee_line_item_type" placeholder="Enter item" />
          </el-col>
          <el-col :span="9" style="padding-right: 20px; overflow: hidden; height: 73px">
            <e-input v-model="item.default_amount" placeholder="Enter Amount"></e-input>
          </el-col>
          <el-col class="d-flex" :span="5">
            <e-button :span="10" label="Done" css="sort-icon" plain />&emsp;
            <e-svg v-if="newLineItems.length > 1" style="margin-right: 10px; margin-top: 5px" icon="closes" @click="handleDelete(i)" />
          </el-col>
        </el-row>
        <e-button icon="el-icon-plus" :plain="true" label="Add Line Item" @click="addMore()" />
        <br />
        <br />
        <br />
      </el-card>
      <div class="heading">Total</div>
      <el-row>
        <el-col :span="10">
          <div style="color: #000000cc; font-size: 20px; font-weight: 500; padding: 10px 30px 10px 10px; background: #fcdfbd66;">
            {{ getTotal() }}
          </div>
        </el-col>
        <el-col :span="3" :offset="3">
          <e-button label="View Logs" css="sort-icon" :plain="true"></e-button>
        </el-col>
      </el-row>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col class="float-right" :span="11">
          <e-button :span="16" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="$router.push($url.FI_SETTINGS_STANDARD_FEE)" />
          <e-button :span="6" label="Update" width="180" css="float-right" class="p-45" @click="handleClick" />
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
import modalText from "@/components/finance/modalText.vue"
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
export default {
  components: { modalText },
  data: () => ({
    newLineItems: [],
    standardFeeLine: {},
    deleteDialog: false,
    editDialog: false,
    standardFeelIneItems: [],
    standards: [],
  }),
  created() {
    this.getStandards()
    this.fillStandard()
  },
  methods: {
    fillStandard() {
      if (!this.standardFeeLine.standard_id && this.$route.params.standardId != 'new') {
        this.standardFeeLine.standard_id = this.$route.params.standardId
      }
      this.addMore()
      this.StandardItems()
    },
    handleChange(value) {
      this.$router.push(this.$url.FI_CREATE_STANDARD + `/${value}`)
      this.getStandards()
      this.StandardItems()
    },
    getStandards() {
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        console.log(response)
        this.standards = response.standards
      })
    },
    StandardItems() {
      const items = `query($id: uuid) {
        standard_fee_line_items(where: {standard_id: {_eq: $id}}) {
          id
          standard_id
          fee_line_item_type
          default_amount
        }
      }`
      dispatchGraphql(items, { id: this.standardFeeLine.standard_id }).then((response) => {
        this.standardFeelIneItems = response.standard_fee_line_items
        console.log('items', this.standardFeelIneItems)
      })
    },
    getTotal() {
      var sum = 0
      this.standardFeelIneItems.map(x => {
        sum = sum + x.default_amount
      })
      if (this.newLineItems.length > 0 && this.newLineItems[0].default_amount) {
        this.newLineItems.map(x => {
          sum = x.default_amount ? sum + parseInt(x.default_amount) : 0
        })
      }
      return sum
    },
    handleClick() {
      this.newLineItems.map(x => {
        x.standard_id = this.standardFeeLine.standard_id
      })

      console.log('standard', this.newLineItems)
      const mutation = `mutation($objects: [standard_fee_line_items_insert_input!]!) {
        insert_standard_fee_line_items(objects: $objects) {
          affected_rows
          returning {
            id
            standard_id
            fee_line_item_type
            default_amount
          }
        }
      }`
      dispatchGraphql(mutation, { objects: this.newLineItems }).then((response) => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Items Saved',
        })
        this.$router.push(this.$url.FI_SETTINGS_STANDARD_FEE)
      })
    },
    addMore() {
      var lineItem = {
        fee_line_item_type: "",
        default_amount: ""
      }
      this.newLineItems.push(lineItem)
    },
    handleDelete(i) {
      this.newLineItems.splice(i, 1)
    }
  }
}
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
