<template>
  <div v-loading="loading" :rules="rules">
    <e-form  :topHeading = (text1)+(this.account_settings.standard_label) pLeft="0px" bgColor="transparent">
      <e-input :span="24" :name= (this.account_settings.standard_label)+(text) v-model="standards.name" :placeholder= (this.account_settings.standard_label)+(text) rules="positive|odd" />
    </e-form>
    <e-form :gutter="50" heading="Add/Edit Categorisation" pLeft="5px" bgColor="transparent" >
      <sections-input  v-model="sections" @object="s = $event" rules="required" />
    </e-form>
    <hr class="end-of-form-line">
    <el-row class="form-last-buttons" style="justify-content:flex-end">
      <e-button :span="24" label="Next" width="180" @click="handleClick()" css="float-right" class="p-45" />
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import SectionsInput from "./Sections.Input.vue"
import { getId } from '@/util/auth'
export default {
  components: { SectionsInput },
  data() {
    return {
      rules: {},
      standards: {},
      loading: true,
      account_settings: {},
      text: 'Name',
      text1: 'Provide the below details to create new',
      mutation: `mutation insert_multiple_standards($objects: [standards_insert_input!]!) {
        insert_standards(objects: $objects) {
          returning {
            id
            name
            standard_sections {
              id
              name
            }
          }
        }
      }`,
      standards_data: [],
      dialogSection: false,
      standard_sections:[],
      sections: [{ val: "" }],
    };
  },
  created(){
    this.getAccountSettingId()
  },
  methods: {
    getVariables: function(sections) {
      const standard = {}
      standard.name = this.standards.name
      standard.standard_sections = {
        data: sections.map(item => ({ name: item.val }))
      }
      return {"objects": standard  }
    },
    getAccountSettingId() {
      const query = `query user($id: uuid!) {
        users_by_pk(id: $id) {
          id
          account{
            id
            account_settings {
              id
              standard_label
              section_label
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then(response => {
        this.users = response.users_by_pk
        this.account_settings = this.users.account.account_settings[0]
        this.loading = false
        // const account_setting_id = this.users.account.account_settings.id
        // this.getAccountSettings(account_setting_id)
      })
    },
    getAccountSettings(account_setting_id) {
      const query =`query account_setting($id: uuid!) {
        account_settings_by_pk(id: $id) {
          standard_label
          section_label
        }
      }`
      dispatchGraphql(query, { id: account_setting_id }).then((response) => {
        this.account_settings = response.account_settings_by_pk
        this.loading = false
        console.log('AccountSettingsFetch', this.account_settings)
      })
    },
    handleClick: function() {
      this.dialogSection = false
      dispatchGraphql(this.mutation, this.getVariables(this.sections)).then((response) => {
        console.log(response.insert_standards.returning[0].id)
        this.$emit("save", response.insert_standards.returning[0].id)
        console.log("cdd", this.account_settings.section_label)
        this.$emit("save", response.this.account_settings.section_label)
      })
    }
  }
}
</script>
<style scoped>
</style>
