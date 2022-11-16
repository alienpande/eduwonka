<template>
  <div>
    <el-card shadow="none">
      <br />
      <div style="text-align: center; color: #000000cc" class="fs-20 f-500">
        Scanning Barcode
      </div>
      <br />
      <e-svg icon="barcode" class="barcode" />
      <br />
      <br />
      <div
        style="
          text-align: center;
          color: #00000099;
          font-size: 25px;
          font-weight: 600;
        "
      >
        Scan Result
      </div>
      <br/>
      <book-card
      v-for="(info, i) in bookCard"
      :key="i"
      :bookmark="info.bookmark"
      :status="info.status"
    />
    </el-card>
  </div>
</template>
<script>
export default {
    data:()=>({
         bookCard: [
      {
        status: "Available",
        bookmark: "mark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
      {
        status: "Available",
        bookmark: "mark",
      },

      {
        status: "Available",
        bookmark: "mark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
    ],
    })
}
</script>
<style>
.barcode img {
  display: block;
  margin: auto;
}
</style>
