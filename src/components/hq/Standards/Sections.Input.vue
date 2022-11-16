<template>
  <div v-loading="loading">
    <p class="label ml20">{{ account_settings.section_label }}</p>
    <div
      class="form-block"
      style="background: transparent; padding: 0px 20px 10px 20px"
      v-for="(item, index) in obj"
      v-bind:item="item"
      v-bind:key="index"
    >
      <el-row :gutter="20" style="display: flex;">
        <el-col :span="23" class="input-wrapper" style="width:100%">
          <el-input
            :placeholder= (account_settings.section_label)+(text)
            v-model="item.val"
            @input="inputChange"
          ></el-input>
        </el-col>
        <el-col :span="1" style="width:auto">
          <e-svg
            v-show="obj.length > 1"
            icon="close2"
            @click="deleteSection(index)"
            css="h35"
          />
        </el-col>
      </el-row>
    </div>

    <e-button label="Add More" type="" icon="el-icon-plus" @click="addMore" />
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
// import { uuid } from "@/util/functions";
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      account_settings: {},
      loading: true,
      text: ' Name',
      obj: [
        {
          val: "",
        },
      ],
    };
  },
  methods: {
    addMore() {
      // const id = uuid();
      this.obj.push({
        // key: id,
        val: "",
      });
    },
    getAccountSettingId(){
      const query = `
        query user($id: uuid!) {
          users_by_pk(id: $id) {
            id
            account{
              id
              account_settings{
                id
              }
            }
          }
        }
        `
        dispatchGraphql(query, { id: getId() }).then(response => {
          this.users = response.users_by_pk
          const account_setting_id = this.users.account.account_settings.id
          this.getAccountSettings(account_setting_id)
        })
    },
    getAccountSettings(account_setting_id) {
      const query =`query account_setting($id: uuid!){
          account_settings_by_pk(id: $id) {
          standard_label
          section_label
        }
      }`
      dispatchGraphql(query, { id: account_setting_id }).then((response) => {
        this.account_settings = response.account_settings_by_pk
        this.loading = false
        console.log('AccountSettingsFetch', this.account_settings)
      })
    },
    deleteSection(i) {
      this.obj.splice(i, 1);
      this.inputChange();
    },
    inputChange() {
      this.$emit("input", this.obj);
      const data = [];
      this.obj.forEach((x) => {
        if (x.val != "") {
          data.push(x.val);
        }
      });
      this.$emit("object", data);
    },
  },
  created() {
    this.obj = this.value;
    this.inputChange();
    this.getAccountSettingId()
  },
  watch: {
    value(newVal) {
      this.obj = newVal;
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width:767px){
  /* .input-wrapper{
    width: auto;
  } */
}
</style>
