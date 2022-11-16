<template>
  <div class="about">
    <e-container class="learn-skill" pageTitle="Skills" btnIcon="el-icon-plus" btnText="Create new Skill" @btnClick="$router.push($url.LN_SKILL_CREATE)" >
      <div class="figure-caption mg-y-20">
        {{ total }} skills found
      </div>
      <el-row :gutter="20">
        <el-col v-for="(skill, i) in skills" :key="i" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <div @click="$router.push($url.LN_SKILL_VIEW + '/' + skill.id)">
            <el-card :body-style="{ padding: '0px' }" class="pointer mg-y-15">
              <el-image :src="require('@/assets/images/logo.jpg')" />
              <div class="d-flex justify-content-between pd-20">
                <div>
                  <h2 class="mg-y-5 tx-bolder">{{ skill.name }}</h2>
                </div>
                <span class=""><i class="el-icon-check" /></span>
              </div>
              <div class="pt-0 pd-20">
                <div class="d-flex justify-content-between">
                  <span class="tx-18 tx-bolder">Category</span>
                  <span class="tx-16">{{ skill.category.name }}</span>
                </div>
                <div class="d-flex justify-content-between mg-t-10">
                  <span class="tx-18 tx-bolder">Standard</span>
                  <span class="tx-16">{{ skill.standard.name }}</span>
                </div>
                <div class="d-flex justify-content-between mg-t-15">
                  <span class="tx-18 tx-bolder">Mentor</span>
                  <span class="tx-16">{{ skill.mentor ? skill.mentor.first_name : '' }}</span> 
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <!-- <pagination :total="total" @pagination="pagination" /> -->
      <es-pagination :total="total" @pagination="pagination" ></es-pagination>
    </e-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { dispatchGraphql } from "@/api/dispatcher"
// import Pagination from '@/components/Pagination'
import esPagination from '@/studentControl/esPagination'

export default {
  components: { esPagination },
  data: () => ({
    skills: [],
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
  }),
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    this.getSkills()
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    getSkills() {
      const query = `query($limit: Int!, $offset: Int!) {
        skills(limit: $limit, offset: $offset) {
          id
          name
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
        }
        skills_aggregate {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => { 
        this.skills = response.skills
        this.total = response.skills_aggregate.aggregate.count
        console.log(this.skills, this.total)
      })
    },
    getVariables() {
      return{
        "limit": this.limit,
        "offset": this.offset
      }
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getSkills()
    }
  }
}
</script>
<style></style>
