<template>
  <es-container hideHeader pageTitle="View Book Details" :back="$url.LI_CATALOG" class="bg-black-5">
    <el-row style="margin: 20px">
      <el-col :span="5" :offset="1">
        <img style="width: 251px; height: 341px;border-redius: 4px" src="@/assets/images/book.png" alt=""/>
      </el-col>
      <el-col :span="17">
        <el-row>
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <el-col :span="5" :offset="1" class="mg-b-20 mg-t-10 d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="totalCopies"></e-svg>
              <div>
                <div class="text-gray-6">Total Copies</div>
                <div class="sub-title mg-t-4">{{book.number_of_copies}}</div>
              </div>
            </el-col>
            <el-col :span="5" class="mg-t-10 d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="availableBooks"></e-svg>
              <div>
                <div class="text-gray-6">Available</div>
                <div class="sub-title mg-t-4">{{ this.detail[1] }}</div>
              </div>
            </el-col>
            <el-col :span="5" class="mg-t-10 d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="issuedBooks"></e-svg>
              <div>
                <div class="text-gray-6">Issued</div>
                <div class="sub-title mg-t-4"> {{ this.detail[2] }} </div>
              </div>
            </el-col>
          </el-card>
        </el-row>
        <el-row class="mg-t-15">
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="20">
                <span class="tx-20 tx-bolder text-white">Record Details</span>
              </el-col>
            </el-row>
            <br />
            <el-row :gutter="20">
              <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                <el-row>
                  <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                    <el-col :span="4" class="mg-b-20 mg-l-20 d-flex">
                      <div>
                        <div class="text-gray-6">ISBN Number</div>
                        <div class="sub-title mg-t-4">{{book.isbn_number}}</div>
                      </div>
                    </el-col>
                    <el-col :span="4" class="mg-l-30 d-flex">
                      <div>
                        <div class="text-gray-6">OCLC Number</div>
                        <div class="sub-title mg-t-4">{{book.oclc_number}}</div>
                      </div>
                    </el-col>
                    <el-col :span="4" class="mg-l-30 d-flex">
                      <div>
                        <div class="text-gray-6">Number of copies</div>
                        <div class="sub-title mg-t-4">{{book.number_of_copies}}</div>
                      </div>
                    </el-col>
                    <el-col :span="4" class="mg-l-30 d-flex">
                      <div>
                        <div class="text-gray-6">Vendor</div>
                        <div class="sub-title mg-t-4">{{ book.subject.subject_teachers[0].teacher.first_name }}</div>
                      </div>
                    </el-col>
                    <el-col :span="4" class="mg-l-30 d-flex">
                      <div>
                        <div class="text-gray-6">Category</div>
                        <div class="sub-title mg-t-4">{{book.subject.name}}</div>
                      </div>
                    </el-col>
                  </el-card>
                </el-row>
              </el-card>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="20">
            <span class="tx-20 tx-bolder text-white">Book Details</span>
          </el-col>
        </el-row>
        <br />
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-row>
            <el-col :span="24">
              <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
                <el-col :span="4" class="mg-b-20 mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6">Book Name</div>
                    <div class="sub-title">{{book.name}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6">Author</div>
                    <div class="sub-title">{{book.author}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6">Publisher</div>
                    <div class="sub-title">{{book.publisher}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6">Published Date</div>
                    <div class="sub-title">{{book.published_date}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6">Edition</div>
                    <div class="sub-title">{{book.edition}}</div>
                  </div>
                </el-col>
                <el-col :span="3" class="mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6">Price</div>
                    <div class="sub-title">{{book.amount}}</div>
                  </div>
                </el-col>
                <el-col :span="20" class="mg-b-20 mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6">summary</div>
                    <div class="sub-title">
                      {{book.summary}}
                    </div>
                  </div>
                </el-col>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-card>
    </el-row>
    <el-row>
      &emsp;
    </el-row>
  </es-container>
</template>
<script>
import {  dispatchGraphql } from "@/api/dispatcher";
export default {
  components: {  },
  data: () => ({
    book: {},
    detail: [],
   }),
  created(){
    this.getBookDetails()
  },
  methods: {
    // getBookDetails: function(){
    //   dispatchGraphqlQueryByPk('books',['id', 'number_of_copies', 'isbn_number', 'oclc_number', 'name', 'author', 'publisher', 'published_date', 'edition', 'summary'],{id: this.$route.params.id}).then((response) => {
    //     this.book = response.books_by_pk
    //     console.log('$$$$$$$$$$$$', this.book)
    //   })
    // }
    getBookDetails() {
      const query = `{
        books(where: {id: {_eq: "${this.$route.params.id}"}}) {
          id
          name
          author
          amount
          publisher
          published_date
          subject_id
          standard_id
          summary
          edition
          number_of_copies
          isbn_number  
          oclc_number
          subject{
            id
            name
            subject_teachers{
              id
              section_id
              teacher{
                id
                first_name
              }
            }
          }
          issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
            aggregate {
              count
            }
          } 
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.book = response.books[0]
        this.detail[0] = this.book.number_of_copies
        this.detail[1] = this.book.number_of_copies - this.book.issue_returns_aggregate.aggregate.count
        this.detail[2] = this.book.issue_returns_aggregate.aggregate.count
        console.log("books", this.book)
      });
    },
  }
};
</script>
<style>

</style>
