<template>
  <div v-loading="loading">
    <e-form
      :gutter="50"
      topHeading="You can drag the Created standard and put it in the desired sequence"
      bgColor="transparent"
      pLeft="0px"
      class="form-type-2"
    >
      <sections-card
        :span="8" :title= (text1)+(account_settings.standard_label)+(text) :standards="standards"
      />
      <sections-card
        border :span="8" :offset="6" :title="(text2)+(account_settings.standard_label) + '<small> Drag it to the desired location</small>'"
        :standards="latest_standard"
      />
    </e-form>
    <br />
  </div>
</template>
<script>
import SectionsCard from "./Sections.Card.vue"
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  props:['standard'],
  components: { SectionsCard },
  data() {
    return {
      standards: [],
      loading: true,
      latest_standard: [],
      account_settings: {},
      text: 'es',
      text1: 'Existing ',
      text2: 'New '
    };
  },
  created () {
    this.getAccountSettingId()
    this.getAllStandard()
    this.getStandard()
  },
  methods: {
    getAllStandard(){      
      const query = `query mQuery {
        standards{
          id
          name
          created_at
          standard_sections{
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log('standards', response)
        this.standards = response.standards
      })
    },
    getStandard() {
        const query =  `query($id: uuid!) {
          standards_by_pk(id: $id) { 
            id
            name
            standard_sections {
              id
              name
            }
          }
        }`
      dispatchGraphql(query, {id: this.standard}).then((response) => {
        console.log('standard', response)
        this.latest_standard.push(response.standards_by_pk) 
      })
    },
    getAccountSettingId(){
      const query = `
        query user($id: uuid!) {
          users_by_pk(id: $id) {
            id
            account{
              id
              account_settings{
                id
                standard_label
                section_label
              }
            }
          }
        }
        `
        dispatchGraphql(query, { id: getId() }).then(response => {
          this.users = response.users_by_pk
          this.account_settings = this.users.account.account_settings[0]
          this.loading = false
          // const account_setting_id = this.users.account.account_settings.id
          // this.getAccountSettings(account_setting_id)
        })
    },
    getAccountSettings(account_setting_id) {
      const query =`query account_setting($id: uuid!){
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
    handleBack() {
      this.$emit("back");
    },
  },
  mounted() {},
};
</script>