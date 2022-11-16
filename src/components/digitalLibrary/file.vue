<template>
  <div style="display: inline-block; margin: 10px; border-radius: 10px" @click="$emit('handleOption').getPosition($event)">
    <div :class="{ 'file-section': icon === 'play' }" style="background: white;width: 12rem;width: 11.2rem;padding: 10px 0px 2px 10px;border-radius: 10px;cursor: pointer;box-shadow: 0 3px 15px #0000000d;position: relative;">
      <div v-if="showOption" style="position: absolute;height: 306px;width: 247px;border-radius: 10px;box-shadow: 0px 13px 21px #00000033;z-index: 1;background: white;top: -22px;right: -205px;" :class="{'changeSide' : rightGo}">
        <div style="color: #000000cc; font-size: 16px; padding: 31px 0 0 35px">
          Open File
        </div>
        <div class="action-text" @click="$emit('properties'),changeIndex">
          View File Properties
        </div>
        <div class="action-text" @click="$router.push($url.DL_SHEARE_FILE + '/' + file.id)">
          Share File
        </div>
        <div class="action-text" @click="$emit('bookmark')">Bookmark</div>
        <div class="action-text" @click="$emit('duplicate')">Duplicate</div>
        <hr style="opacity: 0.3" />
        <div class="action-text" @click="$emit('rename')">Rename</div>
        <div class="action-text">Download</div>
        <div class="action-text" @click="$emit('delete')">Delete</div>
      </div>
      <div v-if="file.attachment" class="hide-upload">
        <eduwonka-file-uploader :accepted-types="'image/png, image/jpeg, image/jpg application/pdf, .doc, .docx, application/msword'" :source-file-list="attachments" @value="v => attachments = v" />
      </div>
      <div v-else>
        <img class="file-img" style="padding: 0px 0px 4px 0px" src="@/assets/images/file-img.png" alt="" />
      </div>
      <div style="display: flex; padding: 10px 0">
        <div style="margin: 0 10px 0 5px">
          <e-svg v-if="icon === 'doc'" icon="google-docs" />
          <e-svg v-if="icon === 'file'" icon="file-icon" />
          <!-- <e-svg v-if="icon === 'play'" icon="play" /> -->
          <e-svg v-if="icon === 'excel'" icon="excel" />
          <!-- <e-svg v-if="icon === 'music'" icon="music" /> -->
          <e-svg v-if="icon === 'ppt'" icon="ppt" />
          <!-- <e-svg v-if="icon === 'img'" icon="img" /> -->
        </div>
        <div style="color: #00000099; font-size: 12px">{{ file.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import EduwonkaFileUploader from '@/components/EduwonkaUploader/multifile.vue'
export default {
  components: { EduwonkaFileUploader },
  props: {
    icon: {
      type: String,
      default: 'file'
    },
    showOption: {
      type: Boolean,
      default: false
    },
    file: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    attachments: [],
    base_url: process.env.VUE_APP_BASE_API,
    showAction: false,
    rightGo: false,
  }),
  created() {
    this.attachments.push(this.file.attachment)
    console.log(this.attachments)
  },
  methods: {
    getPosition(i) {
     console.log(i.screenX);
      if (i.clientX >= 1300) {
        this.rightGo = true;
      } else {
        this.rightGo = false;
      }
      
    },
  },
  
};
</script>
<style scoped>
.file-img {
  display: block;
}
.img-hover {
  display: none;
}
.file-section:hover .file-img {
  display: none !important;
}
.file-section:hover .img-hover {
  display: block !important;
}
.action-text {
  color: #000000cc;
  font-size: 16px;
  padding: 5px 0 0 35px;
}
.changeSide{
  right: 125px !important;
}
</style>
