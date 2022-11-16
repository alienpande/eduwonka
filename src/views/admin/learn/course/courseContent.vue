<template>
  <div class="learn-course-content" v-if="standardSubject" style="overflow: auto; height: 80vh">
    <course-header title="Course content" :standard="standard.name" :subject="subject.name" />
    <el-row style="padding: 0 25px 0 25px">
      <el-col :span="40" style="margin-right: 20px " class="sm-width-100 sm-margin-r-0">
        <div style="padding: 0 30px" class="sm-p-x-0 reduce-padding">
          <el-row class="sm-flex sm-d-c">
            <el-col class="sm-width-100" :span="11">
              <div class="heading">Course description</div>
              <el-card
                shadow="none"
                style="
                  margin-bottom: 10px;
                  font-size: 14px;
                  height: 16rem;
                  overflow: auto;
                  color: rgb(0 0 0 / 60%);
                "
                class="rounded-08 pg-50 cp sm-height-auto"
              >
              <textarea
                class="assign-textarea sm-width-93"
                placeholder="Text Field"
                style="
                  background: #ffffff 0% 0% no-repeat padding-box;
                  box-shadow: 0px 1px 3px #11111112;
                  border: 1px solid #cccccc;
                  border-radius: 4px;
                  padding: 10px;
                "
                v-model="course.description"
                cols="53"
                rows="13"
                @change="handleCourse()"
              ></textarea>
              </el-card>
              <div style="display: flex; justify-content: space-between" class="sm-d-c view-no-form">
                <div class="heading sm-margin-b-0">References</div>
                <e-button
                  class="btn sm-margin-b-5"
                  :span="6"
                  icon="el-icon-plus"
                  label="Add Link"
                  @click="addRef=true"
                  :plain="true"
                  style="margin: 15px 0px"
                  
                />
              </div>
              <el-card shadow="none" class="rounded-08 pg-50 cp">
                <div
                  v-for="(txt, i) in course.references_links"
                  :key="i"
                  style="
                    border: 1px solid #000000;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 9px;
                    margin-bottom: 15px;
                  "
                  class="ref-section"
                >
                  <div style="display: flex">
                    <img
                      class="ref-color"
                      src="@/assets/images/ref-icon-color.png"
                      alt=""
                    />
                    <img
                      class="ref-black"
                      src="@/assets/images/ref-icon-black.png"
                      alt=""
                    />
                    <div
                      class="fs-16 ref-txt"
                      style="opacity: 0.8; margin-left: 10px"
                    >
                      <a :href="txt.url" target="_blank">{{ txt.name }}</a>
                    </div>
                  </div>

                  <img
                    class="color-dot"
                    src="@/assets/images/3dotcolor.png"
                    alt=""
                  />

                  <img
                    class="dot-white"
                    src="@/assets/images/dotwhite.png"
                    alt=""
                  />
                </div>
              </el-card>
            </el-col>
            <el-col class="sm-width-100 sm-margin-l-0" :span="8" :offset="1">
              <div style="display: flex; justify-content: space-between" class="sm-d-c">
                <div class="heading sm-margin-b-0">Documents</div>
                <e-button
                  class="btn sm-margin-b-5"
                  :span="11"
                  icon="el-icon-plus"
                  @click="addDocument = true"
                  label="Add Document"
                  :plain="true"
                  style="margin-top: 15px;width:auto"
                />
              </div>
              <el-card shadow="none" class="rounded-08 pg-50 cp">
                <el-row>
                  <el-col :span="11" v-for="i in course.references_attachments" :key="i">
                    <div
                      class="document-section"
                      style="
                        border: 1px solid #000000;
                        border-radius: 10px;
                        padding: 18px;

                        margin: 9px;
                      "
                    >
                      <div style="display: flex; justify-content: space-between">
                        <e-svg class="attach-icon" icon="Attachment-icon"></e-svg>
                        <img
                          class="color-attach"
                          src="@/assets/images/attachcolor.png"
                          alt=""
                        />

                        <img src="@/assets/images/dotwhite.png" alt="" />
                      </div>
                      <div
                        style="width: 81px; margin-top: 20px"
                        class="fs-16 doc-text"
                      >
                        {{ i.name }}
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <e-dialog
          :title="'Add a document '"
          v-model="addDocument"
          width="40%"
          top="20vh"
          noEsc
          :gutter="20"
          hideDefaultFooter
          @cancel="addDocument = false"
          @confirm="addDocument = false"
        >
          <div
            style="
              height: 1px;
              width: 100%;
              opacity: 0.4;
              background: #ba6c47;
              margin-top: -20px;
              margin-bottom: 15px;
            "
          ></div>
          <e-input
            :span="14"
            v-model="attachmentDocuments.name"
            name="Name of the Document"
            placeholder="Text Field"
            style="margin-left: 7px"
          ></e-input>
          <br />
          <el-col class="sm-width-100" :span="18">
            <div style="color: #111111; margin-left: 7px" class="fs-16">
              Upload attachments
            </div>
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="attachmentDocuments.file" list-type="picture" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            </el-upload>
            <!-- <e-button
              class="btn"
              :span="13"
              icon="el-icon-plus"
              label="Upload attachment"
              :plain="true"
              style="margin-top: 15px"
            /> -->

            <e-button
              class="btn"
              :span="13"
              icon="el-icon-plus"
              label="Add Document"
              @click="getAttachments()"
              style="margin-top: 65px"
            />
          </el-col>
        </e-dialog>

        <e-dialog
          :title="'Add a Reference '"
          v-model="addRef"
          width="40%"
          top="20vh"
          noEsc
          :gutter="20"
          hideDefaultFooter
          @cancel="addRef = false"
          @confirm="addRef = false"
        >
          <div
            style="
              height: 1px;
              width: 100%;
              opacity: 0.4;
              background: #ba6c47;
              margin-top: -20px;
              margin-bottom: 15px;
            "
          ></div>
          <e-input
            :span="14"
            v-model="refrence.name"
            name="Name of the Reference"
            placeholder="Text Field"
            style="margin-left: 7px"
          ></e-input>
          <e-input
            :span="14"
            v-model="refrence.url"
            name="Add the URL"
            placeholder="Text Field"
            style="margin-left: 7px"
          ></e-input>
          <br />
          <el-col :span="18">
            

            <e-button
              class="btn"
              :span="13"
              icon="el-icon-plus"
              label="Add Reference"
              style="margin-top: 35px"
              @click="getUrlsData()"
            />
          </el-col>
        </e-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {  dispatchGraphql, dispatchGraphqlMutation  } from "@/api/dispatcher"
export default {
  data: () => ({
    addDocument: false,
    uploaddAttachment: false,
    addRef:false,
    req: {},
    refrence: {},
    attachmentDocuments: {},
    refTxt: [
      {
        text: "Statistic article",
      },
      {
        text: "Introduction article",
      },
      {
        text: "About the invention",
      },
      {
        text: "Story of fight",
      },
    ],
    standard: {},
    subject: {},
    standardSubject: {},
    course: {},
  }),
  created() {
    this.attachmentDocuments.id = '9b82ae3c-0f02-43eb-a6b4-237cab40033e'
    this.getCourse()
    this.getStandardandSubject()
  },
  methods: {
    handlePreview() {
      this.attachmentDocuments.id = '9b82ae3c-0f02-43eb-a6b4-237cab40033e'
      console.log('attttt', this.attachmentDocuments)
    },
    getAttachments() {
      this.course.references_attachments.push(this.attachmentDocuments)
      console.log('refrence', this.course)
      this.addDocument = false
      this.handleCourse()
    },
    getUrlsData() {
      // this.course.references_links = this.refrence
      this.course.references_links.push(this.refrence)
      console.log('refrence', this.course)
      this.addRef = false
      this.handleCourse()
    },
    getCourse() {
      const query = `query($standId: uuid, $subId: uuid!) {
        courses(where:{_and:[{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          id
          standard_id
          description
          subject_id
          references_attachments
          references_links
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        if(response.courses.length > 0) {
          this.course = response.courses[0]
          console.log('course', this.course)
        }  
      })
    },
    getVariables() {
      return {
        "standId": this.$route.params.standardId,
        "subId": this.$route.params.subjectId
      }
    },
    getStandardandSubject() {
      const standardQuery = `query($standId: uuid, $subId: uuid) {
        standard_subjects(where: {_and: [{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          id
          standard {
            id
            name
          }
          subject {
            id
            name
            subject_teachers {
              id
              teacher_id
              teacher {
                first_name
                id
              }
            }
          }
        }
      }`
      dispatchGraphql(standardQuery, this.getVariables()).then(response => {
        this.standardSubject = response.standard_subjects[0]
        this.standard = this.standardSubject.standard
        this.subject = this.standardSubject.subject
        console.log('stnadard', this.standard, 'subject', this.subject)
      })
    },
    handleCourse() {
      if (!this.course.id) {
        this.course.standard_id = this.$route.params.standardId,
        this.course.subject_id = this.$route.params.subjectId
        dispatchGraphqlMutation('courses', ['id', 'description'], this.course).then((response) => {
          console.log('getCourse',response)
          this.getCourse()
        })
      } else {
        dispatchGraphqlMutation('courses', ['id', 'description'], this.course).then((response) => {
          console.log('setCourse',response)
          this.getCourse()
        })
      }
    },
  }
};
</script>
<style>
.color-attach {
  visibility: hidden;
  height: 35px;
  margin-top: -10px;
  margin-left: -5px;
  margin-bottom: 4px;
}
.attach-icon {
  visibility: visible;
}
.document-section:hover {
  box-shadow: 0px 13px 21px #00000026;
}
.document-section:hover .doc-text {
  color: #bc6c42;
}

.document-section:hover .color-attach {
  visibility: visible !important;
}
.document-section:hover .attach-icon {
  visibility: hidden !important;
  display: none;
}

.color-dot {
  margin-top: -9px;
  display: none;
  margin-right: 3px;
  width: 13px;
  height: 34px;
  margin-top: -6px;
}
.dot-white {
  display: block;
}
.ref-section:hover {
  box-shadow: 0px 13px 21px #00000026;
  border: 1px solid #bc6c42 !important;
}

.ref-color {
  display: none;
  margin-top: -1px;
  margin-left: 2px;
}
.ref-black {
  display: block;
}

.ref-section:hover .color-dot {
  display: block;
}

.ref-section:hover .dot-white {
  display: none;
}
.ref-section:hover .ref-txt {
  color: #bc6c42;
}
.ref-section:hover .ref-color {
  display: block;
}

.ref-section:hover .ref-black {
  display: none;
}
.el-dialog__title {
  font-size: 24px;
  font-weight: 500;
  color: #4d4f5c;
}
@media only screen and (max-width:767px){
  .remove-padding{
    padding: 0px !important;
  }
}
</style>
