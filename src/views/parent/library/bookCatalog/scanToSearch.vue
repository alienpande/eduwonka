<template>
  <div>
    <e-container hideHeader pageTitle="Scan to search" :back="$url.LI_CATALOG">
      <el-card shadow="none" v-if="!isBarcode">
        <div style="border: 1px dashed #484b4d; border-radius: 10px">
          <br />
          
          <br />
          <e-svg class="scanner-icon" style="" icon="scanner"></e-svg>
          <br />
          <div
            style="color: #000000cc; width: 27rem; display: block; margin: auto"
            class="fs-20 f-500 text-center"
          >
            Scan the barcode to search the book in Book catalog
          </div>
           <br />
                    <e-button @click="isBarcode=true" css='d-block m-auto'  label="Scan Barcode"></e-button>

          <br /> <br />
          <br />
          <br />
        </div>
      </el-card>
      <barcode-scaner v-else/>
    </e-container>
  </div>
</template>
<script>
import barcodeScaner from '@/components/library/barcodeScaner.vue'
export default {
  components:{barcodeScaner},
  data:()=>({
    isBarcode:false
  })
}
</script>
<style>
.scanner-icon img {
  display: block;
  margin: auto;
}
</style>
