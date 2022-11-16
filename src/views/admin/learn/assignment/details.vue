<template>
  <div>
    <div style="background: white; padding: 14px 64px 0 64px" class="reduce-padding">
      <div style="display: flex; justify-content: space-between">
        <div style="opacity: 0.8; font-size: 24px; font-weight: 500">
          Kenneth Patrick
        </div>
        <div>
          <e-svg
            @click="$router.push($url.LN_ASSIGNMENTS)"
            icon="Close2"
          ></e-svg>
        </div>
      </div>
      <div
        style="display: flex; justify-content: space-between; margin-top: 10px"
      >
        <div style="display: flex" class="view-no-form">
          <div style="margin-right: 50px">
            <div style="opacity: 0.8; font-weight: 300">Score</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              30/45
            </div>
          </div>
          <div style="margin-right: 50px">
            <div style="opacity: 0.8; font-weight: 300">Time taken</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              25 m 15 s
            </div>
          </div>
          <div>
            <div style="opacity: 0.8; font-weight: 300">Submission date</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              12th June
            </div>
          </div>
        </div>
        <div>
          <e-button
            @click="questionBank = true"
            class="btn"
            icon="el-icon-download"
            label="Download"
          />
        </div>
      </div>
    </div>
    <div style="padding: 0 30px; height: 61vh; overflow: auto">
      <el-row class="view-no-form">
        <el-col :span="10">
          <div class="heading">Title</div>
          <el-card shadow="none" class="rounded-08 pg-50 cp">
            <div style="opacity: 0.6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </div>
          </el-card>
        </el-col>
        <el-col :span="10" :offset="1">
          <div class="heading">Project goal</div>
          <el-card shadow="none" class="rounded-08 pg-50 cp">
            <div style="opacity: 0.6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-col :span="21">
        <div class="heading">Process</div>
        <el-card shadow="none" class="rounded-08 pg-50 cp">
          <div style="opacity: 0.6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam
            at lectus urna duis convallis convallis tellus id. Sem et tortor
            consequat id porta nibh venenatis cras. Gravida neque convallis a
            cras semper auctor neque vitae. Iaculis nunc sed augue lacus viverra
            vitae. Diam in arcu cursus euismod quis viverra nibh cras.
            Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt.
            Amet nulla facilisi morbi tempus iaculis urna. Sed augue lacus
            viverra vitae congue eu. Ultricies mi eget mauris pharetra et
            ultrices neque ornare. Nullam eget felis eget nunc lobortis mattis.
            Lorem mollis aliquam ut porttitor leo. Nisl purus in mollis nunc sed
            id semper risus in. Et malesuada fames ac turpis egestas integer
            eget aliquet. Egestas erat imperdiet sed euismod nisi.
          </div>
        </el-card>
      </el-col>
        <el-col :span="21">
        <div class="heading">Solution</div>
        <el-card shadow="none" class="rounded-08 pg-50 cp">
          <div style="opacity: 0.6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam
            at lectus urna duis convallis convallis tellus id. Sem et tortor
            consequat id porta nibh venenatis cras. Gravida neque convallis a
            cras semper auctor neque vitae. Iaculis nunc sed augue lacus viverra
            vitae. Diam in arcu cursus euismod quis viverra nibh cras.
            Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt.
            Amet nulla facilisi morbi tempus iaculis urna. Sed augue lacus
            viverra vitae congue eu. Ultricies mi eget mauris pharetra et
            ultrices neque ornare. Nullam eget felis eget nunc lobortis mattis.
            Lorem mollis aliquam ut porttitor leo. Nisl purus in mollis nunc sed
            id semper risus in. Et malesuada fames ac turpis egestas integer
            eget aliquet. Egestas erat imperdiet sed euismod nisi.
          </div>
        </el-card>
      </el-col>
     
      <el-col :span="21" style="padding-bottom:50px">
           <div class="heading">Attachments</div>
           <div style="display:flex" class="view-no-form">

         
         
       <div v-for="i in 3" :key="i"
                style="
                  display: flex;
                  margin-right:10px;
                  background: white;
                  padding: 10px 15px;
                  width: fit-content;
                  border: 1px solid #000000;
                  border-radius: 10px;
                "
              >
                <e-svg icon="Attachment-icon"></e-svg>
                <div style="opacity: 0.8; margin-left: 10px" class="fs-16">
                  Study data.pdf
                </div>
              </div>
                </div>
              </el-col>
    </div>
  </div>
</template>
