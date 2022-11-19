<template>
  <div
    @click="$emit('cliks', book)"
    style="display: inline-block; cursor: pointer; margin-bottom: 10px;"
  >
    <el-card
      shadow="none"
      style="
        width: 30rem;
        height: 12rem;
        box-shadow: 0px 3px 15px #0000000d;
        border-radius: 10px;
        margin: 0 10px;
      "
    >
      <el-col :span="window.width > 500 ? 6 : 5">
        <img v-if="book.attachment"
          :style="window.width > 500 ? 'width: 109px; height: 143px' : 'width: 80px; float: right;'"
          :src="base_url + book.attachment.file_url"
          alt=""
        />
        <img v-else
          :style="window.width > 500 ? 'width: 109px; height: 143px' : 'width: 80px; float: right;'"
          src="@/assets/images/book.png"
          alt=""
        />
      </el-col>
      <el-col :span="15" :offset="window.width > 500 ? 2 : 1">
        <el-row>
          <el-col :span="19">
            <div style="color: #000000cc" class="fs-16 f-500">
              {{ book.name }}
            </div>
            <div
              style="
                color: #00000099;
                opacity: 0.4;
                font-size: 10px;
                font-weight: 500;
              "
            >
              By {{ book.author }}
            </div>
          </el-col>
          <el-col :span="1" :offset="2">
            <e-svg
              v-if="book.bookmark > 0"
              icon="Bookmarked"
            ></e-svg>
            <img
              v-if="book.bookmark === 0"
              style="height: 30px"
              src="@/assets/images/unbookmark.png"
              alt=""
            />
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col>
            <el-card
              shadow="none"
              style="
                background: rgb(188 108 66 / 10%);
                padding-bottom: 18px;
                border-radius: 10px;
              "
            >
              <el-col :span="12">
                <div style="color: #00000066; font-weight: 300">PUBLISHER</div>
                <div
                  style="color: #00000099; font-size: 12px; font-weight: 500"
                >
                  <!-- 132 Illuminations --> {{ book.publisher }}
                </div>
              </el-col>
              <el-col :span="11" :offset="1">
                <div style="color: #00000066; font-weight: 300">Status</div>
                <div
                  v-if="getStatus(book) === 'Available'"
                  style="color: #0bc32e; font-size: 12px; font-weight: 500"
                >
                  Available
                </div>
                <div
                  v-if="getStatus(book) === 'Unavailable'"
                  style="color: #e60000; font-size: 12px; font-weight: 500"
                >
                  Unavailable
                </div>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-card>
  </div>
</template>
<script>
import screenSize from '@/mixins/screenSize'
export default {
  // props: ["name", "id", "status", "bookmark","author","publisher"],
  props: ["book"],
  mixins: [screenSize],
  data() {
    return {
      base_url: process.env.VUE_APP_BASE_API
    };
  },
  created(){
    console.log('RRRRRRRRRRRRR', process.env.VUE_APP_BASE_API)
    console.log('RRRRRRRRRRRRR', this.book)
  },
  methods: {
    getStatus(book) {
      if (book.number_of_copies > book.issue_returns_aggregate.aggregate.count) {
        return 'Available'
      } else {
        return 'Unavailable'
      }
    }
  }
};
</script>
