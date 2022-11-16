<template>
  <div style="display: flex;justify-content: space-between;">
    <div style="width: 120px">
      <div style="width: 118px;height: 118px;border-radius: 10px;font-size: 70px;font-weight: bold;background: #eb6f6f9c;text-align: center;color:#e63a32;">
        {{ upcoming }}
      </div>
      <div style="color: #00000099; margin-top: 10px; text-align: center">Not Started</div>
    </div>
     <div style="width: 120px">
      <div style="width: 118px;height: 118px;border-radius: 10px;font-size: 70px;font-weight: bold;background: #ffe4b2;text-align: center;color:#ffa839;">
        {{ ongoing }}
      </div>
      <div style="color: #00000099; margin-top: 10px; text-align: center">On Going</div>
    </div>
     <div style="width: 120px">
      <div style="width: 118px;height: 118px;border-radius: 10px;font-size: 70px;font-weight: bold;background: #b5edc0;text-align: center;color:#50c431;">
        {{ completed }}
      </div>
      <div style="color: #00000099; margin-top: 10px; text-align: center">Completed</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      ongoing: {
        type: Number,
        default: 0
      },
      upcoming: {
        type: Number,
        default: 0
      },
      completed: {
        type: Number,
        default: 0
      }
    }
  }
</script>