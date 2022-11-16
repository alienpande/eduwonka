<template>
  <div>
    <div style="display: flex;box-shadow: rgb(0 0 0 / 5%) 0px 3px 15px;border-radius: 4px;width: 200px;background: #404040;padding: 14px 32px;margin-top: -59px;">
      <e-svg icon="darkFile" />
      <div class="text-white tx-18" style="font-weight: 600; margin-left: 15px">
        {{ file.title }}
      </div>
    </div><br /><br />
    <el-row>
      <el-col class="text-white tx-20 tx-bolder">
        Properties of the File
      </el-col>
    </el-row><br />
    <el-row>
      <el-col :span="7">
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-row>
            <div class="sub-title">Owner</div>
          </el-row>
          <el-row>
            <el-col class="mg-l-20 mg-t-20 d-flex">
              <el-avatar :size="50" :src="require('@/assets/images/profile.jpg')" />
              <div class="mg-l-20">
                <div class="text-gray-6">Name</div>
                <div class="sub-title mg-t-4">{{ file.owner.first_name }}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="15" :offset="2">
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-row>
            <div class="sub-title">Shared With</div>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1" v-for="(share, i) in file.shares" :key="i" class="mg-l-20 mg-t-20 d-flex">
              <el-avatar :size="50" :src="require('@/assets/images/profile.jpg')" />
              <div class="mg-l-20">
                <div class="text-gray-6">Name</div>
                <div class="sub-title mg-t-4">{{ share.user.first_name }}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row><br /><br />
    <el-row>
      <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="5" class="mg-b-20 d-flex justify-content-center">
            <div>
              <div class="text-gray-6">File Type</div>
              <div class="sub-title mg-t-4">{{ file.resource_type }}</div>
            </div>
          </el-col>
          <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
            <div>
              <div class="text-gray-6">Size</div>
              <div class="sub-title mg-t-4">{{ getStorage(file.attachment, 'size') }}</div>
            </div>
          </el-col>
          <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
            <div>
              <div class="text-gray-6">Storage Used</div>
              <div class="sub-title mg-t-4">{{ getStorage(file.attachment, 'storage') }}</div>
            </div>
          </el-col>
          <el-col :span="7" class="mg-l-30 d-flex justify-content-center">
            <div>
              <div class="text-gray-6">Created On</div>
              <div class="sub-title mg-t-4">{{ getDate(file.created_at) }} by {{ file.owner.first_name }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" class="mg-b-20 mg-l-20 d-flex justify-content-center">
            <div>
              <div class="text-gray-6">Last Modified</div>
              <div class="sub-title mg-t-4">{{ getDate(file.updated_at) }} by {{ file.modifier.first_name }}</div>
            </div>
          </el-col>
          <el-col :span="7" class="mg-l-30 d-flex justify-content-center">
            <div>
              <div class="text-gray-6">Last Opened</div>
              <div class="sub-title mg-t-4">{{ getDate(file.viewed_at) }}</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  components: {},
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
      if (fileData.derivatives) {
        const actualSize = fileData.derivatives.small ? fileData.derivatives.small.metadata.size : 0
        const usedSize = fileData.derivatives.large ? fileData.derivatives.large.metadata.size : 0
        if (type === 'size') {
          return actualSize ? (actualSize / 1024).toFixed(1) + ' KB' : '0 KB'
        } else if (type === 'storage') {
          return usedSize ? (usedSize / 1024).toFixed(1) + ' KB' : '0 KB'
        }
      }
    },
    getDate(date) {
      return moment(date || new Date()).format("DD-MM-YYYY HH:mm A")
    },
  }
}
</script>