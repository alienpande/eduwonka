<template>
    <div class="d-flex">
        <el-col v-for="user in users" :key="user" :span="span" @click="toggle" style="margin: 20px 0px 10px 0px">
            <div @click="handleUser(user)"
                class="student-profile-card"
                :class="(disabled ? 'disabled' : '') || (value ? '' : 'unselected')"
            >
                <el-avatar shape="circle" :size="size" :src="require('@/assets/images/profile.jpg')"></el-avatar>
                <div>
                    {{ user.first_name }}
                </div>
                <e-button
                    round
                    :plain="!value"
                    :label="disabled ? 'Not allowed' : !value ? 'Excellent' : 'Average'"
                    size="small"
                    @click="toggle"
                />
            </div>
        </el-col>
    </div>
</template>

<script>
export default {
    props: {
        users: {
            type: Array
        }
    },
  created() {},
  methods: {
    handleUser(user) {
        this.$emit("input", user);
    },
    toggle() {
      if (!this.disabled) {
        this.$emit("input", !this.value);
      }
    },
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
