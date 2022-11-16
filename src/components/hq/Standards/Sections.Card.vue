<template>
  <el-col :span="span" :offset="offset">
    <p class="label ml20" v-html="title"></p>
    <el-row
      :gutter="20"
      style="height: 80px; padding: 30px 15px 30px 15px; cursor: pointer"
    >
      <draggable
        class="list-group" group="sections" ghostClass="ghost"
        :list="standards" :animation="0" @change="log"
      >
        <transition-group type="transition" name="flip-list">
          <el-col
            :span="24" v-for="(item, index) in standards" v-bind:item="item"
            v-bind:key="index + 1" class="list-group-item hq-sequencing-card"
          >
            <div
              class="sm-height-auto"
              style="
                height: 150px;
                box-shadow: 0px 13px 21px #0000000d;
                background: #fff;
                border-radius: 10px;
                width: 100%;
              "
              :class="border ? 'border1' : ''"
            >
              <el-row style="height: 150px" class="sm-height-auto standard-card">
                <el-col
                  class="sm-height-auto"
                  :span="4"
                  style="
                    background: #fcdfbd66;
                    height: 150px;
                    text-align: center;
                    padding-top: 60px;
                    border-radius: 10px 0px 0px 10px;
                    width: 105px
                  "
                >
                  {{ item.name }}
                </el-col>
                <el-col :span="10">
                  <table style="width: 50%; padding: 15px 0px">
                    <tr>
                      <td>Section</td>
                    </tr>
                    <tr
                      v-for="(i, index) in item.standard_sections"
                      v-bind:item="i"
                      v-bind:key="index + 1"
                    >
                      <td style="text-transform: uppercase;font-weight: bold;font-size:large">{{ i.name }}</td>
                    </tr>
                  </table>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </transition-group>
      </draggable>
    </el-row>
  </el-col>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: { draggable },
  props: {
    border: {
      type: Boolean,
      default: false,
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    standards: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
  },
};
</script>
