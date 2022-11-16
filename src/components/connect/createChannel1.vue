<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="3">
        <e-input
          v-model="room.name"
          label="Name of the channels"
          placeholder="Text Field"
          class="custom-input"
        ></e-input>
      </el-col>
      <el-col :offset="2" :span="5">
        <e-date-picker
          v-model="room.collapse_date"
          type="datetime"
          label="Do you wanna set collapse date"
          placeholder="14th June 2020"
        ></e-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" :offset="3">
          <div class="label">Choose moderators for your channel {{users.length}}</div>
          <!-- <e-selected  :customColor='true' placeholder='Choose' class="channel-1-select"></e-selected> -->
          <!-- <e-selected  :customColor='true' placeholder='Choose'></e-selected> -->
          <el-cascader
            v-model="room.moderators"
            placeholder="Choose"
            :options="users"
            filterable>
          </el-cascader>
        <div style="display: inline-flex; margin-top: 10px">
          <e-svg icon="Group" />
          <div
            class="channel-1-agr"
            style="
              margin-left: 11px;
              opacity: 0.4;
              font-size: 14px;
              padding-right: 70px;
            "
          >
            Moderators will have the admin right to the channel. You can choose
            upto 4 moderators
          </div>
        </div>
      </el-col>
    </el-row>
     <el-row
     class="channel-1-btns"
      style="
        border-top: 1px solid #fcdfbd;
        margin-top: 20px;
        padding-bottom: 15px;
      "
    >
      <el-col style="float: right" :span="11">
        <e-button
          :span="16"
          label="Cancel"
          width="180"
          css="cancel_btn"
          type="default"
          class="p-45"
        ></e-button>
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
import { dispatchGraphqlMutation } from '@/api/dispatcher'
export default {
  props: ['users', 'room'],
  created(){
    console.log('eEEEEEEEEEusers', this.users);
  },
  methods: {
    handleClick: function() {
      this.room.moderators = '{' + this.room.moderators.join(',') + '}'
      dispatchGraphqlMutation('rooms', ['id', 'name'], this.room).then((response) => {
        console.log('response of room', response.insert_rooms_one);
        this.$emit('handleSubmit', response.insert_rooms_one.id)
      })
    }
  }
}
</script>
