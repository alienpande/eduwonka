<template>
  <div>
    <div style="padding: 20px">
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">Task Details</div>

        <div
          class="rounded-08"
          style="border: 1px solid #404040; padding: 20px; margin-top: 10px"
        >
          <es-input
            v-model="groupData"
            placeholder="Enter a Group Name"
            label="Group Name"
          ></es-input>

          <br />
          <br />
          <br />
          <div class="label" style="color: #f3f3f3">Group Highlights</div>
          <div
            class="rounded-05"
            style="border: 1px solid #fe9d2b; background: #353535"
          >
            <ul style="color: #f3f3f3">
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
            </ul>
          </div>
        </div>
      </el-card>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">Task Frequency</div>
        <div
          class="rounded-08"
          style="border: 1px solid #404040; padding: 20px; margin-top: 10px"
        >
          <el-row>
            <el-col :span="4">
              <es-date-picker
                placeholder="Choose Date"
                label="Start Date"
              ></es-date-picker>
            </el-col>
            <el-col :span="10" :offset="1">
              <div
                style="
                  color: #f3f3f3;
                  font-weight: 600;
                  padding-top: 5px;
                  display: block;
                "
              >
                Time (Optional)
              </div>
              <el-row>
                <el-col :span="7">
                  <es-select
                    placeholder="00 hrs"
                    class="non-round select-icon"
                  ></es-select>
                </el-col>
                <el-col :span="7" :offset="1">
                  <es-select
                    placeholder="00 min"
                    class="non-round select-icon"
                  ></es-select>
                </el-col>
                <el-col :span="5" :offset="1">
                  <es-select
                    placeholder="Am"
                    class="non-round select-icon"
                  ></es-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <br />
          <div class="hr"></div>
          <br />
          <es-button
            width="200"
            text="Add end date"
            icon="addPluse"
          ></es-button>
        </div>
      </el-card>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">Task Frequency</div>
        <div
          class="rounded-08"
          style="border: 1px solid #404040; padding: 20px; margin-top: 10px"
        >
          <es-radio
            v-model="reportValue"
            label="Do you want to repeat this task?"
            :options="report"
          />
          <br />
          <br /><br /><br />
          <div class="hr"></div>
          <el-row>
            <el-col :span="9">
              <es-radio
                v-model="repeatValue"
                label="Repeat"
                :options="repeatOption"
              />
            </el-col>
            <el-col :span="7">
              <es-radio
                v-model="endrepeatValue"
                label="End Repeat"
                :options="endRepeat"
              />

              <br />

              <es-date-picker
                :span="13"
                placeholder="Choose end repeat date"
              ></es-date-picker>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">Downloads</div>
        <div
          class="rounded-08"
          style="border: 1px solid #404040; padding: 20px; margin-top: 10px"
        >
          <div
            style="
              background: #353535;
              border: 1px dashed #575757;
              border-radius: 8px;

              padding: 60px 0;
            "
          >
            <e-svg style="display: table; margin: auto" icon="uploadIcon">
            </e-svg>
            <div style="color: #cfcfcf; text-align: center; font-size: 12px">
              Drag & drop file here or Click to add
            </div>
          </div>
          <br />
          <div class="hr"></div>
          <br />
          <el-row
            style="background: #282828; border-radius: 8px; padding: 14px"
          >
            <el-col :span="1">
              <img src="@/assets/images/Rectangle9.png" alt="" />
            </el-col>
            <el-col :span="2">
              <div style="color: #f3f3f3">Test.pdf</div>
              <div style="font-size: 12px; color: #858585">230KB</div>
            </el-col>
            <el-col :span="13" :offset="5">
              <div
                style="
                  background: #353535;

                  border: 1px solid #6e6e6e;

                  border-radius: 4px;
                  display: flex;
                  justify-content: space-between;
                  padding: 8px;
                "
              >
                <div style="color: #9d9d9d" class="fs-16">File Description</div>
                <div style="color: #cfcfcf; font-size: 12px; padding-top: 2px">
                  0/30
                </div>
              </div>
            </el-col>
            <el-col :span="1" :offset="2">
              <e-svg style="margin-top: 15px" icon="redCross"></e-svg>
            </el-col>
          </el-row>
          <el-row
            style="
              background: #282828;
              margin-top: 15px;
              border-radius: 8px;
              padding: 14px;
            "
          >
            <el-col :span="1">
              <img src="@/assets/images/Rectangle9.png" alt="" />
            </el-col>
            <el-col :span="5">
              <div style="color: #f3f3f3">Science Exam Papers.pdf</div>
              <div style="font-size: 12px; color: #858585">230KB</div>
            </el-col>
            <el-col :span="13" :offset="2">
              <div
                style="
                  background: #353535;
                  margin-top: 15px;
                  border-radius: 4px;
                  height: 8px;
                  width: 100%;
                "
              >
                <div
                  style="
                    background: #1fc24e;
                    border-radius: 4px;
                    height: 8px;
                    width: 10%;
                  "
                ></div>
              </div>
            </el-col>
            <el-col :span="1" :offset="2">
              <e-svg style="margin-top: 15px" icon="redCross"></e-svg>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">Reference Books</div>
        <div
          class="rounded-08"
          style="border: 1px solid #404040; padding: 20px; margin-top: 10px"
        >
          <div style="display: flex; justify-content: space-between">
            <div class="fs-16 f-600 text-white">
              Add reference books for the group
            </div>
            <es-button
              text="Add book details"
              @click="addbookref = true"
              icon="addPluse"
              width="200"
            ></es-button>
          </div>
          <br />
          <div class="hr"></div>
          <el-row>
            <el-col :span="7" v-for="i in 6" :key="i">
              <el-row
                class="reference-book-hover"
                style="border-radius: 4px; padding: 10px; margin: 10px 50px"
              >
                <el-col :span="7">
                  <img
                    style="width: 70px; height: 70px"
                    src="@/assets/images/Rectangle9.png"
                    alt=""
                  />
                </el-col>
                <el-col :span="10">
                  <div style="font-size: 14px; color: white">
                    Social Science Exam Papers.pdf
                  </div>
                  <div style="color: #858585">By J.K. Rowlings</div>
                </el-col>
                <el-col
                  :span="2"
                  style="display: none"
                  class="ref-book-cross"
                  :offset="5"
                >
                  <e-svg style="margin-top: 15px" icon="redCross"></e-svg>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <el-row
      style="
        margin-top: 20px;
        background: #1e1e1e;
        padding-top: 25px;
        padding-bottom: 15px;
      "
    >
      <el-col :span="5" :offset="14">
        <es-button text="Cancel" width="200"></es-button>
      </el-col>
      <el-col style="float: right" :span="5">
        <es-button text="Proceed" width="200" :plain="true"></es-button>
      </el-col>
    </el-row>
    <!-- ====================DETAILS REFERENCR==================== -->
    <es-dialog
      v-model="addbookref"
      width="70%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="addbookref = false"
      @confirm="addbookref = false"
    >
      <div class="d-flex" style="margin-top: -56px">
        <div style="font-weight: bold; font-size: 24px; color: #f3f3f3">
          Add details of reference books
        </div>
        <e-svg style="margin: 9px 10px" icon="whiteI"> </e-svg>
        <es-search
          style="margin-top: 4px; margin-left: 150px; width: 19rem"
          v-model="searchBy"
          placeholder="Search by Book Name or Author"
        ></es-search>
      </div>
      <br />
      <div class="hr"></div>
      <br />
      <div class="d-flex" style="justify-content: space-between">
        <div>
          <div style="font-weight: bold; font-size: 18px; color: #f3f3f3">
            60 Books for Class Vi
          </div>
          <div style="font-size: 12px; color: #858585">Books Selected: 8</div>
        </div>
        <es-button text="Deselect All"></es-button>
      </div>
      <el-row>
        <el-col style="padding:0 15px;margin:15px 0" :span="8" v-for="i in 9" :key="i">
          <el-row  :class="{'add-book-selected' : i%4==0}" style="border-radius: 4px; padding: 10px; ">
            <el-col :span="5">
              <img
                style="width: 40px; height: 40px"
                src="@/assets/images/Rectangle9.png"
                
              />
            </el-col>
            <el-col :span="19">
              <div style="font-size: 12px; color: white">
                Social Science Exam Papers.pdf
              </div>
              <div style="color: #858585">By J.K. Rowlings</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
       <br />
      <div class="hr"></div>
      <br />
      <el-row>
          <el-col :span='10'>
              <es-pagination></es-pagination>
          </el-col>
          <el-col :span='6' :offset="8">
<es-button text='Done' :plain='true'></es-button>
          </el-col>
      </el-row>
    </es-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    groupData: "",
    reportValue: "Yes",
    repeatValue: "Daily",
    endrepeatValue: "Yes",
    addbookref: false,
    searchBy: "",
    report: [
      {
        title: "Yes",
        value: "Yes",
      },
      {
        title: "No",
        value: "No",
      },
    ],
    endRepeat: [
      {
        title: "End repeat date",
        value: "Yes",
      },
      {
        title: "Repeat forever",
        value: "No",
      },
    ],
    repeatOption: [
      {
        title: "Daily",
        value: "Daily",
      },
      {
        title: "Weekly",
        value: "Weekly",
      },
      {
        title: "Monthly",
        value: "Monthly",
      },
    ],
  }),
};
</script>
<style>
.reference-book-hover:hover {
  background: #353535;
}
.reference-book-hover:hover .ref-book-cross {
  display: block !important;
}
.noHeader {
  padding: 20px 0 0 0 !important;
}
.add-book-selected{
     background: #353535;
}
</style>
