<template>
  <div>
    <el-table
      v-loading="file_loading"
      :data="filteredDocData"
      style="width: 100%"
      :default-sort="{prop: 'name', order: 'descending'}"
    >
      <el-table-column prop="action" label="" width="90">
        <template v-if="canShowSign(scope.row)" slot-scope="scope">
          <a v-if="scope.row.role_type === 'Boath'" target="_blank" :href="signUrl(scope.row)" @click.stop>
            <button class="action-button pointer">Sign</button>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Contract Name" width="350">
        <template slot-scope="scope">
          <div class="flex flex-column">
            <span class="document-name">{{ scope.row.name }}</span>
            <div v-show="scope.$index == drawlerOpen" class="flex flex-column">
              <span
                v-for="item in scope.row.tasks"
                :key="item.index"
                class="pd-t-3 pd-b-3"
              >{{ item.name }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" width="350" label="Status">
        <template slot-scope="scope"><span
                                       class="document-status"
                                       :class="statusBadge(scope.row.status, scope.row)"
                                       @click="docDetailsDrawler(scope.$index, scope.row.status)"
                                     >
                                       {{ status(scope.row.status, scope.row) }}
                                       <i class="el-icon-arrow-down el-icon--right" />
                                     </span>
          <div v-show="scope.$index == drawlerOpen" class="flex flex-column">
            <span
              v-for="item in scope.row.tasks"
              :key="item.id"
              class="pd-t-3 pd-b-3"
            >
              <span :class="statusBadge(item.status, scope.row)">
                {{ item.status }}
              </span></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" :width="{'100' : isMobile}" label="Last Modified" />
      <el-table-column align="right" label="" width="60">
        <template slot-scope="scope">
          <span v-if="isMobile" class="el-dropdown-link" @click="actionSheetVisible2 = true"><i class="el-icon-more el-icon--right rounded-circle bg-color-f pd-10" /></span>

          <el-dropdown v-if="!isMobile" :hide-on-click="false" trigger="click">
            <span class="el-dropdown-link"><i class="el-icon-more el-icon--right rounded-circle bg-color-f pd-10" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-show="dropdownItemVisability('edit',scope.row)">
                <div class="tx-bold pointer" @click="editDoc(scope.row)">
                  <svg-icon icon-class="edit" /> Edit
                </div>
              </el-dropdown-item>

              <el-dropdown-item v-show="dropdownItemVisability('download',scope.row)">
                <div class="tx-bold pointer" @click="downloadDoc(scope.row)">
                  <svg-icon icon-class="download1" /> Download
                </div>
              </el-dropdown-item>

              <el-dropdown-item v-show="dropdownItemVisability('preview',scope.row)">
                <div class="pointer tx-bold" @click="previewDoc(scope.row)">
                  <svg-icon icon-class="preview" class="tx-16" /> &nbsp;Preview
                </div>
              </el-dropdown-item>
              <el-dropdown-item v-show="dropdownItemVisability('send_reminder_email',scope.row)">
                <div class="pointer tx-bold" @click="sendReminderEmail(scope.row)">
                  <svg-icon icon-class="message1" /> &nbsp;Send Reminder Email
                </div>
              </el-dropdown-item>

              <el-dropdown-item v-show="dropdownItemVisability('void',scope.row)">
                <div class="pointer tx-bold" @click="voidDoc(scope.row)">
                  <svg-icon icon-class="void" /> &nbsp;Void
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <archive-contract-dialog-box
      :dialog-box="archiveDialogBoxVisability"
      :document="selectedDocument"
      @updateArchiveDialogBoxVisability="updateArchiveDialogBoxVisability"
      @archiveHandleSuccessDialogBox="archiveHandleSuccessDialogBox"
    />
    <send-reminder-email-dialog-box
      :dialog-box="sendReminderEmailDialogBoxVisability"
      :document="selectedDocument"
      @updateSendReminderEmailDialogBoxVisability="updateSendReminderEmailDialogBoxVisability"
      @triggerReminderEmail="triggerReminderEmail"
    />
    <download-contract-dialog-box
      :dialog-box="downloadContractDialogBoxVisibility"
      :contract="selectedDocument"
      @updateDownloadContractDialogBoxVisibility="updateDownloadContractDialogBoxVisibility"
    />

    <void-contract-dialog-box
      :dialog-box="voidContractDialogBoxVisibility"
      :document="selectedDocument"
      @updateVoidContractDialogBoxVisibility="updateVoidContractDialogBoxVisibility"
      @voidSuccessDialogBox="voidSuccessDialogBox"
    />

    <void-success-dialog-box
      :dialog-box="voidSuccessDialogBoxVisibility"
      @updateVoidSuccessDialogBox="updateVoidSuccessDialogBox"
    />

  </div>
</template>

<script>
import PWA from '@/util/pwa'
import ArchiveContractDialogBox from './ArchiveContractDialogBox'
import SendReminderEmailDialogBox from './SendReminderEmailDialogBox'
import DownloadContractDialogBox from './DownloadContractDialogBox'
import VoidContractDialogBox from './VoidContractDialogBox'
import VoidSuccessDialogBox from './VoidSuccessDialogBox'
import { dispatchHttp } from '@/api/dispatcher'
// import { MailerService } from '@/services/mailer_service'
import { mapGetters } from 'vuex'
// import AddNewTemplate from '@/views/resource_library/templates/AddNewTemplate.vue'
export default {
  name: 'DocumentRow',
  directives: {},
  components: {
    ArchiveContractDialogBox,
    SendReminderEmailDialogBox,
    DownloadContractDialogBox,
    VoidContractDialogBox,
    VoidSuccessDialogBox
  },
  filters: {},
  mixins: [PWA],
  props: {
    documentData: {
      type: Array,
      default: function functionName() {}
    },
    document: {
      type: Object,
      default: function functionName() {}
    }
  },
  data() {
    return {
      drawlerOpen: -1, // Assigned Index of document
      file_loading: false,
      archiveDialogBoxVisability: false,
      sendReminderEmailDialogBoxVisability: false,
      downloadContractDialogBoxVisibility: false,
      voidContractDialogBoxVisibility: false,
      voidSuccessDialogBoxVisibility: false,
      selectedDocument: {},
      statuses: {
        awaiting_your_signature: [
          'download',
          'preview',
          'send_reminder_email',
          'void'
        ],
        completed: ['download', 'preview'],
        out_for_signature: [
          'download',
          'preview',
          'send_reminder_email',
          'void'
        ],
        void: ['archive', 'download', 'preview'],
        new: ['edit', 'preview'],
        published: ['download', 'preview', 'send_reminder_email', 'void']
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    /**
     * Remove with status New
     * TODO: check later where is the New status coming from
     */
    filteredDocData() {
      return this.documentData.filter(item => {
        return item.status !== 'New'
      })
    }
  },
  created() {},
  methods: {
    /**
     * Define index number of current document
     * @return void
     */
    docDetailsDrawler(e, status) {
      if (status === 'New') {
        return false
      }
      if (this.drawlerOpen === e) {
        return (this.drawlerOpen = -1) // set back, if selected
      } else {
        return (this.drawlerOpen = e) // set index
      }
    },

    /**
     * Add color badge to the status text
     * @return String
     */
    statusBadge(status, row) {
      const statuses = {
        completed: 'badge-success',
        awaiting_your_signature: 'badge-awaiting',
        out_for_signature: 'badge-out',
        signed: 'badge-signed',
        email_sent: 'badge-email-sent',
        viewed: 'badge-viewed',
        VoideArchivedd: 'badge-void',
        AwaitingYourSignature: 'badge-awaiting',
        EmailSent: 'badge-email-sent',
        OutForSignature: 'badge-out',
        Signed: 'badge-signed',
        Archived: 'badge-void',
        Completed: 'badge-success'
      }
      if (
        status === 'AwaitingYourSignature' &&
        row.role_type === 'ClientOnly'
      ) {
        return 'badge-success'
      } else {
        return statuses[status]
      }
    },

    status(status, row) {
      if (
        row.role_type === 'ClientOnly' &&
        status === 'AwaitingYourSignature'
      ) {
        // console.log('row', row)
        return 'Completed'
      } else {
        return status
      }
    },

    statusAttt(status) {
      const stat = {
        New: 'new',
        Published: 'published',
        Completed: 'completed',
        AwaitingYourSignature: 'awaiting_your_signature',
        OutForSignature: 'out_for_signature',
        Signed: 'signed',
        EmailSent: 'email_sent',
        viewed: 'viewed',
        Void: 'void'
      }
      return stat[status]
    },
    signUrl(obj) {
      const task = obj.tasks.find(t => t.is_coach_task === true)
      return `${process.env.VUE_APP_BASE_API}/tasks/${task.id}?auth_token=${
        task.auth_token
      }`
    },
    /**
     * CLick event to download document
     * @param Object
     */
    downloadDoc(obj) {
      this.downloadContractDialogBoxVisibility = true
      this.selectedDocument = obj
    },
    triggerReminderEmail() {
      this.loading_files = true
      const url = `/contracts/${this.selectedDocument.id}/send_remainder`
      dispatchHttp(url, {}, 'get').then(response => {
        this.sendReminderEmailDialogBoxVisability = false
        this.$notify({
          title: 'Sent',
          message: 'Reminder',
          type: 'success',
          duration: 2000
        })
        this.loading_files = false
      })
    },
    /**
     * CLieck event to preview document
     * @param Object
     */
    previewDoc(obj) {
      window.open(
        `${process.env.VUE_APP_BASE_API}/contracts/${obj.id}/preview`,
        '_blank'
      )
    },
    /**
     * Click event to remind client
     * @param Object
     */
    sendReminderEmail(obj) {
      this.sendReminderEmailDialogBoxVisability = true
      this.selectedDocument = obj
    },
    /**
     * Click event to void unsigned doc
     * @param Object
     */
    voidDoc(obj) {
      this.voidContractDialogBoxVisibility = true
      this.selectedDocument = obj
    },
    /**
     * Click event to archive doc
     * @param Object
     */
    archiveDoc(obj) {
      this.archiveDialogBoxVisability = true
      this.selectedDocument = obj
      // TODO Set object obj.archived = true
    },

    editDoc(obj) {
      this.$router.push(`/contracts/send_contract/index?id=${obj.id}`)
    },

    /**
     * Control Items for dropdown menu items for each doc
     * @param Object
     * @return Boolean true|false
     */
    dropdownItemVisability(item, obj) {
      const curStat = this.statuses[this.statusAttt(obj.status)]
      if (curStat) {
        return curStat.includes(item)
      }
    },
    updateArchiveDialogBoxVisability(value) {
      this.archiveDialogBoxVisability = value
    },
    updateSendReminderEmailDialogBoxVisability(value) {
      this.sendReminderEmailDialogBoxVisability = value
    },
    archiveHandleSuccessDialogBox(value) {
      this.archiveDialogBoxVisability = false
    },
    updateDownloadContractDialogBoxVisibility(value) {
      this.downloadContractDialogBoxVisibility = value
    },
    updateVoidContractDialogBoxVisibility(value) {
      this.voidContractDialogBoxVisibility = value
    },
    /**
     * params {String} value = this is reason of cancelation
     */
    voidSuccessDialogBox(value) {
      this.$emit('handleArchiveContract', this.selectedDocument.id, value)
      this.voidContractDialogBoxVisibility = false
      // TODO void record here then show success modal
      const coach = this.selectedDocument.tasks.filter(item => {
        return item.is_coach_task === true
      })[0]
      const client = this.selectedDocument.tasks.filter(item => {
        return item.is_coach_task === false
      })[0]

      // Notification to Client (Coachee)
      // MailerService.send(this.clientMailer(coach, client, value)).then(resp => {
      //   console.log('MAILER resp:', resp)
      // })
      // Notification to Coach
      // MailerService.send(this.coachMailer(coach, client, value)).then(resp => {
      //   console.log('MAILER resp:', resp)
      // })
      this.voidSuccessDialogBoxVisibility = true
    },
    updateVoidSuccessDialogBox(value) {
      this.voidSuccessDialogBoxVisibility = value
    },
    canShowSign(row) {
      return (
        row.status === 'Published' || row.status === 'AwaitingYourSignature'
      )
    },
    /**
     * Email to Client Z5
     * contract Voided
     */
    clientMailer(coach, client, reason) {
      return {
        template: 'z5-notif-to-client-contract-voided-by-coach',
        subject: `${this.selectedDocument.name} has been voided`,
        to: { name: client.name, email: client.email },
        from: { name: coach.name, email: coach.email },
        vars: [
          {
            name: 'IMAGELOGO',
            content: this.user.web_app_images.business_logo_email_file_url
          },
          { name: 'COACHFIRSTNAME', content: coach.user_fname },
          { name: 'COACHLASTNAME', content: coach.user_lname },
          { name: 'CLIENTFIRSTNAME', content: client.user_fname },
          { name: 'DOCUMENTNAME', content: this.selectedDocument.name },
          { name: 'VOIDREASON', content: reason }
        ]
      }
    },
    /**
     * Email to Coach Y5
     * contract Voided
     */
    coachMailer(coach, client, reason) {
      return {
        template: 'y5-notif-to-coach-contract-has-been-voided',
        subject: `${this.selectedDocument.name} has been voided`,
        to: { name: coach.name, email: coach.email },
        from: { name: 'CoachVantage', email: 'no-reply@coachvantage.com' },
        vars: [
          {
            name: 'IMAGELOGO',
            content: this.user.web_app_images.business_logo_email_file_url
          },
          { name: 'COACHFIRSTNAME', content: coach.user_fname },
          { name: 'COACHLASTNAME', content: coach.user_lname },
          { name: 'CLIENTFIRSTNAME', content: client.user_fname },
          { name: 'DOCUMENTNAME', content: this.selectedDocument.name },
          { name: 'VOIDREASON', content: reason },
          { name: 'CLIENTLASTNAME', content: client.user_lname },
          { name: 'CLIENTEMAIL', content: client.email },
          {
            name: 'COACHPORTALCONTRACTSARCHIVED',
            content: `${
              process.env.VUE_APP_BASE_API
            }#/contracts/index/?tab_name=archived`
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.action-button {
  border: none;
  border-radius: 20px;
  background-color: #4998df;
  color: white;
  padding: 5px 12px;
}
.document-name {
  color: #4998df;
}
.document-status {
  cursor: pointer;
}
</style>
