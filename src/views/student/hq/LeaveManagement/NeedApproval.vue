<template>
  <es-container hideHeader pageTitle="Apply Leave" :back="$url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL" class="bg-black-5">
    <el-card class="rounded-08 bg-black-2" style="border: none; margin: 30px" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Leave Details</span>
        </el-col>
      </el-row><br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-form :model="leave">
            <el-col :span="20" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Name</span>
              <el-form-item prop="name">
                <es-input v-model="leave.name" placeholder="Enter a name" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Class</span>
              <el-form-item prop="name">
                <es-select placeholder="Select Class" v-model="leave.standard_id" :options="standards" :optionName="'label'" :valueKey="'value'" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Section</span>
              <el-form-item prop="name">
                <es-select v-model="leave.section_id" placeholder="Select Section" :options="sections" :optionName="'label'" :valueKey="'value'" readonly />
              </el-form-item>
            </el-col>
            <el-col class="mg-t-40" :span="8" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">From</span>
              <el-form-item prop="name">
                <es-date-picker v-model="leave.from_date" placeholder="Select From Date" @change="setFromDate" />
              </el-form-item>
            </el-col>
            <el-col class="mg-t-40" :span="8" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">To</span>
              <el-form-item prop="name">
                <es-date-picker v-model="leave.to_date" placeholder="Select To Date" @change="setToDate" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <span class="mg-b-5 tx-16 tx-bolder text-white">Purpose of Leave Application</span>
              <el-form-item prop="name">
                <es-input v-model="leave.reasong" placeholder="Enter Details/Purpose ..." />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" style="border: none; margin: 30px;" shadow="none">
      <div style="color: #f3f3f3" class="fs-20 f-600">
        Attach Documents
      </div>
      <div class="rounded-08" style="border: 1px solid #6e6e6e; padding: 20px; margin-top: 10px">
        <div style="background: #353535;border: 1px dashed #575757;border-radius: 8px;padding: 50px 0;">
          <e-svg style="display: table; margin: auto" icon="uploadIcon">
          </e-svg>
          <div style="color: #cfcfcf; text-align: center; font-size: 12px">
            Drag & drop file here or Click to add
          </div>
        </div>
        <br />
        <div class="hr"></div>
        <br />
        <el-row>
          <el-col :span="11" style="margin-right: 10px" v-for="i in 4" :key="i">
            <el-row style="border-radius: 4px;background: #282828;padding: 10px;margin: 10px;">
              <el-col :span="2">
                <img style="width: 36px; height: 36px" src="@/assets/images/Rectangle9.png" alt=""/>
              </el-col>
              <el-col :span="20">
                <div>
                  <div v-if="i==1 || i==2">
                    <div style="font-size: 14px; color: white">
                      Social Science Exam Papers.pdf
                    </div>
                    <div style="color: #858585">230KB</div>
                  </div>
                  <di v-else class="d-flex" >
                    <div>
                      <div style="font-size: 14px; color: white">
                        Solved Assignment...
                      </div>
                      <div style="color: #858585">230KB</div>
                    </div>
                    <div>
                      <div style="width: 216px;height: 8px;background: #353535;border-radius: 4px;margin-top:12px;margin-left:30px;">
                        <div style="width: 73px;height: 8px;background: #1fc24e;border-radius: 4px;"></div>
                      </div>
                    </div>
                  </di>
                </div>
              </el-col>
              <el-col :span="2" class="ref-book-cross">
                <e-svg style="margin-top: 15px" icon="redCross"></e-svg>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <br/>
      <es-button icon='addPluse' width='250' text="Add additional notes"></es-button>
    </el-card>
    <el-row style=" margin-top: 20px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      <el-col :span="3" :offset="17">
        <es-button text="Cancel" width="200" />
      </el-col>
      <el-col style="float: right" :span="4">
        <es-button text="Apply leave" width="200" @click="Submit" :plain="true" />
      </el-col>
    </el-row>
  </es-container>
</template>
<script>
import esDatePicker from '../../../../studentControl/esDatePicker.vue'
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import { mapMutations } from "vuex"
import moment from 'moment'
export default {
  components: { esDatePicker },
  data() {
    return {
      leave: {},
      user: {},
      standards: [],
      sections: []
    }
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
    this.standSections()
    this.getUser()
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    getVariables() {
      var data = JSON.parse(JSON.stringify(this.leave))
      delete data.standard_id
      delete data.section_id
      delete data.name
      data.leavable_id = getId()
      data.leavable_type = 'Student'
      return {
        "object": data
      }
    },
    Submit() {
      const mutation = `mutation($object: leaves_insert_input!) {
        insert_leaves_one(object: $object) {
          id
        }
      }`
      dispatchGraphql(mutation, this.getVariables()).then((response) => {
        console.log(response)
        this.$router.push(this.$url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL)
      })
    },
    setFromDate(value) {
      this.leave.from_date = moment(value).format('')
    },
    setToDate(value) {
      this.leave.to_date = moment(value).format('')
    },
    standSections() {
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        for (const item of response.standards) {
          this.standards.push({ value: item.id, label: item.name })
        }
        dispatchGraphqlQuery('section', ['id', 'name']).then((response) => {
          for (const item of response.sections) {
          this.sections.push({ value: item.id, label: item.name })
        }
        })
      })
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          first_name
          section {
            id
            name
            standard {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.user = response.users_by_pk
        this.leave.name = this.user.first_name
        this.leave.section_id = this.user.section.id
        this.leave.standard_id = this.user.section.standard.id
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
};
</script>
