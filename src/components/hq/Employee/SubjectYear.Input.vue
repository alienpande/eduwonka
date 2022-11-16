<template>
  <div>
    <p class="label" style="margin-bottom: 30px">Add Subjects you are taking</p>
    <div
      class="form-block"
      style="background: transparent; padding: 0px 0px 10px 0px"
      v-for="(item, index) in obj"
      v-bind:item="item"
      v-bind:key="index"
    >
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">
          <span class="tx-16">Choose the Standard</span>
          <el-select v-model="item.section_id" placeholder="Choose the Standard" class="w-20" @change="inputChange">
            <el-option
              v-for="item in sections"
              :key="item.id"
              :label="(item.standard.name + ' - ' + item.name) || 'nil'"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="7" :offset="1">
          <span class="tx-16">Choose the subject</span>
          <el-select v-model="item.subject_id" placeholder="Choose the subject" class="w-20" @change="inputChange">
            <el-option
              v-for="item in subjects"
              :key="item.id"
              :label="item.name || 'nil'"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="7" :offset="1" style="padding:0px">
          <e-input
            type="number"
            name="Years of experience"
            v-model="item.experience_years"
            @input="inputChange"
          ></e-input>
        </el-col>
        <el-col :span="2">
          <e-svg
            style="display: flex;justify-content:center"
            v-show="obj.length > 1"
            icon="close2"
            @click="deleteSection(index)"
            css="h35 mt30"
          />
        </el-col>
      </el-row>
    </div>
    <e-button style="margin-left: 2.5%;" label="Add More" type="" icon="el-icon-plus" @click="addMore" />
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlDelete } from '@/api/dispatcher'
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      obj: [
        {
          section_id: '',
          subject_id: "",
          experience_years: "",
        },
      ],
      subjects: [],
      sections: []
    }
  },
  methods: {
    check(val) {
      console.log('subjects,', val)
    },
    getSections() {
      const query = `query {
        sections {
          id
          name
          standard {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.sections = response.sections
      })
    },
    getSubjects() {
      const query = `query {
        subjects {
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.subjects = response.subjects
        console.log('subs', this.subjects)
      })
    },
    addMore() {
      this.obj.push({
        section_id: "",
        subject_id: "",
        experience_years: "",
      });
    },
    deleteSection(i) {
      dispatchGraphqlDelete('section_subject_teachers', { id: this.obj.splice(i, 1)[0].id }).then((response) => {
        console.log('teacher subjects', response)
        this.obj.splice(i, 1)
      })
    },
    inputChange() {
      this.$emit("input", this.obj)
    }
  },
  created() {
    this.getSubjects()
    this.getSections()
    this.obj = this.value;
    if (this.value.length <= 0) {
      this.addMore();
    } else {
      if (this.value.length > 0) {
        this.value.map(x => {
          this.obj.push({
            section_id: x.section_id,
            subject_id: x.subject_id,
            experience_years: x.experience_years
          })
        })
        console.log('prop', this.obj)
      }
    }
    this.inputChange();
  },
  watch: {
    value(newVal) {
      this.obj = newVal;
    },
  },
};
</script>

<style scoped></style>