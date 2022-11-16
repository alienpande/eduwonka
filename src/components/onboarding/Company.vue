<template>
    <div>{{ campusName }}</div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
export default {
    props: {
        campusid: {
            type: String,
        }
    },
    data(){
        return {
            campusName: ''
        }
    },
    created() { 
        this.getCampus()
    },
    methods: {
      getCampus() {
        const query = `
            query campuses_by_pk ($id: uuid!){
                campuses_by_pk(id: $id){
                    id
                    name
                }
            }
            `
            dispatchGraphql(query, {id: this.campusid}).then(response => {
                let campus = response.campuses_by_pk
                this.campusName = campus.name
            })
        },
    }
};
</script>
