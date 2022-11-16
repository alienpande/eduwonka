<template>
  <el-row :gutter="20">
    <el-col :span="7">
      <e-svg f="help-circle" css="top-right-menu-icon-svg-sm" />
    </el-col>
    <el-col :span="7">
      <e-svg f="bell" css="top-right-menu-icon-svg-sm" />
    </el-col>
    <el-col :span="10">
      <div style="margin-top: 13px">
        <el-dropdown trigger="click" @command="handleActions">
          <span class="el-dropdown-link tx-12">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in actions" :key="item.value" :command="item.value">{{ item.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import { resetRouter } from "@/router/index"
import { getId } from '@/util/auth'
export default {
  data() {
    return {
      user: {},
      loading: false,
      actions: [
        { value: 'Dashboard', label: 'Dashboard' },
        { value: 'Campus List', label: 'Campus List' },
        { value: 'Logout', label: 'Logout' }
      ]
    };
  },
  created() {
    this.getUser()
  },
  methods: {
    handleActions(val) {
      if (val === 'Logout') {
        this.logout()
      } else if (val === 'Campus List') {
        this.$router.push(`/on-boarding/list-of-campus/${this.user.account_id}`)
      } else if (val === 'Dashboard') {
        this.$router.push('/')
      }
    },
    getUser() {
      this.loading = false
      const query = `query($id: uuid!) {
        users_by_pk(id:$id) {
          id
          account_id
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.user = response.users_by_pk
        this.loading = true
      })
    },
    logout() {
      resetRouter();
      this.$store.dispatch("User/logout");
      this.$router.push(`/signin?redirect=${this.$route.fullPath}`);
    },
  }
};
</script>
<style scoped>
.icon-svg {
  height: 35px;
  padding: 49px 23px;
  color: #4d4f5c;
}
.left-top-bar {
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  color: #4d4f5c;
  padding: 10px;
  margin: 15px 0px 15px 0px;
}
/* .left-top-bar:hover {
  background: #f8f0ec;
  border-radius: 4px;
  border: 2px solid #bc6c42;
} */
.left-top-bar > div {
  margin-top: 15px;
}
</style>
