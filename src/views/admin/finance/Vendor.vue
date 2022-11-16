<template>
  <div class="about">
    <e-container class="finance-vendor" pageTitle="Vendor" btnIcon="el-icon-plus" btnText="Add Vendor" @btnClick="$router.push($url.FI_VENDOR_ADD)">
      <div class="sub-headers">   
      </div>
      <el-row class="finance-vendor-sub-head" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;">
        <el-col :span="12" style="padding-left: 15px" class="dropdown-tab">
          <!-- <e-dropdown :list="filter" primary class="text" /> -->
          <span class="tx-18 primary-text">{{ total }} Vendors</span>
        </el-col>
        <!-- <el-col :span="5" style="padding-left: 35px" class="primary-text dropdown-tab">
          <e-dropdown :list="filter2" primary class="text" />
        </el-col>
        <el-col :span="4" class="primary-text dropdown-tab">
          <span class="text">Clear filter</span>
        </el-col>
        <el-col style="margin-top: -10px;padding-left: 10px" :span="1" :offset="5">
          <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" />
        </el-col> -->
      </el-row>
      <br/>
      <e-table :table="vendors">
        <el-table-column label="Name" prop="first_name" width="300" />
        <el-table-column label="Contact Person" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.vendor_info.contact_person }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Phone number" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.vendor_info.contact_person_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Action" width="200">
          <template slot-scope="scope">
            <img @click="handleEdit(scope.$index, scope.row)" src="@/assets/images/download-action-icon.png" alt="" />
            <img @click="$router.push($url.FI_VENDOR_VIEW + '/' + scope.row.id)" src="@/assets/images/3dot-action.png" alt="" />
          </template>
        </el-table-column>
      </e-table>
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import Pagination from '@/components/Pagination'
import { mapMutations } from "vuex"
export default {
  components: { Pagination },
  data: () => ({
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    vendors: [],
  }),
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    this.getUsers()
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getusers()
    },
    getVariables() {
      return {
        'limit': this.limit,
        'offset': this.offset,
      }
    },
    getUsers() {
      const query = `query($limit: Int!, $offset: Int!) {
        users(limit: $limit, offset: $offset, where: {role: {_eq: "Vendor"}}) {
          id
          first_name
          vendor_info {
            id
            contact_person
            contact_person_number
          }
        }
        users_aggregate(where: {role: {_eq: "Vendor"}}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.vendors = response.users
        this.total = response.users_aggregate.aggregate.count
      })
    },
  },
};
</script>
<style scoped>
@media only screen and (device-width: 768px) {
  .pagination {
    width: 50%;
    font-size: 12px;
  }
  .dropdown-tab {
    margin-right: 3px;
    font-size: 12px;
  }
  .dropdown-tab .text {
    font-size: 12px;
  }
}
</style>