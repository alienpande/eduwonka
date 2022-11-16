<template>
  <div>
    <es-dialog :title="'Moderators selection'" v-model="dialog" width="45%" noEsc :gutter="20" hideDefaultFooter @cancel="dialog = false" @confirm="dialog = false">
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col :span="6" class="fs-18 tx-bolder text-white">
          {{users.length}} Moderators
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="4" :offset="10" class="text-white">
          <es-button :span="4" text="Deselect All" width="200" css="cancel_btn" />
        </el-col>
        <selection-card :users="users" :moderators="moderators" @input="handleCustomSelect" @deselect="deselectCustomSelect" @deselectAll="deselectAll"/>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-pagination @current-change="currentPage" @size-change="sizeChange" @prev-click="previousClick" @next-click="nextClick" background layout="prev, pager, next" style="text-align: center" :total="50" />
        </el-col>
        <el-col :span="4" class="dialog-footer">
          <es-button text="Done" :plain="true" @click="dialog = false" />
        </el-col>
      </el-row>
    </es-dialog>
    <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Channel Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-form :model="room">
          <el-col :span="11" class="mg-l-20">
            <h5 class="text-white">Channel Name</h5>
            <el-form-item prop="name">
              <es-input v-model="room.name" placeholder="Enter a Title" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <h5 class="text-white">Set collapse Date</h5>
            <el-form-item prop="date">
              <!-- <es-date-picker v-model="channel.date" placeholder="choose date" /> -->
              <e-date-picker
                v-model="room.collapse_date"
                type="datetime"
                placeholder="choose date"
              ></e-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
        <el-row>
          <el-row>
            <el-col v-for="moderator in moderators" :key="moderator" :span="4" class="rounded-08 bg-black-3" style="margin: 20px">
              <div class="d-flex" style="margin: 10px">
                <el-avatar shape="circle" :src="require('@/assets/images/profile.jpg')" />
                <span class="text-white mg-l-20 mg-t-10">{{moderator.first_name}}</span>
                <e-svg icon="crossDark" class="mg-l-50 mg-t-10" @click="deselectCustomSelect(moderator)"/>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="margin: 20px">
              <es-button text="Add Moderators" icon="addPluse" @click="dialog = true" />
            </el-col>
          </el-row>
        </el-row>
      </el-card>
    </el-card><br />
    <el-row style=" margin-top: 20px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      <el-col :span="5" :offset="14">
        <es-button text="Cancel" width="200" />
      </el-col>
      <el-col style="float: right" :span="5">
        <!-- <es-button text="Create Channel" width="200" @click="save()" :plain="true" /> -->
        <e-button
          :span="8"
          label="Create Channel"
          width="200"
          @click="handleClick"
          css="float-right"
          class="p-45"
        ></e-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {dispatchGraphql, dispatchGraphqlMutation} from '@/api/dispatcher'
import selectionCard from "@/components/student/selectionCard.vue"
export default {
  props: ['sectionId', 'room'],
  components: { selectionCard },
  data: () => ({
    channel: {},
    dialog: false,
    currentPage: '',
    sizeChange: '',
    users: [],
    moderators: []
  }),
  watch: {
    sectionId() {
      this.getStudents()
    }
  },
  methods: {
    deselectAll: function() {
      this.moderators = []
    },
    deselectCustomSelect(val) {
      const user = this.moderators.filter(x => x.user_id === val.id)[0]
      const index = this.moderators.indexOf(user)
      this.moderators.splice(index, 1)
      console.log('aud', this.moderators)
    },
    handleCustomSelect(val) {
      this.moderators.push({
        user_id: val.id,
        first_name: val.first_name
      })
    },
    getStudents() {
      this.loading=true
      const Query=`query ($section_id: uuid!){
        users(where: {section_id: {_eq: $section_id}}) {
          id
          first_name
          last_name
          role
        }
      }`
      dispatchGraphql(Query, {section_id: this.sectionId}).then((response) => {
        this.users = response.users
        console.log('aaaaaaaaa', this.users);
      })
    },
    previousClick: function() {

    },
    nextClick: function() {

    },
    handleClick: function() {
      for (const moderator of this.moderators){
        this.room.moderators.push(moderator.user_id)
      }
      this.room.moderators = '{' + this.room.moderators.join(',') + '}'
      this.room.room_type = 'Channel'
      dispatchGraphqlMutation('rooms', ['id', 'name'], this.room).then((response) => {
        this.$emit('handleSubmit', response.insert_rooms_one.id)
      })
    },
    save() {
      this.$emit('save')
    },
    select() {
      this.dialog = true
    }
  }
}
</script>
