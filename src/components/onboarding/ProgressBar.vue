<template>
  <div>
    <div class="progress-areas">
      <div
        class="progress-bars"
        :style="{
          width: percentage + '%',
          background: color,
          border: '2px solid' + color,
        }"
      >
        <!-- <div class="progress-num">{{ percentage }} %</div> -->
      </div>
        <div class="d-flex d-flex justify-content-between" style="padding-top: 5px;">
            <div class="px-5">Progress</div>
            <div class="">{{ percentage }} %</div>
        </div>
    </div>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
export default {
  props: {
    label: {
      type: String,
      default: "Progress",
    },
    color: {
      type: String,
    },
    withBG: {
      type: Boolean,
      default: false,
    },
    campusid: {
      type: String,
    }
  },
  data(){
    return {
        percentage: 0
    }
  },
  created() { 
      console.log('Progress Bar Campus', this.campusid)
      this.getCampus()
  },
  methods: {
      getCampus() {
      const query = `
        query campuses_by_pk ($id: uuid!){
          campuses_by_pk(id: $id){
            id
            address
            name
            campus_code
            description
            academic_years {
              id
              name
              start_date
              end_date
              users(where: {email: {_neq: "admin@test"}}){
                id
                email
                role
              }
              departments {
                id
                name
                designations {
                  id
                  designation_type
                }
              }
            }
            standards {
              id
              name
              standard_sections {
                id
                name
              }
              standard_subjects {
                id
              }
            }
            subjects {
              id
              name
            }
            setting {
              id
              attendance_type
              non_working_days
              working_hours
              campus_breaks
              start_time
              end_time
            }
            exam_types {
              id
              name
              occurence
            }
            account {
              id
              account_settings {
                id
                standard_label
                section_label
                date_time_format
                currency_format
              }
            }
            fee_line_items {
              id
              fee_line_item_type
              default_amount
            }
            payslip_line_items {
              id
            }
          }
        }
      `
      dispatchGraphql(query, {id: this.campusid}).then(response => {
        this.campus = response.campuses_by_pk
        //console.log('Campus Data in progress bar', response.campuses_by_pk)
        this.getPercentage(response.campuses_by_pk)
      })
    },
    getPercentage(campus) {
      let count = 0
      if (campus.account.account_settings) {
        count = campus.account.account_settings.standard_label ? count + 5.5 : count
        count = campus.account.account_settings.section_label ? count + 5.5 : count
      } if (campus.standards.length > 0) {
        count = campus.standards[0].name ? count + 5.5 : count
        if (campus.standards[0].standard_sections) {
          count = campus.standards[0].standard_sections.length > 0 ? count + 5.5 : count
        } if (campus.standards[0].standard_subjects.length > 0) {
          count = campus.standards[0].standard_subjects.length > 0 ? count + 11 : count
        }
      } if (campus.subjects.length > 0) {
        count = campus.subjects[0].name ? count + 11 : count
      } if (campus.setting) {
        count = campus.setting.attendance_type ? count + 5.5 : count
      } if (campus.exam_types.length > 0) {
        count = campus.exam_types[0].name ? count + 3 : count
        count = campus.exam_types[0].occurence ? count + 2.5 : count
      }
      if (campus.setting) {
        count = campus.setting.non_working_days ? count + 3 : count
        count = campus.setting.working_hours ? count + 3 : count
        count = campus.setting.campus_breaks ? count + 3 : count
        count = campus.setting.start_time ? count + 1.5 : count
        count = campus.setting.end_time ? count + 1.5 : count
      }

      if (campus.academic_years[0].departments.length > 0) {
        let departments = campus.academic_years[0].departments
        count = departments[0].name ? count + 5.5 : count
        if(departments[0].designations.length > 0){
          count = departments[0].designations[0].designation_type ? count + 5.5 : count
        }
      }

      if (campus.account.account_settings) {
        count = campus.account.account_settings.date_time_format ? count + 3 : count
        count = campus.account.account_settings.currency_format ? count + 2.5 : count
      }

      if (campus.fee_line_items.length > 0) {
        count = campus.fee_line_items[0].fee_line_item_type ? count + 5.5 : count
      }

      if (campus.payslip_line_items.length > 0) {
        count =  count + 11
      }
       
      console.log('percent', count)
      this.percentage = count
    }
  }
};
</script>
<style scoped>
.progress-areas {
  width: 100%;
  border: 1px solid #bc6c42;
  border-radius: 100px;
  height: 10px;
  margin-top: 5px;
}
.progress-bars {
  background: #bc6c42;
  height: 10px;
  border-radius: 100px;
  position: relative;
}
.progress-num {
  color: #bc6c42;
  font-size: 10px;
  font-weight: 500;
  position: absolute;
  right: 0;
  background: white;
  border: 1px solid #fcdfbd;
  border-radius: 5px;
  padding: 2px 3px;
  top: -6px;
}
</style>
