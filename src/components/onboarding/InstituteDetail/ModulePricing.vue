<template>
  <div class="module-pricing-head">
    <div
      class="module-pricing"
      v-for="(m, index) in pricing"
      :key="index + 1"
    >
      <el-row :gutter="20">
        <el-col :span="window.width > 767 ? 9 : 24">
          <el-row>
            <el-col :span="3"> <e-svg :icon="m.icon" /></el-col>
            <el-col :span="21">
              <h2>
                {{ m.name }}
              </h2>
              <div>
                <span
                  style="
                    text-decoration: line-through;
                    color: #000000;
                    opacity: 0.4;
                    margin-right: 20px;
                  "
                  >{{ m.currency }}{{ m.price }}{{ m.duration }}</span
                >
                <span>
                  {{ m.currency }}{{ m.discountedPrice }}{{ m.duration }}
                </span>
              </div>
              <e-button
                v-if="showRemovePlanButton"
                class="mt30 mb30"
                label="Remove from Plan"
                icon="el-icon-minus"
                plain
              />
              <div style="margin-top: 60px; font-size: 12px">
                {{ m.trailText }}
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col
          :span="window.width > 767 ? 15 : 24"
          class="module-pricing-right-side"
        >
          <el-row :gutter="50">
            <el-col
              :span="shrink ? 24 : 12"
              v-for="(f, j) in m.features"
              :key="j"
              style="margin-bottom: 20px"
            >
              <span
                style="
                  border: 1px solid rgb(252, 223, 189);
                  padding: 0px 5px;
                  margin-right: 10px;
                "
              >
                <div
                  style="
                    background: rgb(252, 223, 189);
                    height: 10px;
                    width: 10px;
                    display: inline-block;
                  "
                >
                  &nbsp;
                </div>
              </span>
              <div
                style="
                  opacity: 0.6;
                  color: #000;
                  margin-top: -30px;
                  margin-left: 40px;
                "
              >
                {{ f }}
              </div></el-col
            >
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import screenSize from '@/mixins/screenSize'
export default {
  props: {
    showRemovePlanButton: {
      type: Boolean,
      default: false,
    },
    shrink: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [screenSize],
  data() {
    return {
      pricing: [],
    };
  },
  created() {
    this.pricing = require("@/api/module-pricing.json");
  },
};
</script>
<style scoped>
.module-pricing {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 15px 35px #0000000d;
  border-radius: 18px;
  margin-bottom: 20px;
  padding: 30px;
}
.module-pricing-head {
  padding: 0px 40px;
}
.module-pricing-head h2 {
  color: #000000;
  opacity: 0.8;
  font-size: 18px;
  margin-top: -2px;
}
.module-pricing-right-side {
  border-left: 1px solid #ececec;
  padding: 20px 45px;
  font-size: 14px;
}
@media only screen and (device-width: 768px) {
  .module-pricing-head h2{
    padding: 0px 0px 0px 15px;
    font-size: 16px;
  }
  .module-pricing{
    margin-bottom: 20px;
    padding: 15px;
  }
  .module-pricing-right-side {
    padding: 20px;
    font-size: 12px;
  }
}
@media only screen and (max-width: 767px){
  .module-pricing-head {
    padding: 0px;
  }
  .module-pricing-right-side {
    border-left: 0px;
    border-top: 1px solid #ececec;
    margin-top: 20px;
  }
}
</style>