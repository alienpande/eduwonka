<template>
  <div>
    <es-container pageTitle="Permission Slips" class="bg-black-5">
      <el-tabs class="floatTabHeader studentTab" v-model="activeName">
        <el-tab-pane label="Pending" name="Pending"> 
          <el-row :gutter="20" class="mg-l-5">
            <el-col :span="6" class="mg-t-5 tx-20 text-white">
              {{ audience.length }} Permission Slips
            </el-col>
          </el-row><br />
          <div :style="`display:flex;flex-wrap:wrap`">
            <el-col :span="7" :offset="1" v-for="(user, i) in audience" :key="i" class="mg-t-20">
              <el-card shadow="none" style="padding: 8px; border: none" class="rounded-08 pg-50 bg-black-2">
                <div class="tx-bolder tx-18 text-white">
                  {{ user.permission_slip.name }}
                </div>
                <div shadow="none" style="border: none; padding: 13px" class="mg-t-20 rounded-08 bg-black-3">
                  <el-row>
                    <el-col :span="11" :offset="1">
                      <div class="text-gray-6">Due Date</div>
                      <div class="text-white tx-bolder">
                        {{ getDate(user.permission_slip.due_date) }}
                      </div>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <div class="text-gray-6">Permission Status</div>
                      <div class="text-yellow tx-bolder">
                        {{ getStatus(user.permission_slip.status) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <es-button icon="downloadYellow" text="Download" class="mg-t-20" />
                </div>
              </el-card>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Approved" name="Approved">
          <el-row :gutter="20" class="mg-l-5">
            <el-col :span="6" class="mg-t-5 tx-20 text-white">
              {{ audience.length }} Permission Slips
            </el-col>
          </el-row><br />
          <div :style="`display:flex;flex-wrap:wrap`">
            <el-col :span="7" :offset="1" v-for="(user, i) in audience" :key="i" class="mg-t-20">
              <el-card shadow="none" style="padding: 8px; border: none" class="rounded-08 pg-50 bg-black-2">
                <div class="tx-bolder tx-18 text-white">
                  {{ user.permission_slip.name }}
                </div>
                <div shadow="none" style="border: none; padding: 13px" class="mg-t-20 rounded-08 bg-black-3">
                  <el-row>
                    <el-col :span="11" :offset="1">
                      <div class="text-gray-6">Due Date</div>
                      <div class="text-white tx-bolder">
                        {{ getDate(user.permission_slip.due_date) }}
                      </div>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <div class="text-gray-6">Permission Status</div>
                      <div class="text-green tx-bolder">
                        {{ getStatus(user.permission_slip.status) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <es-button icon="downloadYellow" text="Download" class="mg-t-20" />
                </div>
              </el-card>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Rejected" name="Rejected">
          <el-row :gutter="20" class="mg-l-5">
            <el-col :span="6" class="mg-t-5 tx-20 text-white">
              {{ audience.length }} Permission Slips
            </el-col>
          </el-row><br />
          <div :style="`display:flex;flex-wrap:wrap`">
            <el-col :span="7" :offset="1" v-for="(user, i) in audience" :key="i" class="mg-t-20">
              <el-card shadow="none" style="padding: 8px; border: none" class="rounded-08 pg-50 bg-black-2">
                <div class="tx-bolder tx-18 text-white">
                  {{ user.permission_slip.name }}
                </div>
                <div shadow="none" style="border: none; padding: 13px" class="mg-t-20 rounded-08 bg-black-3">
                  <el-row>
                    <el-col :span="11" :offset="1">
                      <div class="text-gray-6">Due Date</div>
                      <div class="text-white tx-bolder">
                        {{ getDate(user.permission_slip.due_date) }}
                      </div>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <div class="text-gray-6">Permission Status</div>
                      <div class="text-red tx-bolder">
                        {{ getStatus(user.permission_slip.status) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <es-button icon="downloadYellow" text="Download" class="mg-t-20" />
                </div>
              </el-card>
            </el-col>
          </div>
        </el-tab-pane>
      </el-tabs>
    </es-container>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
import moment from 'moment'
import _ from 'lodash'
export default {
  data: () => ({
    activeName: "Pending",
    audience: [],
    status: 'pending',
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName == "Approved") {
        this.status = 'approved'
      } else if (this.activeName == "Rejected") {
        this.status = 'rejected'
      } else if (this.activeName == "Pending") {
        this.status = 'pending'
      }
      this.getPermissionSlips()
    })
  },
  created() {
    this.getPermissionSlips()
  },
  methods: {
    getStatus(status) {
      if (status == 'pending') {
        return 'Pending'
      } else if (status == 'approved') {
        return 'Approved'
      } else if (status == 'rejected') {
        return 'Rejected'
      }
    },
    getDate(date) {
      return moment(date).format('DD MMM, YYYY')
    },
    getVariables() {
      return {
        "id": getId(),
        "change": this.status,
      }
    },
    getPermissionSlips() {
      const query = `query($id: uuid, $change: String) {
        audiences(where: {_and:[{user_id: {_eq: $id}}, {audienceable_type: {_eq: "permissionSlip"}}, {permission_slip: {status: {_eq: $change}}}]}) {
          id
          permission_slip {
            id
            name
            due_date
            status
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.audience = response.audiences
      })
    }
  }
}
</script>
