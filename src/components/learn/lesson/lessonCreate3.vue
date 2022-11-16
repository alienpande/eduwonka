<template>
  <div>
    <el-row>
      <el-col class="custom-input" :span="6">
        <p>Standard</p>
        <div>
         {{standard.name}}
        </div>
      </el-col>
      <el-col :span="6" :offset="1">
        <div class="select-dropdown">
          <!-- <e-select
            :span="18"
            name="Assign a teacher"
            placeholder="Stephan Donald"
            :options="subjects"
          ></e-select> -->
          <e-select
            :span="12"
            label="Teacher"
            placeholder="Choose Teacher"
            :v-model="lesson4.user_id"
            :options="teachers"
            :optionName="'first_name'"
            :valueKey="'id'"
            :field="'user_id'"
            @visible-change ="visibleChange"
          ></e-select>
        </div>
        <div style="display: inline-flex; margin-top: 30px">
          <e-svg icon="Group" />
          <div style="margin-left: 11px; opacity: 0.4; font-size: 14px">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et.
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="9">
        <e-button
          :span="15"
          label="Cancel"
          width="180"
          css="cancel_btn"
          type="default"
          class="p-45"
        ></e-button>
        <e-button
          :span="8"
          label="Proceed"
          width="180"
          @click="setData()"
          css="float-right"
          class="p-45"
        ></e-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphqlQueryByPk } from '@/api/dispatcher'

export default {
  props: ['teachers'],
  data: () => ({
    lesson3: {},
    lesson4: {},
    subjects: [
      {
        title: "Group 1",
        value: "Group 1",
      },
      {
        title: "Group 2",
        value: "Group 2",
      },
      {
        title: "Group 3",
        value: "Group 3",
      },
      {
        title: "Group 4",
        value: "Group 4",
      },
    ],
    standard: {}
  }),
  created () {
    console.log(this.teachers)
    this.getStandard()
  },
  methods: {
    setData() {
      this.$emit('save',this.lesson4)
    },
    visibleChange: function(value, field) {
      this.lesson4[field] = value
    },
    getStandard: function() {
      dispatchGraphqlQueryByPk('standards',['id', 'name'],{id: this.$route.params.standard_id}).then((response) => {
      this.standard = response.standards_by_pk
      console.log(this.standard)
    })
    },

  }
};
</script>
