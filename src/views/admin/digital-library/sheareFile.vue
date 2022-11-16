<template>
  <div style="padding: 20px; overflow: auto; height: 72vh">
    <el-row>
      <el-col :span="6" style="display: flex">
        <e-svg icon="back" @click="$router.push($url.DL_ALL_FILES)" />
        <div style="color: #000000cc;font-size: 24px;font-weight: 500;margin-top: 8px;margin-left: 10px;">
          Share File
        </div>
      </el-col>
      <el-col :span="4" :offset="12">
        <div style="display: flex;box-shadow: rgb(0 0 0 / 5%) 0px 3px 15px;border-radius: 4px;width: 164px;background: white;padding: 14px 32px;">
          <e-svg icon="file-icon" />
          <div style="font-weight: 600; color: #00000099; margin-left: 15px">
            {{ resource.title }}
          </div>
        </div>
      </el-col>
    </el-row>
    <br /><br /><br /><br /><br />
    <div style="padding: 0 30px">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Student" name="student">
          <el-row>
            <el-col style="color: #000000cc; font-size: 20px; font-weight: 500" :span="5">
              Choose Students
            </el-col>
          </el-row><br />
          <el-card class="shearefile-card" shadow="none">
            <div style="width: 80%">
              <div class="add-more-lorem">
                <div class="lorem-boxs" v-for="(user, i) in getAudience('student')" :key="i">
                  <div>{{ getUser(user.user_id) }}</div>
                  <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
                </div>
              </div>
              <div style="border: 1px solid #cccccccc">
                <div v-for="(user, i) in setUsers('student')" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                  <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                  <div style="color: #00000099;display: inline-block;margin-left: 10px">
                    {{ user.first_name }}
                  </div>
                </div>
              </div>
            </div>
            <e-select class="editor-select" :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess" />
          </el-card>
          <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
            <el-col class="float-left" :span="12">
              <e-button :span="8" label="Share" width="180" css="float-right" class="p-45" @click="createAudience" />
            </el-col>
            <el-col class="float-right" :span="10">
              <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="activeName = 'teacher'" />
              <e-button :span="8" label="Next" width="180" css="float-right" class="p-45" @click="activeName = 'teacher'" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Teacher" name="teacher">
          <el-row>
            <el-col style="color: #000000cc; font-size: 20px; font-weight: 500" :span="5">
              Choose Teachers
            </el-col>
          </el-row><br />
          <el-card class="shearefile-card" shadow="none">
            <div style="width: 80%">
              <div class="add-more-lorem">
                <div class="lorem-boxs" v-for="(user, i) in getAudience('employee')" :key="i">
                  <div>{{ getUser(user.user_id) }}</div>
                  <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
                </div>
              </div>
              <div style="border: 1px solid #cccccccc">
                <div v-for="(user, i) in setUsers('employee')" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                  <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                  <div style="color: #00000099;display: inline-block;margin-left: 10px">
                    {{ user.first_name }}
                  </div>
                </div>
              </div>
            </div>
            <e-select class="editor-select" :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess" />
          </el-card>
          <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
            <el-col class="float-left" :span="12">
              <e-button :span="8" label="Share" width="180" css="float-right" class="p-45" @click="createAudience" />
            </el-col>
            <el-col class="float-right" :span="10">
              <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="activeName = 'management'" />
              <e-button :span="8" label="Next" width="180" css="float-right" class="p-45" @click="activeName = 'management'" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Management" name="management">
          <el-row>
            <el-col style="color: #000000cc; font-size: 20px; font-weight: 500" :span="5">
              Choose Management Staff
            </el-col>
          </el-row><br />
          <el-card class="shearefile-card" shadow="none">
            <div style="width: 80%">
              <div class="add-more-lorem">
                <div class="lorem-boxs" v-for="(user, i) in getAudience('management')" :key="i">
                  <div>{{ getUser(user.user_id) }}</div>
                  <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
                </div>
              </div>
              <div style="border: 1px solid #cccccccc">
                <div v-for="(user, i) in setUsers('management')" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                  <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                  <div style="color: #00000099;display: inline-block;margin-left: 10px">
                    {{ user.first_name }}
                  </div>
                </div>
              </div>
            </div>
            <e-select class="editor-select" :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess" />
          </el-card>
          <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
            <el-col class="float-left" :span="12">
              <e-button :span="8" label="Share" width="180" css="float-right" class="p-45" @click="createAudience" />
            </el-col>
            <el-col class="float-right" :span="10">
              <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="activeName = 'nonTeaching'" />
              <e-button :span="8" label="Next" width="180" css="float-right" class="p-45" @click="activeName = 'nonTeaching'" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Non - teaching staff" name="staff">
          <el-row>
            <el-col style="color: #000000cc; font-size: 20px; font-weight: 500" :span="5">
              Choose Non - teaching staff
            </el-col>
          </el-row><br />
          <el-card class="shearefile-card" shadow="none">
            <div style="width: 80%">
              <div class="add-more-lorem">
                <div class="lorem-boxs" v-for="(user, i) in getAudience('staff')" :key="i">
                  <div>{{ getUser(user.user_id) }}</div>
                  <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
                </div>
              </div>
              <div style="border: 1px solid #cccccccc">
                <div v-for="(user, i) in setUsers('staff')" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                  <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                  <div style="color: #00000099;display: inline-block;margin-left: 10px">
                    {{ user.first_name }}
                  </div>
                </div>
              </div>
            </div>
            <e-select class="editor-select" :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess" />
          </el-card>
          <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
            <el-col class="float-left" :span="12">
            <e-button :span="8" label="Share" width="180" css="float-right" class="p-45" @click="createAudience" />
            </el-col>
            <el-col class="float-right" :span="10">
              <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="activeName = 'group'" />
              <e-button :span="8" label="Next" width="180" css="float-right" class="p-45" @click="activeName = 'group'" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Group" name="group">
          <el-row>
            <el-col style="color: #000000cc; font-size: 20px; font-weight: 500" :span="5">
              Choose Group
            </el-col>
            <el-col :span="4" :offset="14">
              <e-button label="Create Group" icon="el-icon-plus" :plain="true" css="sort-icon" @click="showSideBar=true" />
            </el-col>
          </el-row>
          <br />
          <el-card class="shearefile-card" shadow="none">
            <div style="width: 80%">
              <div class="add-more-lorem">
                <div class="lorem-boxs" v-for="(lorem, i) in getAudience('group')" :key="i">
                  <div>{{ getUser(user.user_id) }}</div>
                  <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
                </div>
                <input type="text" v-model="user" v-on:keyup.enter="audienceEvent" placeholder="Add more Groups" />
              </div>

              <div style="border: 1px solid #cccccccc">
                <div v-for="(Select, i) in loremSelect" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                  <el-checkbox class="class-checkbox"></el-checkbox>
                  <div style="color: #00000099;display: inline-block;margin-left: 10px">
                    {{ Select }}
                  </div>
                </div>
              </div>
            </div>
            <e-select class="editor-select" :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess" />
          </el-card>
          <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
            <el-col style="float: right" :span="10">
              <e-button :span="15" label="Cancel" width="180" css="cancel-custom" type="default" class="p-45" />
              <e-button :span="8" label="Share" width="180" css="float-right" class="p-45" />
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <sheare-file-right :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)" />
  </div>
</template>
<script>
import sheareFileRight from '@/components/digitalLibrary/sheareFileRight.vue'
import { dispatchGraphql } from "@/api/dispatcher"
export default {
  components:{sheareFileRight},
  data: () => ({
    activeName: "student",
    resource: {},
    users: [],
    showSideBar: false,
    audience: [],
    accessValue: '',
    accessTypes: [
      {
        label: "Viewer",
        value: "Viewer",
      },
      {
        label: "Commentor",
        value: "Commentor",
      },
      {
        label: "Editor",
        value: "Editor",
      },
    ],
    loremSelect: [
      "Class X",
      "Staff",
      "Non teaching",
      "Senior Teacher",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
    ],
  }),
  created() {
    this.getResources()
    this.getUsers()
  },
  methods: {
    createAudience() {
      this.audience.map(x => {
        x.access_type = this.accessValue
      })
      const mutation = `mutation($objects: [audience_insert_input!]!) {
        insert_audiences(objects: $objects) {
          affected_rows
          returning {
            id
          }
        }
      }`
      dispatchGraphql(mutation, { objects: this.audience }).then((response) => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Shared',
          message: 'File Shared Successfully',
        })
        this.$router.push(this.$url.DL_ALL_FILES)
      })
    },
    setAccess(val) {
      this.accessValue = val
    },
    getUser(id) {
      return this.users.find(x => x.id == id).first_name
    },
    selectedUser(user) {
      this.audience.push({
        user_id: user.id,
        user_type: user.role,
        status: "shared",
        audienceable_type: "DigitalLibrary",
        audienceable_id: this.$route.params.id
      })
    },
    getAudience(role) {
      return this.audience.filter(x => x.user_type == role)
    },
    setUsers(role) {
      return this.users.filter(x => x.role === role)
    },
    getUsers() {
      const query = `query {
        users {
          id
          first_name
          role
        }
      }`
      dispatchGraphql(query).then((res) => {
        this.users = res.users
      })
    },
    getResources() {
      const query = `query($id: uuid!) {
        eduwonka_resources_by_pk(id: $id) {
          id
          title
          resource_type
          attachment_id
          is_deleted
          deleted_at
          viewed_at
          created_at
          updated_at
        }
      }`
      dispatchGraphql(query, { id: this.$route.params.id }).then((response) => {
        this.resource = response.eduwonka_resources_by_pk
      })
    },
    deleteAudience(user) {
      const index = this.audience.indexOf(user)
      this.audience.splice(index, 1)
      console.log(this.audience, "audience")
    },
  },
};
</script>
<style>
.add-more-lorem {
  border: 1px solid #cccccccc;
  display: flex;
  flex-wrap: wrap;
}
.add-more-lorem input {
  font-size: 16px;
  padding: 14px 17px;
  flex: 1;
  border: none;
  background: transparent;
}
.lorem-boxs {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #bc6c42;
  border-radius: 4px;
  color: #bc6c42;

  font-size: 16px;
  font-weight: 600;
  padding: 3px 0;
  margin: 13px 8px;
  text-align: center;
  display: flex;
}
.lorem-boxs div {
  display: inline-block;
  padding: 0 10px;
}
.lorem-boxs img {
  height: 20px;
  margin-bottom: -4px;
  padding-right: 5px;
  padding-top: 2px;
}

.lorem-check .el-checkbox__inner {
  background: #fcdfbd66;
}
.shearefile-card .el-card__body {
  display: flex;
}
.editor-select{
  margin-top: -10px;
}
.editor-select .el-input--suffix .el-input__inner {
  background: #bc6c4280 !important;
  border: 1px solid #cccccc !important;
  height: 75px;

  color: #00000099;
  font-size: 20px;
  font-weight: 500;
}
.shearefile-card .el-col-4 {
  width: 176px !important;
}
.class-checkbox .el-checkbox__input{
  z-index: 0;
}
</style>
