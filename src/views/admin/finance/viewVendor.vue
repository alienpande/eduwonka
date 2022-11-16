<template>
  <e-container hideHeader pageTitle="View Vendor" :back="$url.FI_VENDOR">
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width: 470px" />
    <viewVendor1 v-if="activeTab == 1" :user="user" @save="activeTab = 2;scrollTop();" />
    <viewVendor2 ref="tab2" v-if="activeTab == 2" :vendor="user.vendor_info" :catalogs="getCatalogs()" @back="activeTab = 1" @save="activeTab = 3" />
    <viewVendor3 v-if="activeTab == 3" @back="activeTab = 2" @save="activeTab = 1" />
  </e-container>
</template>
<script>
import viewVendor1 from '@/components/finance/vendor/viewVendor1.vue'
import viewVendor2 from '@/components/finance/vendor/viewVendor2.vue'
import viewVendor3 from '@/components/finance/vendor/viewVendor3.vue'
import { dispatchGraphql } from '@/api/dispatcher'
import { mapMutations } from "vuex"

// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { viewVendor1, viewVendor2, viewVendor3 },
  data() {
    return {
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "learn/Audience",
          title: "Vendor Details",
        },
        {
          id: 2,
          icon: "hq/healthRecords",
          title: "Catalogs",
        },
        {
          id: 3,
          icon: "invoice-details",
          title: "Invoices",
        },
      ],
      user: {}
    };
  },
  mounted() {
    this.setAsideMenuCollapse(false);
    setTimeout(() => {
      this.setAsideWidth("290px");
    }, 100);
  },
  created() {
    this.setAsideMenuCollapse(false);
    this.setAsideWidth("290px");
    this.getUser()
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    getCatalogs() {
      return this.user.vendor_info.catalogs
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${this.$route.params.id}") {
          id
          first_name
          address
          vendor_info {
            id
            contact_person
            contact_person_number
            gst_number
            tin_number
            catalogs {
              id
              name
              description
              price
              category {
                id
                name
              }
            }
            bank_details {
              id
              account_holder
              bank_name
              account_no
              ifsc_code
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.user = response.users_by_pk
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
};
</script>

<style>
.label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.e-form {
  background-color: white;
  height: auto;
  overflow-x: hidden;
}
</style>
>
