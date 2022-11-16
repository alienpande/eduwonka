<template>
  <div>
    <div class="sub-header">
      <div style="display: flex; justify-content: space-between">
        <div class="d-flex">
          <div style="opacity: 0.8; font-size: 24px; font-weight: 500">
            {{ name }}
          </div>
          <button
            style="
              padding: 3px 8px;
              background: white;
              border-radius: 13px;
              border: 1px solid #bc6c42;
              display: inline-block;
              margin: 5px 15px;
              color: #bc6c42;
              font-size: 13px;
              height: 25px;
            "
            @click="$router.push($url.LN_FORM_SUBMISSION)"
          >
            {{ role }}
          </button>
        </div>
        <div>
          <e-svg @click="$router.push($url.LN_FORM)" icon="Close2"></e-svg>
        </div>
      </div>
      <div
        style="display: flex; justify-content: space-between; margin-top: 10px"
      >
        <div style="display: flex" class="view-no-form">
          <div style="margin-right: 50px">
            <div style="opacity: 0.8; font-weight: 300">Answered</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              {{ Answered }}
            </div>
          </div>
          <div style="margin-right: 50px">
            <div style="opacity: 0.8; font-weight: 300">Time taken</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              {{ timetaken }}
            </div>
          </div>
          <div>
            <div style="opacity: 0.8; font-weight: 300">Submission date</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              {{ submission }}
            </div>
          </div>
        </div>
        <div>
          <e-button class="btn" icon="el-icon-download" label="Download" />
        </div>
      </div>
    </div>

   <div style="height:53vh;padding: 30px;overflow:auto">
        <slot />
   </div>
  </div>
</template>
<script>
export default {
  props: ["name", "role", "Answered", "timetaken", "submission"],
};
</script>
<style scoped>
.sub-header {
  background: white;
  padding: 14px 64px;
}
</style>
