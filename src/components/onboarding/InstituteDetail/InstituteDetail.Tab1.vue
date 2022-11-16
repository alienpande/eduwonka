<template>
  <div>
    <e-form :gutter="50">
      <p class="text-center heading">
        The below information will be used to setup your institution dashboard
      </p>
      <e-profile-pic
        marginTop
        title="Institution Logo"
        :src="require('@/assets/images/profile.jpg')"
      ></e-profile-pic>
    </e-form>
    <!-- #region Academic Details Form -->
    <e-form :gutter="50" heading="Institution details">
      <e-input
        :span="12"
        name="Intitute Name"
        prop="name"
        v-model="institute.name"
        placeholder="Lorem"
        rules="positive|odd"
      ></e-input>

      <e-input
        :span="12"
        prop="phone"
        v-model="institute.phone"
        name="Mobile Number"
      ></e-input>
      <e-input
        :span="12"
        name="Alternate contact number"
        v-model="institute.alternate_phone_num"
        rules="positive|odd"
      ></e-input>

      <e-input
        :span="12"
        prop="email"
        v-model="institute.email"
        label="Email Address"
        placeholder=""
      ></e-input>
      <e-input
        :span="24"
        prop="address"
        type="textarea"
        v-model="institute.address"
        name="Permanent Address"
      ></e-input>

      <e-input
        :span="24"
        prop="email_domain"
        v-model="institute.email_domain"
        name="Email domain Address"
      >
        <template slot="append">
          <e-dropdown v-model="domain" :list="options" />
        </template>
      </e-input>
    </e-form>
    <!-- endregion -->
    <el-row>
      <e-button
        :span="24"
        label="Next"
        width="180"
        @click="handleClick"
        css="float-right"
        class="footer-top-border"
      ></e-button>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlQueryByPk } from "@/api/dispatcher"
// import { dispatchGraphqlQuery, dispatchGraphqlMutation, dispatchGraphqlQueryByPk } from "@/api/dispatcher";
// import { getId } from '@/utils/auth'
export default {
  components: {},
  data() {
    return {
      institute: {},
      domain: "eduwonka.com",
      mutation: `mutation insert_single_accounts($object: accounts_insert_input! ) {
        insert_accounts_one(object: $object) {
          id
        }
      }`,
      options: [
        {
          value: "eduwonka.com",
          text: "eduwonka.com",
        },
        {
          value: "edu.gov.com",
          text: "edu.gov.com",
        },
      ],
    };
  },
  created() {
    this.getInstitute()
  },
  methods: {
    getInstitute: function() {
      dispatchGraphqlQueryByPk('accounts',['id', 'name', 'email', 'uen', 'email_domain', 'address', 'postal', 'country_code', 'phone', 'status', 'onboarding', 'website', 'description', 'alternate_phone_num', 'location', 'block', 'street', 'country', 'unit_number', 'is_starred'], {id: '94208896-2db8-488e-8c60-ed512c946a67'}).then((response) => {
        this.institute = response.accounts_by_pk
        if (this.institute.id){
          this.$emit("save", this.institute.id);
        }
      })
    },
    getFilterVariables: function(institute) {
      return { "object": institute }
    },
    handleClick() {
      dispatchGraphql(this.mutation, this.getFilterVariables(this.institute)).then((response) => {
        console.log(response)
        this.$emit("save", response.insert_accounts_one.id);
      })
    },
  },
};
</script>

<style scoped></style>
