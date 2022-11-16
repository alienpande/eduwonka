<template>
  <div>
    <div style="padding-left: 30px">
      <div class="bg-white pd-15 tx-semibold">
        <component :is="questionType" @changeFormField="changeFormField" @handleSubmit="handleSubmit" />
      </div>
    </div>
  </div>
</template>
<script>
import dropDown from '@/components/learn/forms_components/dropDown'
  export default {
    components: { dropDown },
    props: {
      questionType: {
        type: String,
        default: ''
      }
    },
    data:()=>({
      ques:['Set option 1']
    }),
    methods:{
      changeFormField: function(data) {
        this.$emit('changeFormField', data)
      },
      handleSubmit: function(data) {
        this.$emit('submit', data)
      },
      handleClick() {
        this.$emit("save");
      },
    }
  }
</script>
<style>
.pointer-icon img {
  margin-top: 4px;
  margin-right: 10px;
}
.close-icon img {
  width: 13px;
  margin-left: 10px;
}
</style>
