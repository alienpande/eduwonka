<template>
  <div>
    <div @click="setBook(book)" v-for="(book, i) in books" :key="i" style="display: inline-block; margin: 18px 34px">
      <el-card class="cp" shadow="none" style="width: 30rem;height: 12rem;box-shadow: 0px 3px 15px #0000000d;border-radius: 10px;">
        <el-col :span="6">
          <img style="width: 109px; height: 143px" src="@/assets/images/book.png" alt="" />
        </el-col>
        <el-col :span="15" :offset="2">
          <el-row>
            <el-col :span="19">
              <div style="color: #000000cc" class="fs-16 f-500">
                {{ book.name }}
              </div>
              <div style="color: #00000099;opacity: 0.4;font-size: 10px;font-weight: 500;">
                By {{ book.author }}
              </div>
            </el-col>
          </el-row><br />
          <div style="color: #00000099; font-size: 12px">
            Publisher
          </div>
          <div style="color: #00000099; font-size: 10px">{{ book.publisher }}</div>
          <!-- <button style="color: #bc6c42;font-weight: 600;font-size: 16px;box-shadow: 0px 1px 3px #11111112;border-radius: 4px;background: #11111112;border: none;padding: 5px 15px;float: right;margin: 42px -38px 0px 0;">
            Remove
          </button> -->
        </el-col>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    books: {
      type: Array,
      default: null
    }
  },
  methods: {
    setBook(book) {
      this.$emit('setUserbook', book)
    }
  }
};
</script>
