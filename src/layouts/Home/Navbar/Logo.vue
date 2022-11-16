<template>
  <section :class="s ? 'text-center' : ''">
    <div>
      <img
        v-if="this.bgColor() === 'black'"
        :src="StudentLogo"
        :class="s ? 'logo-sm' : 'logo'"
      />

      <img
        v-if="this.bgColor() === 'white'"
        :src="schoolLogo"
        :class="s ? 'logo-sm' : 'logo'"
      />
      <div class="logo-text" v-if="!s && this.bgColor() === 'white'">
        {{ schoolName }}
      </div>
      <div  v-if="!s && this.bgColor() === 'black'" class="header-search">
        <img
          style="display: inline-block; height: 30px"
          src="@/assets/images/student/search-icon-header.png"
          alt=""
        />

        <input
          style="display: inline-block"
          type="text"
          v-model="searchInput"
          class="header-search-input"
          placeholder="Search..."
        />
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchInput: "",
      schoolLogo: require("@/assets/images/logo.png"),
      StudentLogo: require("@/assets/images/student/studentLogo.png"),
      schoolName: "South Campus",
    };
  },
  computed: {
    s() {
      return this.view() === "s";
    },
  },
  methods: {
    ...mapGetters("Common", ["view", "bgColor"]),
  },
  created() {},
};
</script>

<style>
.logo {
  height: 60px;
  margin-top: 32px;
  cursor: pointer;
}
.logo-text {
  color: rgb(188, 108, 66);
  display: inline;
  letter-spacing: 2px;
  font-weight: 600;
  font-size: 20px;
  margin-top: 3.1rem;
  position: absolute;
  margin-left: 1.5rem;
  cursor: pointer;
}
.logo-sm {
  height: 30px;
  margin-top: 13px;
  cursor: pointer;
}
.header-search {
  position: fixed;
  top: 42px;
  display: flex;

  left: 43vw;
}
.header-search-input {
  background: transparent;
  border: none;
  color: #858585;
  font-size: 20px;
}
.header-search-input::placeholder{
color: #858585;
}
</style>
