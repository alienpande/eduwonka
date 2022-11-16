<template>
    <div>
        <div  style="padding-left: 31px">
        <el-row style="">
          <el-col
            :span="2"
            style="
              font-size: 20px;
              padding: 0 15px 25px 15px;
              font-weight: 0.8;
              font-weight: 500;
            "
            >Q{{ numques }}</el-col
          >
          <el-col :span="17">
            <div
              style="
                border: 1px solid #fcdfbd;
                padding: 15px 215px 25px 15px;

                
                border-bottom: 0;
                opacity: 0.6;
                font-size: 14px;
              "
            >
           {{ques}}
            </div>
          </el-col>
          <!-- <el-col
            :span="4"
            style="
              border: 1px solid #fcdfbd;
              border-bottom: 0;
              border-left: 0;
              padding: 13px 0px;
            "
          >
            <div
              style="
                background: rgba(188, 108, 66, 0.1);
                color: rgb(77, 79, 92);
                border-radius: 10px;
                padding: 19px 5px;
                font-weight: 500;
                width: 131px;
                font-size: 12px;
                text-align: center;
                cursor: pointer;
                margin-left: 43px;
              "
            >
              Scored : 3 marks
            </div>
          </el-col> -->
        </el-row>

        <el-row>
          <el-col
            :span="2"
            style="
              font-size: 20px;
              padding: 0 15px 15px;
              font-weight: 0.8;
              font-weight: 500;
            "
            >A</el-col
          >
          <el-col :span="17">
            <div
              style="
                border: 1px solid #fcdfbd;
                padding: 6px 215px 15px 15px;

                border-top: 0;
                opacity: 0.6;
                font-size: 14px;
              "
            >
           {{ans}}.
            </div>
          </el-col>
          <!-- <el-col :span="3"  style="
              background: rgb(188 108 66 / 10%);
              color: #4D4F5C;
              border-radius: 10px;
              padding: 19px 25px;
              font-weight: 500;
              width:    153px;
              font-size: 12px;
              text-align:center;
              cursor: pointer;
            "> Scored : 3 marks </el-col> -->
        </el-row>
      </div>
    </div>
</template>
<script>
export default {
    props:['numques','ques','ans']
}
</script>