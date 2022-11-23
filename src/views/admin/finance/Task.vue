<template>
    <div class="about">
        <e-container class="finance-task" pageTitle="Task" btnIcon="el-icon-plus" btnText="Add Task" @btnClick="$router.push($url.FI_TASK_CREATE)">
            <el-tabs class="floatTabHeader" v-model="activeName">
                <el-tab-pane label="Created by me" name="created">
                    <div class="sub-headers"> {{ total }} Tasks Created by me</div>
                    <el-row class="finance-task-sub-head" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;">
                      <el-col :span="window.width > 767 ? 5 : 8" style="padding-left: 25px" class="primary-text dropdown-tab" >
                        <el-dropdown @command="handleStatus">
                            <span class="el-dropdown-link primary-text text" primary>
                                Status<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="Completed">Completed</el-dropdown-item>
                            <el-dropdown-item command="pending">pending</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                      <el-col :span="window.width > 767 ? 4 : 8" class="primary-text dropdown-tab">
                        <div class="text" @click="handleTasks()">Clear filter</div>
                      </el-col>
                      <el-col style="padding-left: 10px" :span="window.width > 767 ? 1 : 6" :offset="2">
                        <e-button icon="el-icon-search" :plain="true" css="bg-tranparent"></e-button>
                      </el-col>
                    </el-row>
                    <br />
                    <task-card :tasks="tasks" />
                </el-tab-pane>
                <el-tab-pane label="Assigned to me" name="assigned">
                    <div class="sub-headers"> {{ total }} Tasks assigned to me</div>
                    <el-row class="finance-task-sub-head" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;">
                      <el-col :span="window.width > 767 ? 5 : 8" style="padding-left: 25px" class="primary-text dropdown-tab" >
                        <el-dropdown @command="handleStatus">
                            <span class="el-dropdown-link primary-text text" primary>
                                Status<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="Completed">Completed</el-dropdown-item>
                            <el-dropdown-item command="pending">pending</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                      <el-col :span="window.width > 767 ? 4 : 8" class="primary-text dropdown-tab">
                        <div class="text" @click="handleTasks()">Clear filter</div>
                      </el-col>
                      <el-col style="padding-left: 10px" :span="window.width > 767 ? 1 : 6" :offset="2">
                        <e-button icon="el-icon-search" :plain="true" css="bg-tranparent"></e-button>
                      </el-col>
                    </el-row>
                    <br />
                    <task-card :tasks="tasks" />
                </el-tab-pane>
            </el-tabs>
        </e-container>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import { dispatchGraphql } from '@/api/dispatcher'
import taskCard from "@/components/finance/taskCard.vue";
import { getId } from '@/util/auth'
import _ from 'lodash'
import screenSize from '@/mixins/screenSize'
export default {
    components: { taskCard },
    mixins: [screenSize],
    data: () => ({
        activeName: "created",
        tasks: [],
        total: 0,
        statuses: ['completed', 'pending']
    }),
    mounted() {
        this.hideAsideMenuMobile()
    },
    watch: {
        activeName: _.debounce(function() {
            if (this.activeName === 'assigned') {
                this.getAudienceableTasks()
            } else {
                this.getTasks()
            }
        }),
    },
    created() {
        if (this.activeName === 'created') {
            this.getTasks()
        } else if (this.activeName === 'assigned') {
            this.getAudienceableTasks()
        }
    },
    methods: {
        handleTasks() {
            this.statuses = []
            this.statuses = ['pending', 'completed']
            if (this.activeName === 'created') {
                this.getTasks()
            } else if (this.activeName === 'assigned') {
                this.getAudienceableTasks()
            }
        },
        getVariables() {
            return {
                'userId': getId(),
                'status': this.statuses
            }
        },
        getAudienceableTasks() {
            this.tasks = []
            const query = `query($userId: uuid, $status: [String!]) {
                audiences(where: {_and: [{user_id: {_eq: $userId}}, {audienceable_type: {_eq: "Task"}}, {task: {status: {_in: $status}}}]}) {
                    id
                    status
                    task {
                        id
                        name
                        assigned_by_id
                        end_date
                        priority
                        status
                        user {
                            id
                            first_name
                        } 
                    }
                }
                audiences_aggregate(where: {_and: [{user_id: {_eq: $userId}}, {audienceable_type: {_eq: "Task"}}, {task: {status: {_in: $status}}}]}) {
                    aggregate {
                        count
                    }
                }
            }`
            dispatchGraphql(query, this.getVariables()).then((response) => {
                this.tasks = response.audiences.map(x => x.task)
                this.total = response.audiences_aggregate.aggregate.count
            })
        },
        getTasks() {
            this.tasks = []
            const query = `query($userId: uuid, $status: [String!]) {
                tasks(where: {_and: [{assigned_by_id:{_eq: $userId}}, {status: {_in: $status}}]}) {
                  id
                  name
                  assigned_by_id
                  end_date
                  priority
                  status
                  user {
                    id
                    first_name
                  }
                  audience {
                    id
                    status
                  }
                }
                tasks_aggregate(where: {_and: [{assigned_by_id:{_eq: $userId}}, {status: {_in: $status}}]}) {
                  aggregate {
                    count
                  }
                }
            }`
            dispatchGraphql(query, this.getVariables()).then((response) => {
                this.tasks = response.tasks
                this.total = response.tasks_aggregate.aggregate.count
            })
        },
        handleStatus(val) {
            this.statuses = []
            this.statuses[0] = val
            if (this.activeName === 'created') {
                this.getTasks()
            } else if (this.activeName === 'assigned') {
                this.getAudienceableTasks()
            }
        },
        ...mapMutations("Common",["hideAsideMenuMobile"]),
    }
}
</script>