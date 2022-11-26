<template>
    <div :style="window.width > 767 ? 'padding-left: 30px' : ''">
      <div :class="window.width > 767 ? 'bg-white pd-15 tx-semibold' : ''">
        <component :is="questionType" @changeFormField="changeFormField" @handleSubmit="handleSubmit" />
      </div>
    </div>
</template>
<script>
import chooseSingle from '@/components/learn/forms_components/chooseSingle'
import chooseMultiple from '@/components/learn/forms_components/chooseMultiple'
import shortAnswer from '@/components/learn/forms_components/shortAnswer'
import longAnswer from '@/components/learn/forms_components/longAnswer'
import dropDown from '@/components/learn/forms_components/dropDown'
import uploadAttachment from '@/components/learn/forms_components/uploadAttachment'
import screenSize from '@/mixins/screenSize'
  export default {
    components: {
      chooseSingle,
      chooseMultiple,
      shortAnswer,
      longAnswer,
      dropDown,
      uploadAttachment
    },
    mixins: [screenSize],
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
