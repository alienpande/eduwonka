<template>
  <e-container-lite
    tag="North Campus"
    :campusid="$route.params.id"
    showFooter
    @back="$go('/on-boarding/level-creation-step-1/'+ $route.params.id)"
    @next="redirectTo()"
  >
    <template #titleHead>
      <div class="h1">Level Creation</div>
      <div class="h5">
        Kindly create the levels (eg standard/class/grades) and their divisions
        relevant for your institution
      </div>
    </template>

    <e-form
      heading="Add Standard"
      subHeading="Kindly create the Levels, relevant for the institution to access the student's progress"
      bgColor="transparent"
    >
      <standard-list v-loading="loading" @addSections="dialogSection = true" :standard-data="standards_data"/>
      <standard-input
        v-model="sections.name"
        @object="s = $event"
        @addSections="dialogSection = true"
      />
    </e-form>

    <e-dialog
      title="Add/Edit Section for 1"
      v-model="dialogSection"
      width="70%"
      top="40vh"
      noEsc
      noPersist
      @cancel="dialogSection = false"

      @confirm="handleClick()"
      btnConfirmText="Submit"
    >
      <p class="label ml20">Section Names (eg A,B,C)</p>
      <sections-input v-model="sections" @object="standards = $event" />
    </e-dialog>
  </e-container-lite>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher";

export default {
  components: {
    StandardInput: () => import("./Standard.Input.vue"),
    StandardList: () => import("./Standard.List.vue"),
    SectionsInput: () => import("@/components/hq/Standards/Sections.Input.vue"),
  },
  data() {
    return {
      loading: false,
      mutation: `mutation insert_multiple_standards($objects: [standards_insert_input!]!) {
        insert_standards(objects: $objects) {
          returning {
            id
            name
            standard_sections {
              name
              id
            }
          }
        }
      }`,
      standards_data: [],
      dialogSection: false,
      sections: [{ val: "" }],
    };
  },
  created(){
    this.getStandards()
  },
  methods: {
      getStandards: function() {
        this.loading = true
      const query = `query MyQuery ($campus_id: uuid!) {
        standards(order_by: {name: asc}, where: {campus_id: {_eq: $campus_id}}){
          id
          name
          standard_sections{
            id
            name
          }
        }
      }`
      dispatchGraphql(query, {campus_id: this.$route.params.id}).then((response) => {
        this.standards_data = response.standards
        this.loading = false
        console.log("fetching", this.standards_data)
      })
    },

    getVariables: function(sections) {
      const standard = {}
      standard.name = sections.name[0].val
      standard.standard_sections = {
        data: sections.map(item => ({name: item.val}))
      }
      delete sections.name
      console.log(standard)
      return {"objects": standard}
    },
    handleClick: function() {
      this.dialogSection = false
      dispatchGraphql(this.mutation, this.getVariables(this.sections)).then((response) => {
      console.log(response)
      })
    },
    redirectTo: function() {
      this.$router.push(`/on-boarding/StandardSequening/${this.$route.params.id}`)
    }
  },
};


</script>
