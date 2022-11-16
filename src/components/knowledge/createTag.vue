<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <right-side-bar :show="show" @onClose="__onCancel">
      <div
        style="opacity: 0.8; display: block; width: 10rem; padding: 34px"
        class="f-600 fs-20"
      >
        Create Tag
      </div>
      <div style="background: #e6eaed; padding: 0 40px" :rules="rules">
        <el-row>
          <el-col :span="10">
            <br />
            <e-input class="custom-input" label="Tag name" placeholder="Thermodynamic" v-model="tags.name" rules="required"
            ></e-input>
          </el-col>

          <el-col>
            <!-- <e-select
              :span="10"
              class="select-dropdown"
              label="Choose Subject"
              placeholder="Physics"
            ></e-select> -->
            <e-select
              :span="10"
              label="Subject"
              placeholder="Choose Subject"
              :v-model="tags.subject_id"
              :options="subjectData"
              :optionName="'name'"
              :valueKey="'id'"
              :field="'subject_id'"
              @visible-change ="visibleChange"
              rules="required"
            ></e-select>
          </el-col>
        </el-row>
        <br />

        <div style="padding: 20px 0" class="f-600">Who will get access</div>
        <div class="employe-check" v-for="(check,i) in checkBox" :key="i" style="height: 450px; width: 356px; display: flex; flex-flow: column wrap; flex-wrap: wrap;">
          <!-- <div style="color: #bc6c42; font-size: 20px; font-weight: 600; margin-left: 15px; margin-bottom: 7px;">
           {{ check.latter }}
          </div> -->
          <div v-for="(acces, i) in buttonInfo" :key="i" style="margin: 5px 15px" rules="required">
            <el-checkbox v-model="acces.check" @change="handleSelected(acces, i)" rules="required"></el-checkbox>
            <div style="color: #00000099; display: inline-block; margin-left: 10px">
              {{ acces.btnText }}
            </div>
          </div>
          <e-button label='Create'  @click="handleSubmit(handalClick)"></e-button>
        </div>
         <!-- <button
            style="
              padding: 8px 13px;
              border-radius: 5px;
              background: white;
              border: 1px solid;
              font-size: 15px;
              margin-right: 15px;
              margin-bottom: 15px;
              text-transform: uppercase;
            "
             v-for="(info,i) in buttonInfo" :key="i"
            :class="{ checktrue: info.btnValue }"
            @click="info.btnText = !info.btnText"
          >
            <el-checkbox v-model="tagAcces.btnText"> </el-checkbox>
           {{info.btnText}}
          </button> -->
        
          <br/>
            <br/>
              <br/>
                <br/>
                  <br/>
                    <br/>
      </div>
    </right-side-bar>
    </ValidationObserver>
  </div>
</template>

<script>
import { dispatchGraphqlQuery,dispatchGraphqlMutation } from "@/api/dispatcher";
import RightSideBar from "@/components/school/rightSideBar.vue";
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    subjectData: [],
    subjects:[],
    req: {},
    tagAcces: [],
    checkBox: [
      {
        latter:'A'
      }
    ],
    tags:{},
    buttonInfo:[
        {
            btnText:'Kinder school',
            btnValue:false
        },
         {
            btnText:'Pre school',
            btnValue:true
        },
         {
            btnText:'Mid school',
            btnValue:false
        },
         {
            btnText:'High school',
            btnValue:false
        },
    ],
    sample: [],
    rules: {
      access_type: [
        { required: true, message: 'Select Access Type', trigger: 'blur' }
      ]
    }
  }),
  computed: {
    isValid () {
      return this.tags.name && this.tags.subject_id && this.acces.check;
    }
  },
  methods: {
    handleSelected(val, i) {
      if (val.btnText) {
        this.tagAcces.push({
          access_type: val.btnText,
        })
      } else {
        this.tagAcces.splice(i, 1)
      }
      console.log('this', this.tagAcces)
    },
    visibleChange: function(value, field) {
      this.tags[field] = value
      console.log('ids', this.tags)
    },
    getid(val) {
      console.log('idss', val)
    },
    getSubData() {
      this.sample.access_type = this.tagAcces.map(x => x.access_type)
      // console.log('tagAcces', this.sample)
      this.tags.access_type = '{' + (this.sample.access_type || []).map(x => x).join(',') + '}'
      // this.tags.access_type = this.tagAcces.map(x => x.access_type)
      // console.log('createdtag', this.tags.access_type)
      return  this.tags
    },
    getSubjects() {      
      dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
        this.subjectData = response.subjects
      })
    },
      handalClick() {
        dispatchGraphqlMutation('tags', ['id', 'access_type'], this.getSubData()).then((response) => {
        console.log("createdTags", response)
      })
    },
  },
  created() {
    this.getSubjects()
  }
};
</script>
<style>
.employe-check .el-checkbox__inner {
  background: #fcdfbd66;
}
</style>
