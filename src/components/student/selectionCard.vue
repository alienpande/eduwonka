<template>
<div>
  <el-col v-for="user in users" :key="user" :span="span" @click="toggle" style="margin: 20px 0px 20px 0px">
    <div v-if="!verifyUser(user)" class="pointer selected-profile-card" @click="deselectUser(user)">
      <e-svg icon="vector" style="width: 2px;" />
      <el-avatar shape="circle" :size="size" :src="require('@/assets/images/profile.jpg')"></el-avatar>
      <div class="text-white">
        {{ user.first_name }} - {{user.last_name}}
      </div>
    </div>
    <div v-else class="pointer profile-card" @click="selectUser(user)">
      <el-avatar shape="circle" :size="size" :src="require('@/assets/images/profile.jpg')"></el-avatar>
      <div class="text-white">
        {{ user.first_name }} - {{user.last_name}}
      </div>
    </div>
  </el-col>
</div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: []
    },
    moderators: {
      type: Array,
      default: []
    },
    value: {
      type: Boolean,
      default: false,
    },
    span: {
      type: Number,
      default: 8,
    },
    btnText: {
      type: String,
      required: "",
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    unSelected: {
      type: Boolean,
      required: false,
    },
    src: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 90,
    },
  },
  data() {
    return {
    }
  },
  methods: {
    toggle() {
      if (!this.disabled) {
        console.log('$$$$$$$$$$$$$$$$$$$$$', this.value);
        // this.$emit("input", !this.value);
      }
    },
    verifyUser(user) {
        const selectedUser = this.moderators.filter(x => x.user_id === user.id)[0]
        if (selectedUser) {
            return false
        } else {
            return true
        }
    },
    selectUser(user) {
      console.log('$$$$$$$$$$$$$$$$$$$$$', user);
      this.$emit("input", user);
    },
    deselectUser(user) {
      console.log('$$$$$$$$$$$$$$$$$$$$$', user);
        this.$emit("deselect", user);
    }
  },
};
</script>
<style scoped>
.selected-profile-card {
  border: 2px solid #353535;
  border-radius: 10px;
  height: 200px;
  text-align: center;
  margin: auto;
  width: 170px;
  background: #353535;
}
.selected-profile-card > div {
  font: normal normal bold 15px/22px Poppins;
  letter-spacing: -0.5px;
  padding: 15px 20px;
}

.selected-profile-card > span.el-avatar.el-avatar--circle {
  margin-top: 0px;
  border: 2px solid #1FC24E;
}
.profile-card {
  border: 2px solid #282828;
  border-radius: 10px;
  height: 200px;
  text-align: center;
  margin: auto;
  width: 170px;
  background: #282828;
}
.profile-card > div {
  font: normal normal bold 15px/22px Poppins;
  letter-spacing: -0.5px;
  padding: 15px 20px;
}

.profile-card > span.el-avatar.el-avatar--circle {
  margin-top: 50px;
  border: 2px solid #282828;
}
</style>
