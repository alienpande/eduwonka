<template>
  <div>
    <el-form
      ref="superForm"
      :rules="superForm.rules"
      :class="superForm.formClass"
      autocomplete="on"
      label-position="left"
    >
      <div
        v-for="(field, index) in superForm.fields"
        :key="field.position"
        :class="field.wrapper_class"
      >
        <!-- Email field -->
        <div v-if="field.type == 'email'">
          <el-form-item
            class="has-icon"
            :prop="'eduwonka' + index + 'superForm'"
          >
            <span v-if="field.icon" class="svg-container">
              <!-- <svg-icon :icon-class="field.icon" /> -->
            </span>
            <el-input
              :required="field.required"
              size="large"
              v-model="field.value"
              placeholder="$t(field.t)"
              :name="field.name"
              type="email"
              :autocomplete="field.autocomplete"
            />
          </el-form-item>
        </div>

        <!-- Password field -->
        <div v-if="field.type == 'password'">
          <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          >
            <el-form-item class="has-icon" prop="password">
              <span class="svg-container">
                <!-- <svg-icon icon-class="password" /> -->
              </span>
              <el-input
                size="large"
                :required="field.required"
                :key="passwordType"
                ref="password"
                v-model="field.value"
                :type="passwordType"
                placeholder="$t(field.t)"
                :name="field.name"
                :autocomplete="field.autocomplete"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleSubmit"
              />
              <span class="show-pwd" @click="showPwd">
                <!-- <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                /> -->
              </span>
            </el-form-item>
          </el-tooltip>
        </div>

        <!-- Text field -->
        <div v-if="field.type == 'text'">
          <el-form-item
            class="has-icon"
            :prop="'eduwonka' + index + 'superForm'"
          >
            <span v-if="field.icon" class="svg-container">
              <!-- <svg-icon :icon-class="field.icon" /> -->
            </span>
            <el-input
              :required="field.required"
              size="large"
              v-model="field.value"
              placeholder="$t(field.t)"
              :name="field.name"
              type="text"
              :autocomplete="field.autocomplete"
            />
          </el-form-item>
        </div>
      </div>

      <el-button
        size="large"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        class=""
        @click.native.prevent="handleSubmit"
      >
        $t(superForm.submit_text)
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { dispatchHttp, dispatchGraphql } from "@/api/dispatcher";

export default {
  name: "SuperForm",
  props: {
    /* eslint-disable */
    superForm: Object,
  },
  data() {
    return {
      loading: false,
      capsTooltip: false,
      passwordType: "password",
    };
  },
  created() {
    console.log(this.superForm);
  },
  computed: {},
  watch: {},
  methods: {
    handleSubmit() {
      console.log(this.$refs.superForm);
      console.log(this.superForm.dispatch);
      this.loading = true;
      var data = {};
      for (var i = 0; i < this.superForm.fields.length; i++) {
        console.log(this.superForm.fields[i]);
        data[this.superForm.fields[i].name] = this.superForm.fields[i].value;
      }

      if (this.superForm.dispatch_url) {
        dispatchHttp(this.superForm.dispatch_url, data, "post")
          .then((response) => {
            this.$emit("superFromResponse", response);
            this.loading = false;
          })
          .catch((error) => {
            this.$emit("superFromError", error);
            this.loading = false;
          });
      } else {
        dispatchGraphql(this.superForm.query, data)
          .then((response) => {
            this.$emit("superFromResponse", response);
            this.loading = false;
          })
          .catch((error) => {
            this.$emit("superFromError", error);
            this.loading = false;
          });
      }
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
