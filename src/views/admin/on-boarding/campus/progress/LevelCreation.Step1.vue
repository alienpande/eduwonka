<template v-loading="loading">
  <e-container-lite
    :tag="campus.name"
    :campusid="$route.params.id"
    @back="$go($url.ONBOARD_CAMPUS, { name: 'campus.name' })"
    @next="$go($url.LEVEL_CREATION_STEP2+ '/' + campus.id)"
  >
    <template #titleHead>
      <div class="h1">Level Creation</div>
      <div class="h5">
        Kindly create the levels (eg standard/class/grades) and their divisions
        relevant for your institution
      </div>
    </template>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <e-form 
      heading="Add Levels"
      subHeading="Kindly create the Levels to access the student’s progress"
      formInnerBorder :rules="rules"
      innerFormCss="inner-form-css-level-creation-step-1"
    >
      <el-col :span="24">
        <h3 class="h3 mb30">
          What term Is used in your Institution to define Level and its
          divisions
        </h3>
      </el-col>

      <e-input label="Term Used for level(eg Standard, class)"
        prop="standard_label"
        v-model="account_settings.standard_label"
        rules="required"
      />

      <e-input label="Term Used for Division(eg Section)"
       prop="section_label"
        v-model="account_settings.section_label" rules="required"/>

      <e-button
        @click="handleSubmit(handleClick)"
        label="Proceed"
        type="primary"
      />
      <e-spacer height="350px" />
    </e-form>
    </ValidationObserver>
  </e-container-lite>
</template>
<script>
import { dispatchGraphqlQueryByPk, dispatchGraphqlMutation } from "@/api/dispatcher"
export default {

  data() {
    return {
      loading: true,
      account: {},
      campus: {},
      rules: {},
      account_settings: {},
      domain: "eduwonka.com",
      mutation: `mutation insert_single_account_settings($object: account_settings_insert_input! ) {
        insert_account_settings_one(object: $object) {
        id
        }
      }`,
    };
  },
  computed: {
    isValid () {
      return this.account_settings.standard_label && this.account_settings.section_label;
    }
  },
  created() {
    this.getAccountSettings()
  },
  methods: {
    getAccountSettings: function() {
      // this.loading = true
      dispatchGraphqlQueryByPk('campuses',['id', 'name', {account: ['id', {account_settings: ['id', 'section_label', 'standard_label']}]}],{id: this.$route.params.id}).then((response) => {
        this.campus = response.campuses_by_pk
        this.account = this.campus.account
        this.account_settings = this.campus.account.account_settings
        this.loading = false
      })
    },
    getFilterVariables: function(account_settings) {
      account_settings.account_id = this.account.id
      return { "object": this.account_settings }
    },
    handleClick() {
      dispatchGraphqlMutation('account_settings', ['id'], this.account_settings).then((response) => {
        console.log(response)
        this.$emit("save", this.account_settings);
            // $go($url.LEVEL_CREATION_STEP2)
            // this.$router.push(this.$url.LEVEL_CREATION_STEP2)
            this.$router.push(`/on-boarding/level-creation-step-2/${this.$route.params.id}`)
      })
    },
  },
};
</script>
