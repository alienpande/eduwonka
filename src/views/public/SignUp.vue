<template>
  <el-row>
    <el-col :span="12">
      <e-svg icon="back" @click="$emit('backClick', $event)"></e-svg>
      <div class="left-container">
        <el-avatar
          shape="square"
          :size="190"
          :src="require('@/assets/images/eduwonka_logo.png')"
        ></el-avatar>
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et odio
        id velit sagittis viverra. Integer tellus libero, egestas eget egestas
        id, euismod vel ligula. Fusce sit amet euismod odio.
      </div>
    </el-col>
    <el-col :span="12">
      <div class="right-container">
        <h4>Account SignUp</h4>
        <e-input label="Institute Name" v-model="req.account.name" />
        <e-input label="Academic Period" v-model="req.academic_period.name" />
        <e-input label="Full Name" v-model="req.user.first_name" />
        <e-input label="Email Address" v-model="req.user.email" />
        <e-input label="Password" v-model="req.user.password" show-password />
        <e-button
          label="Sign Up"
          css="block-button mt30"
          @click="signUp"
        />
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { dispatchHttp, dispatchGraphql } from "@/api/dispatcher";

export default {
  data() {
    return {
      req: {
        user: {},
        account: {},
        academic_period: {}
      },
      dispatch_url: "/users/sign_up"
    };
  },
  methods: {
    superFromResponse(response) {

      this.$store
        .dispatch("User/signup", response)
        .then(() => {
          console.log("AFTER SIGN UP ");
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery,
          });
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });

      console.log(response);
    },
    signUp() {
      let data = {
        ...this.req
      }
      if (this.dispatch_url) {
        dispatchHttp(this.dispatch_url, data, "post")
          .then((response) => {
            this.loading = false;
            this.superFromResponse(response);
          })
          .catch((error) => {
            this.$emit("superFromError", error);
            this.loading = false;
          });
      } else {
        dispatchGraphql(this.query, data)
          .then((response) => {
            this.superFromResponse(response);
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            console.error(error);
          });
      }
    }
  },
};
</script>
<style scoped>
.el-row {
  height: 100vh;
  padding: 40px;
  overflow-y: scroll;
}
.left-container {
  text-align: center;
  width: 50%;
  margin: auto;
  margin-top: 10rem;
}
.right-container {
  background: rgba(252, 223, 189, 0.4);
  height: calc(100vh);
  padding: 50px 150px;
  border-radius: 10px;
}
.right-container > h4 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
