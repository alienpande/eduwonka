<template>
  <div class="about">
    <e-container :pageTitle="skill.name" btnText="Grade skill" @btnClick="setDetails()">
      <el-row :gutter="20">
        <el-col :span="7" class="sm-width-100">
          <el-card shadow="none" class="rounded-08">
            <el-row>
              <el-col :span="12" style="border-right: 1px solid #e6eaed">
                <e-svg icon="Salsa"></e-svg>
                <div style="font-size: 24px; margin-top: 12px">Skill Score</div>
                <br />
                <h1>{{ getAvg(skill.skill_results) }}</h1>
              </el-col>
              <el-col :span="10" :offset="2">
                <div style="font-weight: 600; opacity: 0.8">Students</div>
                <div style="font-weight: 500; font-size: 20px; opacity: 0.8">
                  {{ skill.skill_results.length }}
                </div>
                <br />
                <div style="font-weight: 600; opacity: 0.8">Sessions taken</div>
                <div style="font-weight: 500; font-size: 20px; opacity: 0.8">
                  {{ getSessions(skill) }}
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="10" :offset="2" class="sm-width-100 sm-margin-l-0">
          <h3>Breakdown stats</h3>
          <el-row>
            <el-col :span="10">
              <!-- <apexchart width="180" type="donut" :options="options" :series="series" /> -->

              <GChart type="PieChart" :data="pieChartData" :options="pieChartOptions" class="z-index--1" />
            </el-col>
            <el-col :span="10">
              <br />
              <br />
              <div style="display: flex; justify-content: space-around">
                <div style="display: flex">
                  <span style="width: 8px;height: 8px;background: #678afe;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">Excellent</span>
                </div>
              </div>
              <br />
              <div style="display: flex;justify-content: space-around;margin-top: 5px;">
                <div style="display: flex">
                  <span style="width: 8px;height: 8px;background: #d077f9;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">Average</span>
                </div>
                <div style="display: flex">
                  <span style="width: 8px;height: 8px;background: #f45887;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">Poor</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8" class="sm-width-100">
          <div class="pr-x-40 mg-y-20 text-left" style="font-weight: bold; font-size: 20px">
            Best performers
          </div>
          <el-card shadow="none" class="rounded-08">
            <div class="mg-y-20" v-for="(performer, i) in getPerformers('best')" :key="i">
              <e-img-name :src="require('@/assets/images/profile.jpg')" nameStyle="font-weight:normal" :name="performer.student.first_name" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" :offset="3" class="sm-width-100 sm-margin-l-0">
          <div class="pr-x-40 mg-y-20 text-left" style="font-weight: bold; font-size: 20px">
            Weak performers
          </div>
          <el-card shadow="none" class="rounded-08">
            <div class="mg-y-20" v-for="(performer, i) in getPerformers('weak')" :key="i">
              <e-img-name :src="require('@/assets/images/profile.jpg')" nameStyle="font-weight:normal" :name="performer.student.first_name" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <div style="color: #000000; opacity: 0.8; font-size: 20px; font-weight: 600">
        Week’s positive performers
      </div>
      <br />
      <el-row :gutter="20">
        <el-col :span="20" :style="{display: window.width > 767 ? 'block' : 'grid'}">
          <el-col class="mg-t-10" :span="5" :offset="1" v-for="(performer, i) in getPerformers('best')" :key="i">
            <el-card style="width: 250px; margin-right: 30px" class="rounded-08 student-perform">
              <br />
              <img style="display: block;margin: auto;width: 95px;border-radius: 50%;" src="@/assets/images/profile.jpg" alt="" />
              <div class="mt10" style="opacity: 0.8;font-size: 18px;padding-left: 10px;text-align: center;">
                {{ performer.student.first_name }}
              </div>
              <div class="d-flex mt10">
                <e-svg style="margin-left: 65px; margin-right: 5px" icon="Greendoublearrowicon" />
                <div style="color: #52ce56">{{ getPercentage(performer.score) }}%</div>
              </div>
              <br />
              <div class="custom-shape-divider-bottom-1635013978">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill" />
                </svg>
              </div>
              <div style="height: 30px;width: 100%;background: #fcdfbd;position: relative;">
                <div class="perform-circle" style="top: -13px; left: 35px"></div>
                <div style="top: -4px; left: 25px" class="week-perform">week 2</div>
    
                <div class="perform-circle" style="top: -120px; left: 217px"></div>
                <div style="top: -109px; left: 205px" class="week-perform">week 3</div>
              </div>
            </el-card>
          </el-col>
        </el-col>
      </el-row>

      <br />
      <div style="color: #000000; opacity: 0.8; font-size: 20px; font-weight: 600">
        Week’s negative performers
      </div>
      <br />
      <el-row :gutter="20">
        <el-col :span="20" :style="{display: window.width > 767 ? 'block' : 'grid'}">
          <el-col class="mg-t-10" :span="5" :offset="1" v-for="(performer, i) in getPerformers('weak')" :key="i">
            <el-card style="width: 250px; margin-right: 30px" class="rounded-08 student-perform">
              <br />
              <img style="display: block;margin: auto;width: 95px;border-radius: 50%;" src="@/assets/images/profile.jpg" alt="" />
              <div class="mt10" style="opacity: 0.8;font-size: 18px;padding-left: 10px;text-align: center;">
                {{ performer.student.first_name }}
              </div>
              <div class="d-flex mt10">
                <e-svg style="margin-left: 65px; margin-right: 5px" icon="Reddoublearrow" />
                <div style="color: red">{{ getPercentage(performer.score) }}%</div>
              </div>
              <br />
              <div class="custom-shape-divider-bottom-1635013979">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill" />
                </svg>
              </div>
              <div style="height: 30px;width: 100%;background: #fcdfbd;position: relative;">
                <div class="perform-circle" style="top: -120px; left: 35px"></div>
                <div style="top: -110px; left: 25px" class="week-perform">week 2</div>

                <div class="perform-circle" style="top: -13px; left: 217px"></div>
                <div style="top: -6px; left: 205px" class="week-perform">week 3</div>
              </div>
            </el-card>
          </el-col>
        </el-col>
      </el-row>

      <br />
      <br />
      <div class="d-flex justfy-bet">
        <div style="margin-top: 0" class="heading">Enrolled students</div>
        <e-button icon="el-icon-search" :plain="true" :span="2" css="bg-tranparent sort-icon" />
      </div>
      <br />
      <e-table :table="skill.skill_results" @pageInfo="ptest">
        <el-table-column label="Student name" prop="student">
          <template slot-scope="scope">
            {{ scope.row.student.first_name }}
          </template>
        </el-table-column>
        <el-table-column label="Performance" prop="Performance">
          <template slot-scope="scope">
            <div :class="getClassStatus(getPerformance(scope.row.score))">
              {{ getPerformance(scope.row.score) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Score" prop="score" />
      </e-table>
    </e-container>
    <skill-details v-if="details.name" :details="details" :show="isRight" @update="getSkill" :__onClose="()=>(isRight = !isRight)" />
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import skillDetails from "@/components/learn/skill/skillDetails.vue"
import moment from 'moment'
import screenSize from '@/mixins/screenSize'

export default {
  components: { skillDetails },
  mixins: [screenSize],
  data: () => ({
    isRight:false,
    daylist: [],
    skill: {},
    details: {},
    pieChartData: [],
    series: [44, 55, 41, 50],
    pieChartOptions: {
      // is3D:true,
      pieHole: 0.6,
      pieSliceText: "none",
      chartArea: {
        top: "0%",
        height: "70%",
        width: "80%",
        backgroundColor: "red",
      },
      legend: "none",

      slices: [
        { color: "#f45887" },
        { color: "#d077f9" },
        { color: "#678afe" },
        { color: "#F9AE58", offset: 0.01, elevated: true, size: 90 },
      ],
    },
  }),
  created() {
    this.getSkill()
  },
  methods: {
    getSessions(skill) {
      var result = []
      for (const timetable of skill.time_tables) {
        for (const day of this.daylist) {
          if (moment(day).format('dddd') === timetable.week_day) {
            result.push(day)
          }
        }
      }
      return result.length
    },
    setChart() {
      let bestCount = 0
      let weakCount = 0
      let averageCount = 0
      for (const result of this.skill.skill_results) {
        if (result.score > 7) {
          bestCount = bestCount + result.score
        } else if (result.score <= 7 && result.score > 4) {
          averageCount = averageCount + result.score
        } else if (result.score <= 4 && result.score > 0) {
          weakCount = weakCount + result.score
        }
      }
      this.pieChartData = [
        ["1", "Count", { role: "style" }],
        ["Poor", weakCount, "red"],
        ["Average", averageCount, "#f00"],
        ["Excellent", bestCount, "#f000"]
      ]
    },
    getPercentage(score) {
      return ((score / 10) * 100)
    },
    getClassStatus(val) {
      if (val === 'Excellent') {
        return 'excelant-table'
      } else if (val === 'Average') {
        return 'average-table'
      } else if (val === 'Poor') {
        return 'weak-table'
      }
    },
    getPerformance(score) {
      if (score > 7) {
        return 'Excellent'
      } else if (score <= 7 && score > 4) {
        return 'Average'
      } else if (score <= 4 && score > 0) {
        return 'Poor'
      }
      return ''
    },
    getPerformers(type) {
      var bestPerformers = this.skill.skill_results.filter(x => x.score > 5)
      var weakPerformers = this.skill.skill_results.filter(x => x.score <= 5)
      if (type === 'best') {
        return bestPerformers
      } else if (type === 'weak') {
        return weakPerformers
      }
    },
    getAvg(results) {
      var count = 0
      for (const result of results) {
        count = count + result.score
      }
      return results.length > 0 ? (count/results.length).toFixed(1) : count
    },
    setDetails() {
      this.details = this.skill
      this.isRight = true
    },
    getSkill() {
      this.isRight = false
      const acyearQuery = `query {
        academic_years {
          id
          name
          start_date
        }
      }`
      const query = `query($id: uuid!) {
        skills_by_pk(id: $id) {
          id
          name
          created_at
          standard {
            id
            name
          }
          mentor {
            id
            first_name
          }
          category {
            id
            name
          }
          skill_results {
            id
            score
            status
            student {
              id
              first_name
            }
          }
          time_tables {
            id
            week_day
          }
        }
      }`
      dispatchGraphql(acyearQuery).then((response) => {
        var currentDate = moment(response.academic_years[0].start_date)
        var stopDate = moment()
        while (currentDate < stopDate) {
          this.daylist.push(moment(currentDate).format(''))
          currentDate = moment(currentDate).add(1, 'days')
        }
        dispatchGraphql(query, { id: this.$route.params.id }).then((response) => { 
          this.skill = response.skills_by_pk
          this.setChart()
        })
      })
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
<style>
.top-states {
display:flex;
justify-content: space-between;
}
.top-states::before,.top-states::after{
  display:none !important;
}
.top-states > div{
  margin: 0px !important;
  width: 420px;
}
.mid-states {
display:flex;
justify-content: space-between;
}
.mid-states::before,.mid-states::after{
  display:none !important;
}
.mid-states > div{
  margin: 0px !important;
  width: 420px;
}
.excelant-table {
  border: 1px solid #77f977;
  color: rgb(0, 255, 55);
  width: 80px;
  text-align: center;
  border-radius: 13px;
}
.average-table {
  border: 1px solid #d077f9;
  color: rgb(162, 0, 255);
  width: 80px;
  text-align: center;
  border-radius: 13px;
}
.weak-table {
  border: 1px solid #f9778e;
  color: red;
  width: 80px;
  text-align: center;
  border-radius: 13px;
}
.custom-shape-divider-bottom-1635013978 {
  /* position: absolute;
    bottom: 0;
    left: 0; */
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom-1635013978 svg {
  position: relative;
  display: block;
  width: calc(190% + 1.3px);
  height: 120px;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1635013978 .shape-fill {
  fill: #fcdfbd;
}

.custom-shape-divider-bottom-1635013979 {
  /* position: absolute;
    bottom: 0;
    left: 0; */
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1635013979 svg {
  position: relative;
  display: block;
  width: calc(190% + 1.3px);
  height: 120px;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1635013979 .shape-fill {
  fill: #fcdfbd;
}

/** For mobile devices **/
/* @media (max-width: 767px) {
    .custom-shape-divider-bottom-1635013978 svg {
        width: calc(181% + 1.3px);
        height: 163px;
    }
} */
.student-perform .el-card__body {
  padding: 0 !important;
}
.perform-circle {
  width: 2px;
  height: 2px;
  background: #c67e55;
  border: 3px solid #c67e55;
  display: block;
  border-radius: 100%;
  position: absolute;
}
.week-perform {
  font-size: 10px;
  color: #c67e55;
  position: absolute;
}
</style>
