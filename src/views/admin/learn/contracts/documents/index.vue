<template>
  <div class="title bg-white pd-15">
    <el-row class="flex flex-row space-between">
      <el-col :span="7">
        <el-input v-model="search_files" class="search-input-design1" placeholder="Search by Document Name" /><br>
      </el-col>
      <el-col :span="7" />
      <el-col :span="10">
        <!-- <remaining-quota /> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="pd-t-15 pd-b-15">
          <div class="flex flex-row flex-between">

            <!-- <router-link :to="{ name: 'SendContract', params: { id: '' }, query: { }}" class="pd-b-10-f"> -->
            <el-button class="lite-green-btn pd-b-10-f" round @click="sendContract()">Send Contract</el-button>
            <!-- </router-link> -->
            <!-- </uploadcare> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <div class="pd-b-25">
          <div class="flex flex-row">
            <el-dropdown class="mg-r-20">
              <span class="el-dropdown-link tx-bold">
                Date Range &nbsp;&nbsp;<i class="el-icon-arrow-right tx-bold tx-14" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-date-picker
                    v-model="contract_date_range"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :picker-options="dateRangePickerOptions"
                  />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="updateFilterStatus">
              <span class="el-dropdown-link">
                <strong>Status: {{ filterStatus }}</strong><i class="el-icon-arrow-right el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="all">All</el-dropdown-item>
                <el-dropdown-item command="completed">Completed</el-dropdown-item>
                <el-dropdown-item command="awaiting_your_signature">Awaiting Your Signature</el-dropdown-item>
                <el-dropdown-item command="out_for_signature">Out For Signature</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="contracts.length > 0">
      <el-col :span="24">
        <document-row
          :document-data="contractsC"
          :current-user-id="current_user_id"
          @getFiles="getFiles"
          @resourceForm="resourceForm"
          @getFolderFilesData="getFolderFilesData"
          @handleArchiveContract="handleArchiveContract"
        />
      </el-col>
    </el-row>
    <!-- <max-sends-dialog-box
      :dialog-box="maxSendsDialogBoxVisibility"
      @updateMaxSendsDialogBoxVisibility="updateMaxSendsDialogBoxVisibility"
    /> -->
  </div>
</template>

<script>
// import Uploadcare from '@/components/ResourceLibrary/Uploadcare'
import { dispatchHttp } from '@/api/dispatcher'
import DocumentRow from './DocumentRow'
// import RemainingQuota from '../RemainingQuota'
import { mapGetters } from 'vuex'
// import MaxSendsDialogBox from '../MaxSendsDialogBox.vue'
// import RemainingQuota from '../RemainingQuota.vue'

export default {
  name: 'ContractsDocument',
  components: {
    DocumentRow
    // RemainingQuota
  },
  data() {
    return {
      contracts: [],
      maximumSends: '',
      maximumTemplates: '',
      current_user_id: '',
      filterStatus: 'All',
      filterDateRange: '',
      contract_date_range: [],
      dateRangePickerOptions: {},
      loading_files: false,
      search_files: '',
      maxSendsDialogBoxVisibility: false
    }
  },
  computed: {
    ...mapGetters({ planDetails: 'subscription/planDetails' }),
    contractsC() {
      // TODO filter by dates and status at the same time, here is pseudo code
      // this.contracts.filter(d => {let time = moment(d.last_modified).format('DD-MM-Y');
      //                     return (moment().format('DD-MM-Y') < time && time < moment().format('DD-MM-Y'));
      if (this.filterStatus === 'All' && this.contract_date_range.length <= 0) {
        return this.contracts
      } else {
        return this.contracts.filter(x => x.status.name === this.filterStatus)
      }
    }
  },
  created() {
    this.getContracts()
  },
  methods: {
    updateFilterStatus(command) {
      // this.filterStatus = command
      const item = this.contracts.filter(x => x.status.attr === command)
      if (command === 'all') {
        this.filterStatus = 'All'
      } else {
        this.filterStatus = item[0].status.name
      }
    },
    getFiles() {},
    resourceForm() {},
    getFolderFilesData() {},
    getContracts: function() {
      this.loading_files = true
      dispatchHttp('/contracts', null, 'get')
        .then(response => {
          this.contracts = response.data
          console.log('aaaaaaaaaaaaaa', this.contracts)
          this.loading_files = false
        })
        .catch(() => {
          console.log('Error')
        })
    },
    onError(event) {
      console.log('Error: ', event)
    },
    handleArchiveContract(id, reason) {
      this.loading_files = true
      const url = `/contracts/${id}/archive`
      dispatchHttp(url, { reson_for_archive: reason }, 'post').then(
        response => {
          this.contracts = response.data
          this.loading_files = false
        }
      )
    },
    sendContract() {
      // TODO: do validation first, and check validation works after all sourse got loaded
      this.$router.replace({ name: 'SendContract' })
      // if (this.contracts.length >= this.planDetails.contract_sends) {
      //   this.maxSendsDialogBoxVisibility = true
      // } else {
      //   this.$router.replace({ name: 'SendContract' })
      // }
    },
    // SendContract
    updateMaxSendsDialogBoxVisibility(value) {
      this.maxSendsDialogBoxVisibility = value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
