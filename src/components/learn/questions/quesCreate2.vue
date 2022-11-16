<template>
  <div>
    <div style="padding-left: 30px" class="remove-padding">
      <!-- <div style="font-size: 20px; font-weight: 500; opacity: 0.8">
        Build Question
      </div> -->
      <div class="bg-white pd-15 tx-semibold">
        <component :is="questionType" @changeFormField="changeFormField" @handleSubmit="handleSubmit" />
      </div>
      <!-- <div style="display: flex">
        <div style="font-size: 20px; font-weight: 500; opacity: 0.8">Q2</div>
        <div style="color: rgb(82, 87, 93); width: 36rem; padding-left: 5rem">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua ?
        </div>
      </div>
      <div style="display: flex;margin-top:10px">
        <div style="font-size: 20px; font-weight: 500; opacity: 0.8">A</div>
        <div style=" margin-left: 91px; display: flex; flex-wrap: wrap; width: 20rem; justify-content: space-between;">
          <div style="display: flex; margin-bottom: 5px" v-for="(ques,i) in ques" :key="i">
            <e-svg class="pointer-icon" icon="Pointer"></e-svg>
            <div style="opacity: 0.6">{{ques}}</div>
            <e-svg @click="removeOption" class="close-icon" icon="close"></e-svg>
          </div>
          <div style="display: flex; margin-bottom: 5px;cursor:pointer" @click="addOption">
            <e-svg icon="Add-icon"></e-svg>
            <div style="margin: 0 23px 0 10px;color: #BC6C42;">Add option</div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="9">
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Proceed" width="180" @click="handleClick" css="float-right" class="p-45" />
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import chooseSingle from '@/components/learn/forms_components/chooseSingle'
import chooseMultiple from '@/components/learn/forms_components/chooseMultiple'
import shortAnswer from '@/components/learn/forms_components/shortAnswer'
import longAnswer from '@/components/learn/forms_components/longAnswer'
import dropDown from '@/components/learn/forms_components/dropDown'
import uploadAttachment from '@/components/learn/forms_components/uploadAttachment'
  export default {
    components: {
      chooseSingle,
      chooseMultiple,
      shortAnswer,
      longAnswer,
      dropDown,
      uploadAttachment
    },
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
      // addOption(){
      //   if(this.ques.length==3) {
      //       return;
      //   }
      //   this.ques.push('Set option 1')
      // },
      // removeOption(){
      //   this.ques.pop();
      // },
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
