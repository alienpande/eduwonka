<template>
  <div >
  <el-row class="form-type-3">  
    <el-row >
      <el-col :span="5" :offset="4">
        <div style="font-size: 16px; margin-bottom: 10px">
          Standard
        </div>
        <div style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px; background: white; padding: 10px;">
          {{ standardSubject.standards_by_pk.name }}
        </div><br>
        <!-- <e-input v-model="form.standard_id" :value="standardSubject.standards_by_pk.name" placeholder="Standard" label="Standard" readonly ></e-input> -->
        <div style="display: inline-flex">
          <e-svg icon="Group" />
          <div style="margin-left: 11px; width: 180px; opacity: 0.4; font-size: 14px" >
            The standard is default chosen from you left navigation selection
          </div>
        </div>
      </el-col>
      <el-col :span="5" :offset="1">
        <div style="font-size: 16px; margin-bottom: 10px">
          Subject
        </div>
        <div style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px; background: white; padding: 10px;">
          {{ standardSubject.subjects_by_pk.name }}
        </div><br>
        <!-- <e-input v-model="form.subject_id" :value="standardSubject.subjects_by_pk.name" placeholder="Subject" label="Subject" readonly ></e-input> -->
        <div style="display: inline-flex">
          <e-svg icon="Group" />
          <div style="margin-left: 11px; width: 180px; opacity: 0.4; font-size: 14px">
            The subject is default chosen from you left navigation selection
          </div>
        </div>
      </el-col>
      <el-col :span="5" :offset="1" :rules="rules">
        <div class="select-dropdown" :rules="[{ required: true, message: 'choose Difficulty level', trigger: 'blur' }]">
          <e-select :span="18" label="Difficulty" placeholder="Choose Difficulty level" v-model="form.difficulty_level" :options="difficulties" :optionName="'title'" :valueKey="'value'" @visible-change="setDifficulty" rules="required" /> 
          <!-- <e-select :span="18" name="Difficulty" placeholder="Medium" :options="subjects"></e-select> -->
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="5" :offset="4">
        <div class="select-dropdown" :rules="[{ required: true, message: 'Select Category', trigger: 'blur' }]">
          <e-select label="Category" placeholder="Select Category" v-model="form.category_id" :options="categories" :optionName="'name'" :valueKey="'id'" @visible-change="setCategory" />
        </div>
      </el-col>
      <el-col :span="10" :offset="1" :rules="[{ required: true, message: 'Add Notes', trigger: 'blur' }]">
        <div style="font-size: 16px; font-weight: 500; margin-bottom: 10px">
          Notes for instructor
        </div>
        
        <textarea style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px; background: white; padding: 10px;" v-model="form.notes" placeholder="Type here to add notes" rows="3" cols="62" />
      </el-col>
    </el-row>
  </el-row>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px" class="form-last-buttons">
      <!-- <el-col style="float: right" :span="9"> -->
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Create question" width="180" @click="handleClick" css="float-right" class="p-45" />
      <!-- </el-col> -->
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphqlQuery } from "@/api/dispatcher"
  export default {
    props: {
      standardSubject: {
        type: Object
      }
    },
    data: () => ({
      form: {},
      categories: [],
      difficulties: [
        {
          title: "Easy",
          value: "Easy",
        },
        {
          title: "Medium",
          value: "Medium",
        },
        {
          title: "Hard",
          value: "Hard",
        }
      ],
      rules: {},
    }),
    created() {
      this.setStandardSubject()
      this.getCategories()
    },
    methods: {
      getCategories() {
        dispatchGraphqlQuery('categories', ['id', 'name']).then((response) => {
          console.log(response)
          this.categories = response.categories
        })
      },
      setDifficulty(value) {
        this.form.difficulty_level = value
      },
      setCategory(value) {
        this.form.category_id = value
      },
      setStandardSubject() {
        this.form.standard_id = this.standardSubject.standards_by_pk.id
        this.form.subject_id = this.standardSubject.subjects_by_pk.id
      },
      handleClick() {
        this.$emit('submit', this.form)
      }
    }
  }
</script>
