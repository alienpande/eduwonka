<template>
  <div>
    <e-container class="library-add-book" hideHeader pageTitle="Add new book" :back="$url.LI_CATALOG">
      <!-- <div
        style="
          border: 1px solid rgb(112 112 112 / 40%);
          border-radius: 4px;

          width: 124px;
          height: 162px;
          backgrounf: #ffffff;
          display: block;
          margin: auto;
          position: relative;
          cursor:pointer;
        "
      > -->
        <!-- <e-svg class="edit-pen" icon="editpens"></e-svg> -->
        <!-- <div
          style="
            color: #0000004d;
            font-weight: 600;
            font-size: 10px;
            opacity: 1;
            text-align: center;
            padding: 0 20px;
            margin-top: 69px;
          "
        >
          Upload cover Image
        </div> -->
      <!-- </div> -->
      <!-- <eduwonka-multifile-uploader :source-file-list="book.attachment_documents" @loading="v => fileUploading = v" @value="v => {book.attachment_id = v.map(x => x.id), book.attachment_documents = v}" /> -->
        <el-row class="align-center">
          <el-col :span="4" class="single-upload">
            <el-card class="align-center">
              <el-image style="height: 160px;width: auto" :src="photoUrl" class="object-fit-scale-down" />
              <div class="text-center mg-t-10">
                <eduwonka-avatar-uploader @url="v => photoUrl = v" @value="v => book.avatar = v" />
              </div>
            </el-card>
          </el-col>
        </el-row>
       <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <div class="heading">Book details</div>
      <el-card shadow="none" :rules="rules">
        <el-col :span="10">
          <e-input
            v-model="book.name"
            label="Book Name"
            placeholder="Enter Book Name"
            rules="required" 
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <e-input
            v-model="book.author"
            label="Author"
            placeholder="Enter Author Name"
            rules="required" 
          ></e-input>
        </el-col>
        <el-col>
          <div style="color: #000000cc; font-size: 16px; font-weight: 600">
            Summary
          </div>
          <textarea
            v-model="book.summary"
            class="details-expenses__textarea"
            placeholder="Enter Summary"
            rows="4"
            cols="127"
            rules="required" 
          ></textarea>
        </el-col>
        <el-col :span="10">
          <e-input
            v-model="book.publisher"
            label="Publisher"
            placeholder="Enter Publisher Name"
            rules="required" 
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <div class="custom-date-picker">
            <el-col :span="24" style="height: 100px">
              <p class="label">Published Date</p>
              <el-date-picker
                v-model="book.published_date"
                type="datetime"
                placeholder="Pick a Date"
                rules="required" 
              >
              </el-date-picker>
            </el-col>
          </div>
        </el-col>
        <el-col :span="10">
          <e-input
            v-model="book.edition"
            label="Edition"
            placeholder="Enter Edition"
            rules="required" 
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <e-input
            v-model="book.amount"
            label="Price"
            placeholder="Enter Price"
            rules="required" 
          ></e-input>
        </el-col>
      </el-card>
      <div class="heading">Record details</div>
      <el-card shadow="none" :rules="rules">
        <el-row>
          <el-col :span="10">
            <e-input
              v-model="book.isbn_number"
              label="ISBN Number"
              placeholder="Enter ISBN Number"
              rules="required" 
            ></e-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <e-input
              v-model="book.oclc_number"
              label="OCLC Number"
              placeholder="Enter OCLC Number"
              rules="required" 
            ></e-input>
          </el-col>
          <el-col :span="10">
            <e-input
              v-model="book.number_of_copies"
              label="Number of copies"
              placeholder="Enter Number of copies"
              rules="required" 
            ></e-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <!-- <e-select label="Standard" placeholder="X"></e-select> -->
          <p>Standard</p>
          <el-select v-model="book.standard_id" placeholder="Choose Standard" class="w-40" @change="check(item.id)" rules="required" >
          <el-option
            v-for="item in standardsData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            rules="required" 
          />
          </el-select>
          </el-col>
          <el-col>
            <p>Subject</p>
            <el-select v-model="book.subject_id" placeholder="Choose Subject" @change="check(item.id)" rules="required" >
            <el-option
              :span="10"
              v-for="item in subjectData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              rules="required" 
            />
            </el-select>
          </el-col>
        </el-row>
        <br />
        <br />
      </el-card>
      <br />
      <br />
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="9">
          <e-button
            :span="15"
            label="Cancel"
            width="180"
            css="cancel_btn"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="8"
            label="Create Book"
            @click="handleSubmit(createBook())"
            width="180"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </ValidationObserver>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphqlQuery, dispatchGraphqlMutation } from "@/api/dispatcher"
import EduwonkaAvatarUploader from '@/components/EduwonkaUploader/avatar.vue'
import logo from '@/assets/images/book1.png'
export default {
  components: { EduwonkaAvatarUploader },
  data: () => ({
    rules: {},
    req: {},
    standardsData: [],
    photoUrl: logo,
    subjectData:[],
    base_url: process.env.VUE_APP_BASE_API,
    book: {},
  }),
  created() {
    this.getStandards()
    this.getSubjects()
  },
  computed: {
    isValid () {
      return this.book.name && this.book.author && this.book.summary && this.book.publisher && this.book.published_date && this.book.edition && this.book.isbn_number && this.book.amount && this.book.oclc_number && this.book.number_of_copies && this.book.subject_id && this.book.standard_id;
    }
  },
  methods: {
    getSubjects() {
      dispatchGraphqlQuery('subjects', ['id', 'name'], this.book).then((response) => {
        this.subjectData = response.subjects
        console.log('subjects', this.subjectData)
      })
    },
     getStandards() {
        dispatchGraphqlQuery('standards', ['id', 'name'], this.book).then((response) => {
        this.standardsData = response.standards
        console.log('standards', this.standardsData)
      })
    },
    getVariables() {
      return {
        "object": this.book
      }
    },
    createBook() {
      this.book.attachment_id = this.book.avatar
      delete this.book.attachment
      delete this.book.avatar
      console.log('aaaaaaaaaaaaaa', this.book)
       dispatchGraphqlMutation('books', ['id', 'name'], this.book).then((response) => {
        console.log("show", response);
        this.getVariables()
        this.$router.push(this.$url.LI_CATALOG);
      })
    }
  }
};
</script>
<style>
.edit-pen img {
  position: absolute;
  top: -10px;
  right: -11px;
}
.single-upload {
  position: relative;
  width: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>
