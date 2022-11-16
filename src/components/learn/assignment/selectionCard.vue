<template>
    <div class="d-flex">
        <el-col v-for="user in users" :key="user.id" :span="span" @click="toggle" style="margin: 20px 0px 10px 0px">
            <div 
                class="student-profile-card"
                :class="(disabled ? 'disabled' : '') || (value ? '' : 'unselected')"
            >
                <el-avatar shape="circle" :size="size" :src="require('@/assets/images/profile.jpg')"></el-avatar>
                <div>
                    {{ user.first_name }}
                </div>
                <e-button v-if="verifyUser(user)" round plain label="select" size="small" @click="selectUser(user)" />
                <e-button v-if="!verifyUser(user)" round plain label="Deselect" size="small" @click="deselectUser(user)" />
            </div>
        </el-col>
    </div>
</template>

<script>
export default {
    props: {
        audience:{
            type :Array
        },
        users: {
            type: Array
        }
    },
  created() {
      console.log("default audeince",this.audience)
    //   this.verifyUser()
  },
  methods: {

   
     verifyUser(user) {
        // console.log("user in verify user", user);
        // console.log("audience", this.audience)
        console.log("user_id",user.id)
        const selectedUser = this.audience.filter(x => x.user_id === user.id)
        console.log("selected user",selectedUser,"audience", this.audience);
        // const selectedUser = this.audience.find(x => x.user_id === user.id)
        //  console.log(selectedUser);
        if (selectedUser) {
            console.log("true")
            return true
        } else {
            return false
        }
    },
    selectUser(user) {
        console.log("seleced user", user)
        if(user.id !=0 ){
        this.$emit("input", user);
        }
    },
    deselectUser(user) {
        console.log("deselceted user", user)
        this.$emit("deselect", user);
    },
  
    // toggle() {
    //   if (!this.disabled) {
    //     this.$emit("input", !this.value);
    //   }
    // },
  },
};
</script>
<style scoped>
.heading {
  font-size: 24px;
  font-weight: 400;
  margin-left: -3rem;
  margin-top: 5px;
  color: #000000cc;
}
</style>
