<template>
  <div>
    <e-container class="permission-slip-container" pageTitle="Permission Slips" btnIcon="el-icon-plus" btnText="Create Slip" @btnClick="$router.push('/connect/create-permission-slip')">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Approved" name="Approved">
          <div class="fs-20 f-500" style="color: #222222">
            {{ total }} Permission slips
          </div><br />
          <permission-card v-for="(slip, i) in permissionSlips" :key="i" @update="getPermissionSlips" @clicks="setDetails" :id="slip.id" :title="slip.name" :duedate="slip.due_date" :SignedStatus="setSigned(slip.audience) + '/' + slip.audience.length" />
        </el-tab-pane>
        <el-tab-pane label="Rejected" name="Rejected">
          <div class="fs-20 f-500" style="color: #222222">
            {{ total }} Permission slips
          </div><br />
          <permission-card v-for="(slip, i) in permissionSlips" :key="i" @update="getPermissionSlips" @clicks="showSideBar=true" :id="slip.id" :title="slip.name" :duedate="slip.due_date" :SignedStatus="setSigned(slip.audience) + '/' + slip.audience.length" />
        </el-tab-pane>
        <el-tab-pane label="Pending" name="Pending">
          <div class="fs-20 f-500" style="color: #222222">
            {{ total }} Permission slips
          </div><br />
          <permission-card v-for="(slip, i) in permissionSlips" :key="i" @update="getPermissionSlips" :id="slip.id" :title="slip.name" :duedate="slip.due_date" />
        </el-tab-pane>
      </el-tabs>
      <permission-right-bar :show="showSideBar" :slip="slip" :__onCancel="() => (showSideBar = !showSideBar)" />
    </e-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import permissionCard from "@/components/connect/permissionCard.vue";
import permissionRightBar from '@/components/connect/permissionRightBar.vue'
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
import _ from 'lodash'
export default {
  components: { permissionCard,permissionRightBar },
  data: () => ({
    activeName: "Approved",
    showSideBar:false,
    permissionSlips: [],
    total: 0,
    status: 'approved',
    slip: {}
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName == "Approved") {
        this.status = 'approved'
      } else if (this.activeName == "Rejected") {
        this.status = 'rejected'
      } else if (this.activeName == "Pending") {
        this.status = 'pending'
      }
      this.getPermissionSlips()
    })
  },
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    this.getPermissionSlips()
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    setDetails(id) {
      this.slip = this.permissionSlips.find(x => x.id == id)
      if (this.slip) {
        this.showSideBar = true
      }
    },
    setSigned(val) {
      return val.filter(x => x.status === 'signed').length
    },
    getVariables() {
      return {
        "id": getId(),
        "status": this.status,
      }
    },
    getPermissionSlips() {
      const query = `query($id: uuid, $status: String) {
        permission_slips(where: {_and: [{status: {_eq: $status}}, {created_by_id: {_eq: $id}}]}) {
          id
          name
          due_date
          status
          user {
            id
            first_name
          }
          audience {
            id
            status
            user {
              id
              first_name
            }
          }
        }
        permission_slips_aggregate(where: {_and: [{status: {_eq: $status}}, {created_by_id: {_eq: $id}}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.permissionSlips = response.permission_slips
        this.total = response.permission_slips_aggregate.aggregate.count
      })
    },
  }
};
</script>
