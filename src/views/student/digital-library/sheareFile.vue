<template>
  <div>
    <es-container hideHeader pageTitle="Share File" :back="`/digital-library/all-files`" class="bg-black-5">
      <el-row>
        <el-col :span="4" :offset="19">
          <el-card class="pointer rounded-08 bg-black-3" :style="'border: none'" shadow="none">
            <el-col class="d-flex justify-content-left mg-b-20">
              <e-svg style="padding-right: 15px" icon="darkFile"></e-svg>
              <div>
                <div class="sub-title">{{ resource.title }}</div>
              </div>
            </el-col>
          </el-card>
        </el-col>
      </el-row><br /><br />
      <div style="padding: 10px 30px">
        <el-tabs class="floatTabHeader studentTab" v-model="activeName">
          <el-tab-pane label="Student" name="student">
            <el-row>
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="20">
                    <span class="tx-20 tx-bolder text-white">Choose Students</span>
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-card class="rounded-08 bg-black-3 shearefile-card" shadow="none" :style="'border: none'">
                      <div style="width: 100%">
                        <div class="add-more-lorem" :style="'border: none'">
                          <div class="lorem-boxs bg-black-1" :style="'border: none'" v-for="(user, i) in getAudience('student')" :key="i">
                            <div>{{ getUser(user.user_id) }}</div>
                            <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/darkCross.png" />
                          </div>
                          <input type="text" v-model="user" v-on:keyup.enter="audienceEvent" placeholder="Add more Students" />
                          <es-select :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess"  />
                        </div><br />
                        <div style="border: none">
                          <div v-for="(user, i) in setUsers('student')"  :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                            <el-checkbox class="class-checkbox" size="medium" @change="selectedUser(user)" />
                            <div class="tx-16 text-white" style="display: inline-block;margin-left: 10px;">
                              {{ user.first_name }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-row>
                </el-card>
              </el-card>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Teacher" name="teacher">
            <el-row>
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="20">
                    <span class="tx-20 tx-bolder text-white">Choose Teachers</span>
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-card class="rounded-08 bg-black-3 shearefile-card" shadow="none" :style="'border: none'">
                      <div style="width: 100%">
                        <div class="add-more-lorem" :style="'border: none'">
                          <div class="lorem-boxs bg-black-1" :style="'border: none'" v-for="(user, i) in getAudience('employee')" :key="i">
                            <div>{{ getUser(user.user_id) }}</div>
                            <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/darkCross.png" />
                          </div>
                          <input type="text" v-model="user" v-on:keyup.enter="audienceEvent" placeholder="Add more Teachers" />
                          <es-select :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess"  />
                        </div><br />
                        <div style="border: none">
                          <div v-for="(user, i) in setUsers('employee')"  :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                            <el-checkbox class="class-checkbox" size="medium" @change="selectedUser(user)" />
                            <div class="tx-16 text-white" style="display: inline-block;margin-left: 10px;">
                              {{ user.first_name }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-row>
                </el-card>
              </el-card>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Management" name="management">
            <el-row>
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="20">
                    <span class="tx-20 tx-bolder text-white">Choose Management Staff</span>
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-card class="rounded-08 bg-black-3 shearefile-card" shadow="none" :style="'border: none'">
                      <div style="width: 100%">
                        <div class="add-more-lorem" :style="'border: none'">
                          <div class="lorem-boxs bg-black-1" :style="'border: none'" v-for="(user, i) in getAudience('management')" :key="i">
                            <div>{{ getUser(user.user_id) }}</div>
                            <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/darkCross.png" />
                          </div>
                          <input type="text" v-model="user" v-on:keyup.enter="audienceEvent" placeholder="Add more Management Staff" />
                          <es-select :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess"  />
                        </div><br />
                        <div style="border: none">
                          <div v-for="(user, i) in setUsers('management')"  :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                            <el-checkbox class="class-checkbox" size="medium" @change="selectedUser(user)" />
                            <div class="tx-16 text-white" style="display: inline-block;margin-left: 10px;">
                              {{ user.first_name }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-row>
                </el-card>
              </el-card>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Non - teaching staff" name="staff">
            <el-row>
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="20">
                    <span class="tx-20 tx-bolder text-white">Choose Non - teaching staff</span>
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-card class="rounded-08 bg-black-3 shearefile-card" shadow="none" :style="'border: none'">
                      <div style="width: 100%">
                        <div class="add-more-lorem" :style="'border: none'">
                          <div class="lorem-boxs bg-black-1" :style="'border: none'" v-for="(user, i) in getAudience('staff')" :key="i">
                            <div>{{ getUser(user.user_id) }}</div>
                            <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/darkCross.png" />
                          </div>
                          <input type="text" v-model="user" v-on:keyup.enter="audienceEvent" placeholder="Add more Non - teaching staff" />
                          <es-select :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess"  />
                        </div><br />
                        <div style="border: none">
                          <div v-for="(user, i) in setUsers('staff')"  :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                            <el-checkbox class="class-checkbox" size="medium" @change="selectedUser(user)" />
                            <div class="tx-16 text-white" style="display: inline-block;margin-left: 10px;">
                              {{ user.first_name }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-row>
                </el-card>
              </el-card>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Group" name="group">
            <el-row>
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="20">
                    <span class="tx-20 tx-bolder text-white">Choose Group</span>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <es-button text="Create Group" @click="showSideBar = true" />
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-card class="rounded-08 bg-black-3 shearefile-card" shadow="none" :style="'border: none'">
                      <div style="width: 100%">
                        <div class="add-more-lorem" :style="'border: none'">
                          <div class="lorem-boxs bg-black-1" :style="'border: none'" v-for="(lorem, i) in getAudience('group')" :key="i">
                            <div>{{ getUser(user.user_id) }}</div>
                            <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/darkCross.png" />
                          </div>
                          <input type="text" v-model="user" v-on:keyup.enter="audienceEvent" placeholder="Add more Groups" />
                          <es-select :span="4" style="margin-left: 10px" v-model="accessValue" placeholder="Select" :options="accessTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setAccess" />
                        </div><br />
                        <div style="border: none">
                          <div v-for="(Select, i) in loremSelect" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                            <el-checkbox class="class-checkbox" size="medium" />
                            <div class="tx-16 text-white" style="display: inline-block;margin-left: 10px;">
                              {{ Select }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-row>
                </el-card>
              </el-card>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-row style="height: 80px;width: 1680px;left: 280px;top: 876px;border-radius: 0px;position: absolute;background: #1e1e1e;">
        <el-row class="mg-t-20">
          <el-col v-if="activeName != 'group'" :span="3" :offset="1">
            <es-button text="Share" :plain="true" @click="createAudience" />
          </el-col>
          <el-col v-else :span="3" :offset="1">
            &emsp;
          </el-col>
          <el-col :span="3" :offset="12">
            <es-button text="Cancel" width="200" />
          </el-col>
          <el-col style="float: right" :span="4">
            <es-button :text="activeName === 'group' ? 'Share' : 'Next'" width="200" :plain="true" @click="changeTab" />
          </el-col>
        </el-row>
      </el-row>
      <sheare-file-right :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)" />
    </es-container>
  </div>
</template>
<script>
import sheareFileRight from '@/components/student/digitalLibrary/sheareFileRight.vue'
import { dispatchGraphql } from "@/api/dispatcher"
export default {
  components:{sheareFileRight},
  data: () => ({
    activeName: "student",
    resource: {},
    users: [],
    showSideBar:false,
    audience: [],
    accessValue: '',
    addLorem: "",
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
    changeTab() {
      if (this.activeName == "student") {
        this.activeName = "teacher"
      } else if (this.activeName == "teacher") {
        this.activeName = "management"
      } else if (this.activeName == "management") {
        this.activeName = "staff"
      } else if (this.activeName == "staff") {
        this.activeName = "group"
      } else if (this.activeName == "group") {
        this.createAudience()
      }
    },
    createAudience() {
      this.audience.map(x => {
        x.access_type = this.accessValue
      })
      const mutation = `mutation($objects: [audiences_insert_input!]!) {
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
    addLoremEvent() {
      this.addedLorem.push(this.addLorem);
      this.addLorem = "";
    },
    deleteLorem(i) {
      this.addedLorem.splice(i, 1);
    },
  },
};
</script>
<style>
.add-more-lorem {
  display: flex;
  flex-wrap: wrap;
  background: #353535;
}
.add-more-lorem input {
  font-size: 16px;
  padding: 14px 17px;
  flex: 1;
  border: none;
  background: #404040;
}
.lorem-boxs {
  border-radius: 4px;
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
  color: white;
}
.lorem-boxs img {
  height: 20px;
  margin-bottom: -4px;
  padding-right: 5px;
  padding-top: 2px;
}

.lorem-check .el-checkbox__inner {
  border: 1px solid #FE9D2B;
}
.shearefile-card .el-card__body {
  display: flex;
}
.editor-select{
  margin-top: -5px;
}
.editor-select .el-input--suffix .el-input__inner {
  background: #353535 !important;
  border: 1px solid #000000 !important;
  height: 75px;

  color: #ccc;
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
