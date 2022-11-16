<template>
  <div>
    <el-dialog title="Grading System" :visible.sync="dialogBox" width="60%" custom-class="custom-dialog">
      <el-row :gutter="20">
        <el-col :span="10" :sm="24" :md="10">
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="20">
                <span class="tx-18 tx-bolder text-white">Part 1: Scholastic Activities</span>
              </el-col>
            </el-row>
            <br />
            <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
              <el-row>
                <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                  <el-row>
                    <el-col class="text-white tx-16 tx-bolder mg-l-20" :span="6">
                      Grade
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="9" :offset="6">
                      Marks Range
                    </el-col>
                  </el-row>
                  <el-row v-for="(grade, i) in grades" :key="i" class="mg-t-10">
                    <el-card class="bg-black-4" :style="'border: none'" shadow="none">
                      <el-col class="text-white tx-16 tx-bolder mg-l-20 mg-b-10" :span="7">
                        {{ grade }}
                      </el-col>
                      <el-col class="text-white tx-16 tx-bolder mg-b-10" :span="6" :offset="6">
                        {{ ranges[i] }}
                      </el-col>
                    </el-card>
                  </el-row>
                </el-card>
              </el-row>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="14" :sm="24" :md="14">
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="20">
                <span class="tx-18 tx-bolder text-white">Part 2/3: Co Scholastic Activities/Discipline</span>
              </el-col>
            </el-row>
            <br />
            <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
              <el-row>
                <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                  <el-row>
                    <el-col class="text-white tx-16 tx-bolder mg-l-20" :span="6">
                      Grade
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="8">
                      Grade Point
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="8">
                      Grade Point
                    </el-col>
                  </el-row>
                  <el-row v-for="(grade, i) in data" :key="i" class="mg-t-10">
                    <el-card class="bg-black-4" :style="'border: none'" shadow="none">
                      <el-col class="text-white tx-16 tx-bolder mg-l-20 mg-b-10" :span="7">
                        {{ grade }}
                      </el-col>
                      <el-col class="text-white tx-16 tx-bolder mg-b-10" :span="6">
                        {{ ranks[i] }}
                      </el-col>
                      <el-col class="text-white tx-16 tx-bolder mg-b-10" :span="6" :offset="1">
                        {{ performance[i] }}
                      </el-col>
                    </el-card>
                  </el-row>
                </el-card>
              </el-row>
            </el-card>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
    <el-tabs class="floatTabHeader studentTab" v-model="activeName">
      <el-tab-pane label="Term1" name="term1">
        <el-row>
          <el-col :span="10">
            <div style="color: #cfcfcf">10 Grades Available</div>
          </el-col>
          <el-col :span="4" :offset="6">
            <es-button class="pd-10" icon="downloadYellow" text="Download Grades" />
          </el-col>
          <el-col :span="4">
            <es-button class="pd-10" icon="star" text="View Grading System" @click="dialogBox = true" />
          </el-col>
        </el-row>
        <br />
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="24" class="mt10 mb20">
                <el-row class="event-row">
                  <el-col :span="15"><span class="tx-18 tx-bolder text-white">Part 1: Scholastic Areas</span></el-col>
                  <el-col :span="2">
                    <div>
                      <div class="green-dot" style="display: inline-block"></div>
                      <span class="text-white tx-12 mg-l-2">Above Average</span>
                    </div>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <div>
                      <div class="yellow-dot" style="display: inline-block"></div>
                      <span class="text-white tx-12 mg-l-5">Average</span>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div>
                      <div class="red-dot" style="display: inline-block"></div>
                      <span class="text-white tx-12 mg-l-5">Below Average</span>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="3">
              <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                  <el-row>
                    <el-col class="text-white tx-16 tx-bolder mg-l-59" :span="5" :offset="1">
                      Subjects
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="3">
                      PA1 (10)
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="3">
                      Notebook (5)
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="3">
                      Sub Enrichment
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="3">
                      Half 1/2 (80)
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="3">
                      Total Marks
                    </el-col>
                    <el-col class="text-white tx-16 tx-bolder" :span="3">
                      Grade
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-row v-for="(subject, i) of subjects" :key="i" class="mg-t-10">
                      <el-card class="bg-black-4" :style="'border: none'" shadow="none">
                        <el-col class="text-gray-6 tx-16 tx-bolder mg-l-30 mg-b-10" :span="5">
                          {{ subject }}
                        </el-col>
                        <el-col v-for="i of marks" :key="i" class="text-white tx-bolder" :span="3">
                          <div class="bg-black-1 d-flex justify-content-center mg-l-35" style="width: 40px; border-radius: 5px;">{{ i }}</div>
                        </el-col>
                        <el-col class="text-white tx-bolder mg-l-50 mg-b-10" :span="2">
                          <div v-if="i <= 1" class="d-flex justify-content-center" style="width: 40px; background: #1FC24E; border-radius: 5px;">A</div>
                          <div v-if="i > 1 && i <= 2" class="d-flex justify-content-center" style="width: 40px; background: #1FC24E; border-radius: 5px;">B</div>
                          <div v-if="i > 2 && i < 5" class="d-flex justify-content-center" style="width: 40px; background: #F17F22; border-radius: 5px;">C</div>
                          <div v-if="i >= 5" class="d-flex justify-content-center" style="width: 40px; background: #F14D4D; border-radius: 5px;">D</div>
                        </el-col>
                      </el-card>
                    </el-row>
                  </el-row>
                </el-card>
              </el-card>
            </el-row>
        </el-card>
        <div class="mg-t-20">
          <el-row :gutter="20">
            <el-col :span="12" :sm="24" :md="12">
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="20">
                    <span class="tx-18 tx-bolder text-white">Part 2: Co Scholastic Activities (Assessed on 3 point scale)</span>
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                      <el-row>
                        <el-col class="text-white tx-16 tx-bolder mg-l-70" :span="6" :offset="1">
                          Activities
                        </el-col>
                        <el-col class="text-white tx-16 tx-bolder" :span="3" :offset="10">
                          Grade
                        </el-col>
                      </el-row>
                      <el-row v-for="(subject, i) of activities" :key="i" class="mg-t-10">
                        <el-card class="bg-black-4" :style="'border: none'" shadow="none">
                          <el-col class="text-gray-6 tx-16 tx-bolder mg-l-40 mg-b-10" :span="7">
                            {{ subject }}
                          </el-col>
                          <el-col class="text-white tx-bolder mg-b-10" :span="2" :offset="11">
                            <div v-if="i == 0" class="d-flex justify-content-center" style="width: 40px; background: #1FC24E; border-radius: 5px;">A</div>
                            <div v-if="i == 1" class="d-flex justify-content-center" style="width: 40px; background: #F17F22; border-radius: 5px;">C</div>
                            <div v-if="i == 2" class="d-flex justify-content-center" style="width: 40px; background: #F14D4D; border-radius: 5px;">D</div>
                          </el-col>
                        </el-card>
                      </el-row>
                    </el-card>
                  </el-row>
                </el-card>
              </el-card>
            </el-col>
            <el-col :span="12" :sm="24" :md="12">
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="17">
                    <span class="tx-18 tx-bolder text-white">Part 3: Discipline (Assessed on 3 point scale)</span>
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                      <el-row>
                        <el-col class="text-white tx-16 tx-bolder mg-l-70" :span="6" :offset="1">
                          Activities
                        </el-col>
                        <el-col class="text-white tx-16 tx-bolder" :span="3" :offset="10">
                          Grade
                        </el-col>
                      </el-row>
                      <el-row v-for="(subject, i) of activities" :key="i" class="mg-t-10">
                        <el-card class="bg-black-4" :style="'border: none'" shadow="none">
                          <el-col class="text-gray-6 tx-16 tx-bolder mg-l-40 mg-b-10" :span="7">
                            {{ subject }}
                          </el-col>
                          <el-col class="text-white tx-bolder mg-b-10" :span="2" :offset="11">
                            <div v-if="i == 0" class="d-flex justify-content-center" style="width: 40px; background: #1FC24E; border-radius: 5px;">A</div>
                            <div v-if="i == 1" class="d-flex justify-content-center" style="width: 40px; background: #F17F22; border-radius: 5px;">C</div>
                            <div v-if="i == 2" class="d-flex justify-content-center" style="width: 40px; background: #F14D4D; border-radius: 5px;">D</div>
                          </el-col>
                        </el-card>
                      </el-row>
                    </el-card>
                  </el-row>
                </el-card>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="term2" name="term2">
        <el-row>
          <el-col :span="10">
            <div style="color: #cfcfcf">10 Grades Available</div>
          </el-col>
          <el-col :span="4" :offset="6">
            <es-button class="pd-10" icon="downloadYellow" text="Download Grades" />
          </el-col>
          <el-col :span="4">
            <es-button class="pd-10" icon="star" text="View Grading System" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Result & Signature" name="results">
        <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
          <el-row>
            <el-col :span="6" :offset="1" class="d-flex">
              <e-svg style="padding-top: 10px; padding-right: 15px" icon="star"></e-svg>
              <div>
                <div class="text-gray-6 tx-14">your result from term1</div>
                <div class="sub-title tx-18 mg-t-4">A</div>
              </div>
            </el-col>
            <el-col :span="6" class="d-flex">
              <e-svg style="padding-top: 10px; padding-right: 15px" icon="rankincrement"></e-svg>
              <div>
                <div class="text-gray-6 tx-14">Your Rank in class</div>
                <div class="sub-title tx-18 mg-t-4">12/50</div>
              </div>
            </el-col>
            <el-col :span="4" :offset="6" class="d-flex">
              <es-button class="pd-10" :plain="true" icon="downloadBlack" text="Download Report card" />
            </el-col>
          </el-row>
        </el-card>
        <div class="mg-t-20">
          <el-row :gutter="20">
            <el-col :span="24" :sm="24" :md="24">
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="20">
                    <span class="tx-18 tx-bolder text-white">Teacher Remarks</span>
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                      <el-row class="text-white tx-16">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        it was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      </el-row>
                    </el-card>
                  </el-row>
                </el-card>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="mg-t-20">
          <el-row :gutter="20">
            <el-col :span="24" :sm="24" :md="24">
              <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="20">
                    <span class="tx-18 tx-bolder text-white">Signature Status</span>
                  </el-col>
                </el-row>
                <br />
                <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                  <el-row>
                    <el-col :span="7" :offset="1" v-for="i in signatures" :key="i">
                      <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                        <el-row>
                          <el-col :span="20">
                            <span class="tx-16 text-white">{{ i }}</span>
                          </el-col>
                        </el-row>
                        <div style="border-top: 2px solid #404040;" />
                        <br />
                        <div class="d-flex justify-content-center">
                          <el-upload
                            class="upload-demo bg-black-2"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :file-list="fileList"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                          </el-upload>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-card>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({
    activeName: "term1",
    dialogBox: false,
    subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social studies', 'History'],
    marks: [20, 40, 35, 80, 70],
    activities: ['Work Education', 'Art Education', 'Health, Physical Ed'],
    signatures: ['Principal', 'Class Teacher', 'Parents'],
    grades: ['A', 'A2', 'B1', 'B2', 'C1', 'C2'],
    ranges: ['91 - 100', '81 - 90', '71 - 80', '61 - 70', '51 - 60', '41 - 50'],
    data: ['A', 'B', 'C'],
    ranks: [3,2,1],
    performance: ['Outstanding', 'Very Good', 'Fair'],
    fileList: []
  }),
  created() {},
  methods: {}
};
</script>