<template>
  <e-container class="school-attendance" :pageTitle="(selectedStandard.id ? selectedStandard.name : '') + ' Attendance'" btnIcon="el-icon-plus" btnText="Holiday Marking" @btnClick="HolidayMarking = true" >
    <div style="position: absolute;width: 10rem;top: 190px;border-bottom: 1px solid #f3f3f3;padding-bottom: 13px;">
      <e-select v-model="selectedStandard.id" :options="standards" :optionName="'name'" :valueKey="'id'" @visible-change="setStandard" />
    </div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <div v-if="holidayDay">
        <h5>Today is Holiday for {{ selectedStandard.name }}</h5>
      </div>
      <div v-else style="overflow:scroll">
        <div>
          <span class="fs-18">{{ students.length }} Students</span>
        </div><br />
        <table width="60%" cellspacing="0px" :rules="rules">
          <thead>
            <tr>
              <td style="padding: 20px;background: #fff;border-top-left-radius: 10px;border-bottom: 1px solid #ececec;border-right: 1px solid #ececec;">
                Students
              </td>
              <td v-for="(type, index) in attendanceValue" :key="index" style="text-align: center;background: #fff;padding: 20px;border-bottom: 1px solid #ececec;border-right: 1px solid #ececec;">
                {{ type }}
              </td>
              <!-- <td
                style="
                  text-align: center;
                  background: #fff;
                  padding: 20px;
                  border-bottom: 1px solid #ececec;
                  border-top-right-radius: 10px;
                "
              >
                Evening
              </td> -->
            </tr>
          </thead>
          <tr v-for="(s, j) in students" :key="j">
            <td width="40%" style="padding: 15px 20px 10px 20px; background: #fff">
              <e-img-name :src="require('@/assets/images/profile.jpg')" :name="s.first_name" />
            </td>
            <td v-for="(type, index) in attendanceValue" :key="index" width="30%" style=" padding: 15px 20px 10px 20px; background: #fff; text-align: center; border-left: 1px solid #ececec;">
              <div :class="verifyAttendance(s, type).status === 'P' ? 'attendance present': 'attendance absent'" @click="updateStatus(verifyAttendance(s, type))" >{{ verifyAttendance(s, type).status }}</div>
            </td>
            <!-- <td
              width="30%"
              style="
                padding: 15px 20px 10px 20px;
                background: #fff;
                text-align: center;
                border-left: 1px solid #ececec;
              "
            >
              <div class="attendance absent">A</div>
            </td> -->
          </tr>
        </table>
      </div>
      <e-dialog :title="'Holiday Marking'" v-model="HolidayMarking" width="50%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="HolidayMarking = false" @confirm="HolidayMarking = false" :rules="rules">
        <hr class="end-of-form-line" style="margin-top:0px">
        <el-row class="view-no-form">
          <el-col :span="6">
            <p>Holiday Type</p>
            <!-- <e-select class="select-dropdown"  :options="subjects" label="Holiday Type"> </e-select> -->
            <el-select v-model="holiday.holiday_type" rules="required">
              <el-option v-for="item in holidayData" :key="item.value" :label="item.text" :value="item.value" rules="required" />
            </el-select>
          </el-col>
          <el-col class="custom-input-textarea" :span="9" :offset="1">
            <e-input v-model="holiday.description" type="textarea" label="Descript" placeholder="Text Field" rules="required" />
          </el-col>
        </el-row>
        <br />
        <el-row class="view-no-form">
          <el-col :span="6">
            <!-- <e-select v-model="standard"
              label = "standard"
              placeholder = "Choose Standard"
              :options="standards"
              :optionName = "'name'"
              :valueKey = "'id'"
              :field = "'id'"
            >
            </e-select>  -->
            <p>Standard</p>
            <el-select v-model="holiday.standard_id" rules="required">
              <el-option v-for="standard in standards" :key="standard.id" :label="standard.name" :value="standard.id" rules="required" />
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <e-date-picker v-model="holiday.from_date" placeholder="from_date" label="Pick from Date" class="custom-date-picker" @change="addFromDate" rules="required" />
          </el-col>
          <el-col :span="6" :offset="1">
            <e-date-picker v-model="holiday.to_date" label="Pick to Date" placeholder="to_date" class="custom-date-picker" @change="addToDate" rules="required" />
          </el-col>
        </el-row>
        <el-row class="form-last-buttons" style="margin-top:10%;justify-content: center;">
          <e-button label='Create Holiday' @click="handleSubmit(insertData)"></e-button>
        </el-row>
      </e-dialog>
    </ValidationObserver>
  </e-container>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: {},
  data: () => ({
    rules: {
      holiday_type: [
        { required: true, message: 'Please Select Holiday type', trigger: 'blur' }
      ],
      standard_id: [
        { required: true, message: 'Please Select Standard', trigger: 'blur' }
      ],
      from_date: [
        { required: true, message: 'Please Select Date', trigger: 'blur' }
      ],
      to_date: [
        { required: true, message: 'Please Select Date', trigger: 'blur' }
      ],
    },
    selectedStandard: {},
    sectionIds: [],
    HolidayMarking: false,
    standards: [],
    holiday: {},
    holidayDay: false,
    holidayData: [
      {
        title: "Emergency",
        value: "Emergency",
      },
      {
        title: "Public",
        value: "Public",
      },
      {
        title: "Holiday",
        value: "Holiday",
      }
    ],
    newStudentAttendance: [],
    studentAttendance: [],
    attendanceCount: [],
    attendanceValue: [],
    attendableValue: [],
    students: [],
    studentsIds: [],
    userQuery: `query($id: uuid!) {
      users_by_pk(id: $id) {
        id
        academic_year {
          id
          campus {
            id
            setting {
              id
              attendance_type
            }
          }
        }
      }
    }`,
    studentQuery: `query($section_id: [uuid!]) {
      users(where: {_and: [{role: {_eq: "student"}}, {section_id: {_in: $section_id}}]}) {
        id
        first_name
      }
    }`,
    attendanceQuery: `query($ids: [uuid!]) {
      attendances(where:{attendable_id: {_in: $ids}}) {
        id
        attendable_id
        attendance_type
        taken_at
        status
        attendance_type
        attendance_value
      }
    }`,
    attendanceInsertMutation: `mutation($objects: [attendances_insert_input!]!) {
      insert_attendances(objects: $objects) {
        affected_rows
        returning {
          id
        }
      }
    }`,
    updateMutation: `mutation($id: uuid!, $status: String) {
      update_attendances_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
        id
        status
      }
    }`,
    standardQuery:`query {
      standards {
        id
        name
        holidays {
          id
          from_date
          to_date
        }
        standard_sections {
          id
          name
        }
        time_table {
          id
          week_day
          start_time
          end_time
          skill {
            id
            name
          }
          subject {
            id
            name
          }
        }
      }
    }`
  }),
  created() {
    this.getStandards()
    // this.getUser()
  },
  computed: {
    isValid () {
      return this.holiday.holiday_type && this.holiday.from_date && this.holiday.standard_id && this.holiday.to_date;
    }
  },
  methods: {
    setStandard(val) {
      this.students = []
      this.selectedStandard = this.standards.find(x => x.id === val)
      this.sectionIds = this.selectedStandard.standard_sections.map(x => x.id)
      const holiday = this.selectedStandard.holidays.filter(x => (
        moment(x.from_date).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') && moment(x.to_date).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')
      ))
      if (holiday.length > 0) {
        this.holidayDay = true
        console.log(holiday, 'holiday')
      } else {
        this.holidayDay = false
        this.getUser()
      }
    },
    getStandards(){
      dispatchGraphql(this.standardQuery).then((response) => {
        this.standards = response.standards
        console.log('standards', this.standards)
      })
    },
    addToDate(value) {
      this.holiday.to_date = moment(value).format('')
    },
    addFromDate(value) {
      this.holiday.from_date = moment(value).format('')
    },
    getHolidayVariables() {
      return {
        "object": this.holiday
      }
    },
    insertData() {
      const holidayMutation= `mutation insert_single_holidays($object: holidays_insert_input!) {
        insert_holidays_one(object: $object) {
          id
        }
      }`
      dispatchGraphql(holidayMutation, this.getHolidayVariables()).then((response) => {
        console.log('holidays', response)
        this.HolidayMarking = false
      })
    },
    getUser() {
      dispatchGraphql(this.userQuery, { id: getId() }).then(response => {
        const attendanceType = response.users_by_pk.academic_year.campus.setting.attendance_type
        if (attendanceType === 'ONETIME') {
          this.attendanceValue = ['Morning']
          this.attendanceCount = 1
        } else if (attendanceType === 'TWOTIME') {
          this.attendanceValue = ['Morning', 'Evening']
          this.attendanceCount = 2
        } else if (attendanceType === 'CLASSWISE') {
          const timeTable = this.selectedStandard.time_table.filter(x => x.week_day === moment().format('dddd'))
          const sortedTimeTable = timeTable.sort((a, b) => moment(a.start_time).format('HH') - moment(b.start_time).format('HH'))
          for (const item of sortedTimeTable) {
            this.attendableValue.push(item)
            this.attendanceValue.push((item.subject ? item.subject.name : item.skill.name) + '  ' + moment(item.start_time).format('HH:mm') + '-' + moment(item.end_time).format('HH:mm'))
          }
          this.attendanceCount = this.attendanceValue.length
          console.log(this.attendanceValue, 'attendanceValue')
        }
        this.getAttendances(attendanceType)
      })
    },
    getAttendances(attendanceType) {
      dispatchGraphql(this.studentQuery, { section_id: this.sectionIds }).then(response => {
        this.students = response.users
        console.log('length', this.students.length)
        this.studentsIds = this.students.map(x => x.id)
        dispatchGraphql(this.attendanceQuery, { ids: this.studentsIds }).then(response => {
          console.log('attendance', response.attendances)
          this.setupAttendance(response.attendances, attendanceType)
        })
      })
    },
    setupAttendance(val, attendanceType) {
      this.studentAttendance = val.filter(x => (moment(x.taken_at).format('yyyy/MM/DD') === moment().format('yyyy/MM/DD')))
      if (val.length > 0 && this.studentAttendance.length > 0) {
        // this.studentAttendance = val
        console.log('items',this.studentAttendance)
      } else {
        for (const student of this.studentsIds) {
          for (var i = 0; i < this.attendanceCount; i++) {
            if (attendanceType === 'CLASSWISE') {
              this.newStudentAttendance.push({ 
                attendable_id: student,
                attenadable_type: 'Student',
                status: 'P',
                taken_at: moment().format(''),
                taken_by_id: getId(),
                attendance_type: this.attendanceValue[i],
                attendance_value: this.attendableValue[i].id
              })
            } else {
              this.newStudentAttendance.push({ 
                attendable_id: student,
                attenadable_type: 'Student',
                status: 'P',
                taken_at: moment().format(''),
                taken_by_id: getId(),
                attendance_type: this.attendanceValue[i]
              })
            }
          }
        }
        dispatchGraphql(this.attendanceInsertMutation, { objects: this.newStudentAttendance }).then(response => {
          console.log('res', response)
          this.getAttendances()
        })
      }
    },
    verifyAttendance(s, type) {
      return this.studentAttendance.filter(x => (x.attendable_id === s.id && x.attendance_type === type))[0]
    },
    updateStatus(val) {
      if (val.status === 'P') {
        val.status = 'A'
      } else {
        val.status = 'P'
      }
      dispatchGraphql(this.updateMutation, { id: val.id, status: val.status }).then(response => {
        console.log('attend', response)
      })
    }
  }
}
</script>
