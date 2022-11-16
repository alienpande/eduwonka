<template>
  <e-container-lite
    :campusid="$route.params.id"
    tag="North Campus"
    showFooter
    @back="$go('/on-boarding/working-hours/'+ $route.params.id)"
    @next="handleClick()"
  >
    <template #titleHead>
      <div class="h1">Employee Details</div>
      <div class="h5">
        Kindly create the designation and Department for your employees
      </div>
    </template>

    <!-- <e-form
      heading="Add Standard"
      subHeading="Kindly create the Levels, relevant for the institution to access the student’s progress"
    >
      <div class="department-description">
        <el-row>
          You have no Departments added yet <br />
          let’s add some departments for your institution <br />
          ( eg Teaching, Non Teaching, Class IV employees)
        </el-row>
        <el-row>
          <e-button
            class="add-departments-button"
            :span="4"
            label="+ Add Departments"
            type="primary"
          />
        </el-row>
      </div>

      <div class="p-20" v-for="obj in objs" :key="obj.id">
        <el-row>
          <e-input
            v-model="obj.val"
            label="Department Name"
            placeholder="Type here"
            :span="6"
          />
        </el-row>

        <designation-list />
      </div>
    </e-form> -->
    <!-- <DepartmentNoDataFound v-if="!departments" /> -->
    <AddDepartment :departments="departments"/>
    <br>
    <el-row>
      <e-button
        @click="addDepartments()"
        label="+ Add More Departments"
        plain
      ></e-button>
    </el-row>
  </e-container-lite>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher";
export default {
  components: {
    AddDepartment: () =>
      import(
        "@/components/onboarding/DesignationDepartment/AddDepartment.vue"
      ),
    // DepartmentNoDataFound: () =>
    //   import(
    //     "@/components/onboarding/DesignationDepartment/DepartmentNoDataFound.vue"
    //   ),
  },
  data() {
    return {
      mutation: `mutation insert_multiple_departments($objects: [departments_insert_input]! ) {
        insert_departments(objects: $objects) {
          returning {
            id
            name
          }
        }
      }`,
      designationMutation: `mutation insert_multiple_designations($objects: [designations_insert_input]! ) {
        insert_designations(objects: $objects) {
          returning {
            id
          }
        }
      }`,
      //  UpdateMutation: `mutation update_departments($id: uuid!, $changes: departments_set_input ) {
      //   update_departments_by_pk(pk_columns: { id: $id }, _set: $changes) {
      //     id
      //   }
      // }`,
      noDataFound: true,
      departments: [],
      designationDetails: [],
      designation: [{designation_type: 'dfasdf', department_id: ""}],
    };
  },
  created() {
    this.getDepartments()
    // this.getCampus()
  },
   methods: {
  //   getCampus: function() {
  //     dispatchGraphqlQueryByPk('campuses',['id', 'name','account_id'],{id: this.$route.params.id}).then((response) => {
  //       console.log("campus",response.campuses_by_pk)
  //       this.account_id = response.campuses_by_pk.account_id
  //     })
  //   },
    getDepartments: function() {
      const query = `query {
        departments{
          id
          name
          designations{
            id
            department_id
            designation_type
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.departments = response.departments
        this.designation = this.departments.map(x =>x.designations)
        console.log("TTTTTT", this.departments)
      })
    },
    getFilterVariables:function(depts) {
      var departments = depts.filter(x => x.id === "")
      departments.map(x => { delete x.designations, delete x.id })
      console.log('depts', departments)
      return{
        "objects": departments
      }      
    },
    // getVariables() {
    //   return {
    //     "id": "",
    //     "changes": this.departments
    //   }
    // },
    getFilterDesignationVariables: function(depts) {
      const designations = depts.map(a => a.designations)
      console.log('designations', designations)
      return { "objects": designations }
    },
    handleClick: function() {
      console.log('%%%%%%%%%%depart%%%%%%%', this.departments)
      dispatchGraphql(this.mutation, this.getFilterVariables(this.departments)).then((response) => {
        var items = response.insert_departments.returning
          //  this.$router.push("/on-boarding/basic-financial-details")
           this.$router.push(`/on-boarding/basic-financial-details/${this.$route.params.id}`)
           console.log("params",this.$route.params)
         if (response.insert_departments_one.id) {
          console.log('%%%%%%%%designation%%%%%%%%%', this.getFilterDesignationVariables(this.designation, response.insert_departments_one.id))
          dispatchGraphql(this.designationMutation, this.getFilterDesignationVariables(this.designation, response.insert_departments_one.id)).then((response) => {
            console.log(response)
          })
        }
        console.log(',,.kkkkkkkkkkkkkk.,,',response)
        var depts = this.departments.filter(x => x.id === "")
        

        var departments = depts.filter(function (x) {
          return items.some(function (y) {
            if (x.name === y.name) {
              x.designations.map(z => z.department_id = y.id)
              console.log('items', x.designations)
              dispatchGraphql(this.designationMutation, this.getFilterDesignationVariables(this.designation)).then((response) => {
              this.designationDetails = response.insert_designations.returning
                console.log(',,,,,,,,,,,,',response)
              })
            }
          })
        })
        console.log('depts', departments)

        // dispatchGraphql(this.designationMutation, this.getFilterDesignationVariables(depts)).then((response) => {
        //   console.log(response)
        //   this.$router.push("/on-boarding/basic-financial-details")
        // })
      })
      // dispatchGraphql(this.UpdateMutation, this.getVariables(this.healthResponse)).then((response) => {
      //   console.log(response)
      // })
    },
    addDepartments() {
      // let count = this.departments.length;
      this.departments.push({
        id: "",
        name: "",
        designations: [{designation_type: ''}]
      });
      // this.departments = [];
    },
  },
};
</script>

<style scoped>
.add-departments-button {
  margin: 0 auto;
  padding-top: 50px;
  text-align: center;
}
.p-20 {
  padding: 20px;
}
.department-description {
  text-align: center;
  align-items: center;
  padding: 50px;
  color: #000000cc;
  font-weight: 600;
}
</style>
