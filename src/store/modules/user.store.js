import { getToken, setToken, removeToken, getId, setId, removeId, setHasuraToken, getHasuraToken, removeHasuraToken } from '@/util/auth'
import router, { resetRouter } from '@/router'
import { dispatchHttp, dispatchGraphql } from '@/api/dispatcher'

const state = {
  token: getToken(),
  hasura_token: getHasuraToken(),
  id: getId(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  routes: {}
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_HASURA_TOKEN: (state, token) => {
    state.hasura_token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  // user login
  login({ commit }, response) {
    return new Promise((resolve, reject) => {

        commit('SET_ID', response.data.object.id)
        commit('SET_TOKEN', response.headers['access-token'])
        commit('SET_HASURA_TOKEN', response.data.object.hasura_token)
        setHasuraToken(response.data.object.hasura_token)
        setToken(response.headers['access-token'])
        setId(response.data.object.id)


        resolve()

    })
  },
  // user login
  signup({ commit } , response ) {
    return new Promise((resolve, reject) => {

         console.log(response)
        commit('SET_ID', response.data.object.id)
        commit('SET_TOKEN', response.headers['access-token'])
        commit('SET_HASURA_TOKEN', response.data.object.hasura_token)
        setHasuraToken(response.data.object.hasura_token)
        setToken(response.headers['access-token'])
        setId(response.data.object.id)
        console.log(getId())
        console.log(getToken())
        console.log(getHasuraToken())
        resolve()

    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {


      const query =  `
      query($id: uuid!) {
        users_by_pk(id: $id) {
          first_name
          avatar
          role
          account_modules
          account {
            id
            name
            academic_periods {
              id
              name
            }
          }
        }
      }
      `
      var variables = {id: getId()}
      console.log(query)
      console.log(variables)



      return dispatchGraphql(query, variables).then(function (data) {
        // response is originally response.data of query result
        console.log(data)

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log("SETTING roles")
        const { role, account, avatar, account_modules } = data.users_by_pk
        const roles = [role]
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        console.log("SETTING VALUES")
        commit('SET_ROLES', roles)
        commit('SET_NAME', account.name)


        var temp_account_modules = {}
        //This is a temporary solution for routes to come from the server

        if(role == "admin") {
          temp_account_modules = {
            "Main Dashbaord": [],
            "Connect": ["Dashboard",
                        "Messenger",
                        {
                          "Appointment": ["Staff Appointment",
                                          "Parent appointment",
                                          "Student appointment",
                                          "Lorem appointment"]
                        },
                        "Remarks",
                        "Permission Slips"],
            "Digital Library": ["All Files",
                                "Shared with me",
                                "Recent",
                                "Bookmarked",
                                "Deleted Files",],
            "Finance": ["Dashboard",
                        "Fee Receipts",
                        "Expenses",
                        "Pay Slips",
                        "Invoice",
                        "Vendor",
                        "Task"],
            "Main Headquater": ["Dashboard",
                  "Student",
                  "Health Record",
                  "Standards",
                  "Leave Management",
                  "Employees",
                  "Enquires"
                  ],
            "Knowledge": ["Queries","Tags","Favourites",],
            "Learn": ["Dashbaord",
                      "Clasroom",
                      "Syllabus",
                      "Courses",
                      "Assignments",
                      "Certificate",
                      "Exam",
                      "Form",
                      "Lesson",
                      "Poll",
                      "Questions",
                      "Skill",
                      "Task",
                      "Timetable"],
            "School": ["Overview", "Exam",  "Attendance", "Event Calender", "Grade Analysis", "Report Card", "ESign"],
            "Library": ["Dashboard", "Book Catalog", "Issue/Return book", "Reserved Books", "Bookmarked Books", "Inventory", "Task" ]
          }
        }
        else if(role == "teacher") {
          temp_account_modules = {
            "Main Dashbaord": [],
            "Connect": ["Dashboard",
                        "Messenger",
                        {
                          "Appointment": ["Staff Appointment",
                                          "Parent appointment",
                                          "Student appointment",
                                          "Lorem appointment"]
                        },
                        "Remarks",
                        "Permission Slips"],
            "Digital Library": ["All Files",
                                "Shared with me",
                                "Recent",
                                "Bookmarked",
                                "Deleted Files",],
            "Finance": ["Dashboard",
                        "Expenses",
                        "Pay Slips",
                        "Task"],
            "Main Headquater": ["Dashboard",
                  "Student",
                  "Health Record",
                  "Standards",
                  "Leave Management",
                  ],
            "Knowledge": ["Queries","Tags","Favourites",],
            "Learn": ["Dashboard",
                      "Classroom",
                      "Syllabus",
                      "Courses",
                      "Assignments",
                      "Certificate",
                      "Exam",
                      "Form",
                      "Lesson",
                      "Poll",
                      "Questions",
                      "Skill",
                      "Task",
                      "Timetable"],
            "School": ["Overview", "Exam",  "Attendance", "Event Calender", "Grade Analysis", "Report Card"],
            "Library": ["Dashboard", "Book Catalog", "Issue/Return book", "Reserved Books", "Bookmarked Books", "Inventory", "Task" ]
          }
        }
        else if(role == "student") {
          temp_account_modules = {
            "Main Dashbaord": [],
            "Connect": ["Dashboard",
                        "Messenger",
                        {
                          "Appointment": ["Staff Appointment",
                                          "Parent appointment",
                                          "Student appointment",
                                          "Lorem appointment"]
                        },
                        "Remarks",
                        "Permission Slips"],
            "Digital Library": ["All Files",
                                "Shared with me",
                                "Recent",
                                "Bookmarked",
                                "Deleted Files",],
            "Finance": ["Dashboard",
                        "Fee Receipts",
                        "Task"],
            "Main Headquater": ["Dashboard",
                  "Student",
                  "Health Record",
                  "Standards"
                  ],
            "Knowledge": ["Queries","Tags","Favourites",],
            "Learn": ["Dashbaord",
                      "Classroom",
                      "Syllabus",
                      "Courses",
                      "Assignments",
                      "Certificate",
                      "Exam",
                      "Form",
                      "Lesson",
                      "Poll",
                      "Questions",
                      "Skill",
                      "Task",
                      "Timetable"],
            "School": ["Overview", "Exam",  "Attendance", "Event Calender", "Grade Analysis", "Report Card"],
            "Library": ["Dashboard", "Book Catalog", "Issue/Return book", "Reserved Books", "Bookmarked Books", "Inventory", "Task" ]
          }
        }
        else if(role == "parent") {
          temp_account_modules = {
            "Main Dashbaord": [],
            "Connect": ["Dashboard",
                        "Messenger",
                        {
                          "Appointment": ["Staff Appointment",
                                          "Parent appointment",
                                          "Student appointment",
                                          "Lorem appointment"]
                        },
                        "Remarks",
                        "Permission Slips"],
            "Finance": ["Dashboard",
                        "Fee Receipts",
                        "Task"],
            "Main Headquater": ["Dashboard",
                  "Student",
                  "Health Record",
                  "Standards"
                  ],
            "Learn": ["Dashbaord",
                      "Classroom",
                      "Syllabus",
                      "Courses",
                      "Assignments",
                      "Certificate",
                      "Exam",
                      "Form",
                      "Lesson",
                      "Poll",
                      "Questions",
                      "Skill",
                      "Task",
                      "Timetable"],
            "School": ["Overview", "Exam",  "Attendance", "Event Calender", "Grade Analysis", "Report Card"],
            "Library": ["Dashboard", "Book Catalog", "Issue/Return book", "Reserved Books", "Bookmarked Books", "Inventory", "Task" ]
          }
        }

        commit('SET_ROUTES', account_modules)
        // commit('SET_ROUTES', temp_account_modules)
        if(avatar != null) {
          commit('SET_AVATAR', avatar)
        }
        else {
          commit('SET_AVATAR', "/images/admin-m.png")
        }

        // commit('SET_INTRODUCTION', introduction)
        resolve(roles)
      }).catch(function (error) {
        // response is originally response.errors of query result
        console.log(error)
        reject(error)
      })




      // dispatchGraphqlQuery(query, data).then(response => {

      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatchHttp("/users/sign_out", {}, "delete")
      .then((response) => {
        console.log(response)
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ID', '')
        commit('SET_HASURA_TOKEN', '')
        removeId()
        removeToken()
        removeHasuraToken()
        // resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      })
      .catch((error) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ID', '')
        commit('SET_HASURA_TOKEN', '')
        removeId()
        removeToken()
        removeHasuraToken()
        // resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('Permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
