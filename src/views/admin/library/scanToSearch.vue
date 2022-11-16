<template>
  <div>
    <e-container class="library-scan-to-search"
      hideHeader
      pageTitle="Scan to search"
      :back="$url.LI_ISSUE_RETURN"
    >
      <el-card shadow="none">
        <div style="border: 1px dashed #484b4d; border-radius: 10px">
            <br/> <br/> <br/> <br/>
          <e-svg class="scanner-icon" style="" icon="scanner"></e-svg>
           <br/>
           <div style="color: #000000CC;width:17rem;display:block;margin:auto" class="fs-20 f-500 text-center scan-to-search-width">Scan the barcode to Return book</div>
            <br/> <br/> <br/> <br/>
        </div>
      </el-card>
    </e-container>
  </div>
</template>
<style >
.scanner-icon img {
  display: block;
  margin: auto;
}
</style>
