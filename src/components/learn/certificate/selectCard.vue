<template>
    <div class="d-flex">
        <el-col v-for="user in users" :key="user.sid" :span="span"  style="margin: 20px 0px 10px 0px"> <!-- @click="toggle" -->
            <div class="student-profile-card" > <!-- :class="(disabled ? 'disabled' : '') || (value ? '' : 'unselected')" -->
                <el-avatar shape="circle" :size="50" :src="require('@/assets/images/profile.jpg')"></el-avatar>
                <div> {{ user.first_name }} </div>
              
                <e-button v-if="verifyUser(user)" round plain label="select" size="small" @click="selectUser(user)" />
                <e-button v-if="!verifyUser(user)" round plain label="Deselect" size="small" @click="deselectUser(user)" />
            </div>
        </el-col>
    </div>
</template>

<script>
export default {
    props: {
        span: {type: Number, default: 24},
        audience: {
            type: Array
        },
        users: {
            type: Array
        }
    },
  created() {},
  methods: {
    verifyUser(user) {
        console.log(user);
        // const selectedUser = this.audience.filter(x => x.user_id === user.id)[0]
        console.log(this.audience);
        const selectedUser = this.audience.find(x => x.user_id === user.id)
         console.log(selectedUser);
        if (selectedUser) {
            return false
        } else {
            return true
        }
    },
    selectUser(user) {
        this.$emit("input", user);
    },
    deselectUser(user) {
        this.$emit("deselect", user);
    }
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
