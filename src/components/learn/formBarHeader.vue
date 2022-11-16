<template>
  <div>
    <div class="assign-right">
      <div>
        <div style="width: 74%;padding-left:2rem !important;margin-top:15px" class="heading">
          {{ title }}
        </div>
        <!--  -->
        <div class="sb-section__2" style="height:1px">
          <div class="pd-x-30 pd-10 pd-b-5">
            <el-card shadow="none" style="background: rgba(248, 243, 238, 0.35)" class="rounded-08 text-center classroom-right__slide">
              <el-row style="opacity: 0.8">
                <el-col :span="12" style="border-right: 2px solid #fcdfbd; border-bottom: 2px solid #fcdfbd; padding: 10px;">
                  <span>Audience</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">{{ Audience }}</span>
                </el-col>
                <el-col :span="12" style="border-bottom: 2px solid #fcdfbd; padding: 10px">
                  <span>Submitted</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold" >{{ Submitted }}</span>
                </el-col>
                <el-col style="border-right: 2px solid #fcdfbd; padding: 10px" :span="12">
                  <span>Date created</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">{{ datecreated }}</span>
                </el-col>
                <el-col style="padding-top: 10px" :span="12">
                  <span>Due date</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">{{ duedate }}</span>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['title','Audience','Submitted','datecreated','duedate']
}
</script>