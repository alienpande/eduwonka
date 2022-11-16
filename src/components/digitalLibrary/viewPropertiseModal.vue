<template>
  <div>
    <div style="display: flex;box-shadow: rgb(0 0 0 / 5%) 0px 3px 15px;border-radius: 4px;width: 164px;background: white;padding: 14px 32px;margin-top: -59px;">
      <e-svg icon="file-icon" />
      <div style="font-weight: 600; color: #00000099; margin-left: 15px">
        {{ file.title }}
      </div>
    </div>
    <div style="color: #00000099;font-size: 20px;font-weight: 500;margin-top: 10px;">
      Properties of the file
    </div><br />
    <div style="display: flex">
      <el-card shadow="none" style="width: 16rem; border: 1px solid #00000066; margin-right: 20px">
        <div style="color: #00000099; margin-bottom: 5px">Owner</div>
        <div style="display: flex">
          <el-avatar :size="48" :src="require('@/assets/images/profile.jpg')" />
          <div style="font-size: 16px;color: #00000099;margin-left: 10px;margin-top: 10px;">
            {{ file.owner.first_name }}
          </div>
        </div>
      </el-card>

      <el-card shadow="none" style="width: 46rem; border: 1px solid #00000066">
        <div style="color: #00000099; margin-bottom: 5px">Shared with</div>
        <div>
          <el-col :span="7" :offset="1" v-for="(share, i) in file.shares" :key="i" class="mg-b-10" style="display: flex">
            <el-avatar :size="48" :src="require('@/assets/images/profile.jpg')" />
            <div style="font-size: 16px;color: #00000099;margin-left: 10px;margin-top: 10px;">
              {{ share.user.first_name }}
            </div>
          </el-col>
        </div>
      </el-card>
    </div>
    <br />
    <el-card shadow="none" style="border: 1px solid #00000066; margin-right: 20px">
      <div style="display: flex; flex-wrap: wrap">
        <div style="width:15rem;margin-bottom:20px">
          <div class="labels">File Type</div>
          <div>{{ file.resource_type }}</div>
        </div>
        <div style="width:15rem;margin-bottom:20px">
          <div class="labels">Size</div>
          <div>{{ getStorage(file.attachment, 'size') }}</div>
        </div>
        <div style="width:15rem;margin-bottom:20px">
          <div class="labels">Storage Used</div>
          <div>{{ getStorage(file.attachment, 'storage') }}</div>
        </div>
        <div style="width:15rem;margin-bottom:20px">
          <div class="labels">Created on</div>
          <div>{{ getDate(file.created_at) }}</div>
          <div>{{ file.owner.first_name }}</div>
        </div>
        <div style="width:15rem;margin-bottom:20px">
          <div class="labels">Last Modified</div>
          <div>{{ getDate(file.updated_at) }}</div>
          <div>{{ file.modifier.first_name }}</div>
        </div>
        <div style="width:15rem;margin-bottom:20px">
          <div class="labels">Last Opened</div>
          <div>{{ getDate(file.viewed_at) }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    file: {
      type: Object,
      default: null
    },
  },
  data: () => ({}),
  methods: {
    getSize(val) {
      var fileData = JSON.parse(val.attachment_file_data)
      console.log(fileData.derivatives.small.metadata.size)
      return 0
    },
    getStorage(val, type) {
      var fileData = JSON.parse(val.attachment_file_data)
      const actualSize = fileData.derivatives.small.metadata.size
      const usedSize = fileData.derivatives.large.metadata.size
      if (type === 'size') {
        return actualSize ? (actualSize / 1024).toFixed(1) + ' KB' : ') KB'
      } else if (type === 'storage') {
        return usedSize ? (usedSize / 1024).toFixed(1) + ' KB' : '0 KB'
      }
    },
    getDate(date) {
      return moment(date || new Date()).format("DD-MM-YYYY HH:mm A")
    },
  }
}
</script>
<style>
.labels {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}
</style>
