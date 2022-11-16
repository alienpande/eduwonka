<template>
  <el-row :gutter="20">
    <el-col :span="7">
      <div class="left-top-bar">
        <e-svg
          :class="{ 'white-icon': this.bgColor() === 'black' }"
          f="help-circle"
          css="top-right-menu-icon-svg"
        />
        <div v-if="this.bgColor() === 'white'">Help</div>
      </div>
    </el-col>
    <el-col :span="7">
      <div class="left-top-bar">
        <e-svg
          f="bell"
          css="top-right-menu-icon-svg"
          :class="{ 'white-icon': this.bgColor() === 'black' }"
        />
        <div v-if="this.bgColor() === 'white'">Notification</div>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="left-top-bar" >
        <el-avatar
          size="medium"
          :class="{'margin20' : this.bgColor() === 'black'}"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <div style="margin-top: 3px" v-if="loading">
          <e-dropdown
            noDefault
            :list="menu"
            @input="handleDropdown"
            class="tx-12"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import eSvg from "@/controls/eSvg.vue";
import eDropdown from "@/controls/eDropdown.vue";
import { resetRouter } from "@/router/index";
import { getId } from '@/util/auth'
import { mapGetters } from "vuex";
export default {
  components: { eSvg, eDropdown },
  data() {
    return {
      user: {
        account_id: ''
      },
      loading: false,
      menu: [
        { text: "Dashboard", to: "/" },
        { text: "My Profile" },
        { text: "Campuses List" },
        { text: "Logout", divided: true },
      ],
    };
  },
  created() {
    this.getUser()
  },
  methods: {
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
        this.menu[2] = { text: "Campus List", to: `/on-boarding/list-of-campus/${this.user.account_id}` }
        this.loading = true
      })
    },
    ...mapGetters("Common", ["bgColor"]),
    handleDropdown(i) {
      if (i.text == "Logout") {
        this.logout();
      }
    },
    logout() {
      resetRouter();
      this.$store.dispatch("User/logout");
      this.$router.push(`/signin?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>
<style>
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
.white-icon svg {
  color: white !important;
  margin-top:20px;
}

</style>
