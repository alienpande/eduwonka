<template>
  <el-row class="login-page-responsive">
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
        <h4>Account SignIn</h4>
        <e-input label="Email Address" v-model="req.email" />
        <e-input type="password" label="Password" v-model="req.password" />
        <e-button label="Sign in" css="block-button mt30" @click="signin" />
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { dispatchHttp, dispatchGraphql } from "@/api/dispatcher";
import { mapMutations } from "vuex";
import admin from "@/router/routes/admin/index";
import parent from "@/router/routes/parent/index";
import student from "@/router/routes/student/index";
import teacher from "@/router/routes/teacher/index";

export default {
  data() {
    return {
      req: {},
      dispatch_url: "/users/sign_in",
    };
  },
  methods: {
    ...mapMutations("Common", ["setBg"]),

    superFromResponse(response) {
      console.log("SUPER FORM RESPONSE ", response);

      this.$store
        .dispatch("User/login", response)
        .then(async () => {
          const roles = await this.$store.dispatch("User/getInfo");
          let role = roles.toString();
          console.log("role", role);
          if (role === "student") {
            this.setBg("black");
          } else {
            this.setBg("white");
          }

          console.log("AFTER SIGN IN ", response);

          let permissionRoutes = { admin, parent, student, teacher };

          if (role) {
            this.$router.addRoutes(permissionRoutes[role]);
            this.$router.push({
              path: this.redirect || "/",
              query: this.otherQuery,
            });
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });

      console.log(response);
    },
    signin() {
      let data = {
        ...this.req,
      };
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
    },
  },
};
</script>
<style scoped>
.el-row {
  height: 100vh;
  padding: 10px 40px ;
  overflow-y: scroll;
}
/* login page */
.left-container {
  text-align: center;
  width: 50%;
  margin: auto;
  margin-top: 10rem;
}

.left-container >>> .el-avatar > img{
  border-radius:0px;
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
@media only screen and (max-width:767px){
  
  /* Login page  */
  .login-page-responsive {
    display: flex;
    flex-direction: column;
    padding: 40px 15px !important;
  }

  .login-page-responsive > div{
    width: 100% !important;
  }

  .login-page-responsive > div:last-child{
    margin: 20px 0px;
    margin-bottom: 50px;
  }

  .login-page-responsive > div:first-child > div{
    width: 100% !important;
    margin-top: 0px !important;
  }

  .login-page-responsive > div:last-child > div{
    padding: 30px 20px !important;
    height: 100% !important;
  }
}
</style>
