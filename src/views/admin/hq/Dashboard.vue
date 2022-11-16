<template>
  <e-container class="hq-dashboard" pageTitle="Dashboard" subTitle="Welcome back!">
    <p class="heading">Quick Stats</p>
    <e-dashcard :span="6" :obj="dashCardData">
      <template #header></template>
    </e-dashcard>
    <el-row :gutter="40" style="margin-left:0px !important;margin-right:0px !important;" class="dashboard-cards-wrapper">
      <!-- <p class="heading" style="padding-left: 1.5rem !important">Leaves Approval</p> -->
        <e-card :span="15" class="sm-width-100" title="Leaves Approval"  subTitle="Recent leaves for which your approval is/was required" :bottom="{ title: 'View leave approval List', link: $url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL, }">
          <e-table :table="getLeaves()" hidePagination shadow>
            <el-table-column label="Date" >
              <template slot-scope="scope">
                {{ getDate(scope.row.from_date) }}
              </template>
            </el-table-column>
            <el-table-column label="Name" >
              <template slot-scope="scope">
                {{ scope.row.user ? scope.row.user.first_name : '' }}
              </template>
            </el-table-column>
            <el-table-column label="Address">
              <template slot-scope="scope">
                {{ scope.row.user ? scope.row.user.address : '' }}
              </template>
            </el-table-column>
          </e-table>
        </e-card>
        <div>
          <e-card :span="9" title="" subTitle="Total Leaves">
            <e-donut-chart :male="setLeaves('male')" :female="setLeaves('female')" />
          </e-card>
        </div>
      <e-card :span="24" style="width:100% !important" containerHeight="auto" title="Recent Enquires"  subTitle="List of recent Enquiries and their status" :bottom="{ title: 'View Enquires List', link: $url.HQ_ENQUIRES, }">
        <el-row class="block" :gutter="20">
          <el-col :span="12" v-for="(enquiry, i) in getEnquiries()" :key="i" class="enquiry-card">
            <enquiry-card :id="enquiry.id" :title="enquiry.purpose" :name="enquiry.student_name" :standard="enquiry.standard ? enquiry.standard.name : ''" :status="enquiry.status" :enquiryDate="enquiry.enquiry_date" :enquiry_type="enquiry.enquiry_type" />
          </el-col>
        </el-row>
      </e-card>
      <div>
        
        <e-card :span="12" title="Students Details and Enquiries" subTitle="Student count statistics">
          <e-donut-chart :male="setStudents('male')" :female="setStudents('female')" />
        </e-card>
      </div>
      <div>
        <e-card :span="12" title="" subTitle="Enquires" :bottom="{ title: 'View Task List', link: $url.FI_TASK, }">
          <enquiry-donut-chart :prospect="setEnquiries('prospect')" :student="setEnquiries('student')" />
        </e-card>
      </div>
      <div>
        <e-card :span="12" title="Employee Detail" subTitle="Employee gender count">
          <e-donut-chart :male="setEmployees('male')" :female="setEmployees('female')" />
        </e-card>
      </div>
      <div>
        <e-card :span="12" title="" subTitle="Employee Distribution">
          <e-bar-chart :teaching="setEmployees('teaching')" :nonTeaching="setEmployees('nonTeaching')" />
        </e-card>
      </div>
    </el-row>
  </e-container>
</template>
<script>
import EDonutChart from "@/controls/graph/eDonutChart.vue"
import EnquiryDonutChart from "@/components/hq/Enquiry/eDonutChart.vue"
import EnquiryCard from "@/components/hq/EnquiryCard"
import eBarChart from "@/controls/graph/eBarChart"
import { dispatchGraphql } from "@/api/dispatcher"
import { mapMutations } from "vuex"
import moment from 'moment'
export default {
  components: { EnquiryCard, eBarChart, EDonutChart, EnquiryDonutChart },
  data() {
    return {
      users: [],
      enquiries: [],
      leaves: [],
      dashCardData: [],
      enquiries: [],
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    setEmployees(type) {
      let teachingCount = 0
      let nonTeachingCount = 0
      let maleCount = 0
      let femaleCount = 0
      for (const user of this.users) {
        if (user.role === "employee" || user.role === "teacher" || user.role === "Vendor" || user.role === "admin") {
          if (user.section_subject_teachers.length > 0) {
            teachingCount ++
          } else {
            nonTeachingCount ++
          } if (user.gender === 'Male' || user.gender === 'MALE' || user.gender === 'male') {
            maleCount ++
          } else if (user.gender === 'Female' || user.gender === 'FEMALE' || user.gender === 'female') {
            femaleCount ++
          }
        }
      }
      if (type === 'male') {
        return maleCount
      } else if (type === 'female') {
        return femaleCount
      } else if (type === 'teaching') {
        return teachingCount
      } else if (type === 'nonTeaching') {
        return nonTeachingCount
      }
    },
    setEnquiries(type) {
      let prospectCount = 0
      let studentCount = 0
      for (const enquiry of this.enquiries) {
        if (enquiry.enquiry_type === 'prospect') {
          prospectCount ++
        } else if (enquiry.enquiry_type === 'Student') {
          studentCount ++
        }
      }
      if (type === 'prospect') {
        return prospectCount
      } else if (type === 'student') {
        return studentCount
      }
    },
    setStudents(gender) {
      let maleCount = 0
      let femaleCount = 0
      for (const user of this.users) {
        if (user.role === "student") {
          if (user.gender === 'Male' || user.gender === 'MALE' || user.gender === 'male') {
            maleCount ++
          } else if (user.gender === 'Female' || user.gender === 'FEMALE' || user.gender === 'female') {
            femaleCount ++
          }
        }
      }
      if (gender === 'male') {
        return maleCount
      } else if (gender === 'female') {
        return femaleCount
      }
    },
    getEnquiries() {
      var enquiries = []
      for (const enquiry of this.enquiries) {
        if (enquiries.length < 5) {
          enquiries.push(enquiry)
        }
      }
      return enquiries
    },
    setLeaves(gender) {
      let maleCount = 0
      let femaleCount = 0
      for (const leave of this.leaves) {
        if (leave.user) {
          if (leave.user.gender === 'Male' || leave.user.gender === 'MALE' || leave.user.gender === 'male') {
            maleCount ++
          } else if (leave.user.gender === 'Female' || leave.user.gender === 'FEMALE' || leave.user.gender === 'female') {
            femaleCount ++
          }
        }
      }
      if (gender === 'male') {
        return maleCount
      } else if (gender === 'female') {
        return femaleCount
      }
    },
    getDate(date) {
      return moment(date).format("DD -MM-YYYY")
    },
    getLeaves() {
      var leaves = []
      for (const leave of this.leaves) {
        if (leaves.length < 4) {
          leaves.push(leave)
        }
      }
      return leaves
    },
    setDashCardData() {
      let students = 0
      let boys = 0
      let girls = 0
      let employees = 0
      for (const user of this.users) {
        if (user.role === 'student') {
          students ++
          if (user.gender === 'Male' || user.gender === 'MALE' || user.gender === 'male') {
            boys ++
          } else if (user.gender === 'Female' || user.gender === 'FEMALE' || user.gender === 'female') {
            girls ++
          }
        } else if (user.role === 'employee' || user.role === 'teacher' || user.role === "Vendor" || user.role === "admin") {
          employees ++
        }
      }
      this.dashCardData = [
        {
          title: "Total Students",
          value: students,
          icon: "hq/student",
          last:"<span class='green-text'>2.3% <i class='el-icon-top'></i></span> than last year"
        },
        {
          title: "Total Boys",
          value: boys,
          icon: "hq/boy",
          last:"<span class='green-text'>2.3% <i class='el-icon-top'></i></span> than last year",
        },
        {
          title: "Total Girls",
          value: girls,
          icon: "hq/girl",
          last:"<span class='green-text'>2.3% <i class='el-icon-top'></i></span> than last year",
        },
        {
          title: "Total Employees",
          value: employees,
          icon: "hq/girl",
          last:"<span class='red-text'>1.6% <i class='el-icon-bottom'></i></span> than last year",
        },
      ]
    },
    getUsers() {
      const enquires = `query {
        enquiries(order_by: {enquiry_date: desc}) {
          id
          status
          student_name
          enquiry_date
          purpose
          enquiry_type
          standard {
            id
            name
          }
        }
      }`
      const leaves = `query {
        leaves(order_by: {from_date: desc}) {
          id
          from_date
          user {
            id
            first_name
            address
            gender
          }
        }
      }`
      const users = `query {
        users {
          id
          first_name
          last_name
          role
          gender
          section_subject_teachers {
            id
          }
        }
      }`
      dispatchGraphql(enquires).then((response) => {
        this.enquiries = response.enquiries
        dispatchGraphql(leaves).then((response) => {
          this.leaves = response.leaves
          dispatchGraphql(users).then((response) => {
            this.users = response.users
            this.setDashCardData()
          })
        })
      })
    },
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
};
</script>

<style>
.dashboard-cards-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.dashboard-cards-wrapper::after,
.dashboard-cards-wrapper::before{
  display: none !important;
}

.dashboard-cards-wrapper > div{
  width: 48% !important;
}

@media only screen and (max-width:767px){
  .dashboard-cards-wrapper > div{
    width:100% !important;
  }
}




</style>
