<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div style="height: 79vh; overflow: auto">
      <div style="opacity: 0.8;width:10rem; padding: 34px;color: white" class="f-600 fs-20">
        Create Group
      </div>
      <div class="bg-black-5" style="height: 77vh; overflow: auto">
        <el-row>
          <div class="mg-t-20 mg-l-20 tx-16 tx-bolder d-flex text-white">
            Name of the Group
          </div>
          <div class="mg-t-8 mg-l-20 mg-r-30">
            <es-input v-model="group.name" placeholder="New Group" />
          </div>
        </el-row>
        <el-row>
          <div class="mg-t-10 mg-l-20 tx-16 tx-bolder d-flex text-white">
            Select Members
          </div>
          <div class="mg-t-10 mg-l-20 mg-r-30">
            <el-cascader :options="options" :props="data" clearable size="medium" />
          </div>
        </el-row>
      </div>
    </div>
    <div class="mg-t-20">
      <el-col :span="10" :offset="1">
        <es-button text="Cancel" />
      </el-col>
      <el-col :span="10" :offset="1">
        <es-button text="Create" :plain="true" />
      </el-col>
    </div>
  </right-side-bar>
</template>
<script>
import RightSideBar from "@/components/student/knowledge/rightSideBar.vue";
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    activeList: "activeone",
    group: {},
    data: { multiple: true },
    options: [
      {
        value: "Atul Sharma",
        label: 'Atul Sharma',
      },
      {
        value: "Paul Wisley",
        label: 'Paul Wisley',
      },
      {
        value: "Claire holt",
        label: 'Claire holt',
      },
      {
        value: "Phoebe tonkin",
        label: 'Phoebe tonkin',
      },
      {
        value: "Ian somerhalder",
        label: 'Ian somerhalder',
      },
      {
        value: "Mathew jones",
        label: 'Mathew jones',
      },
      {
        value: "Nina dobrev",
        label: 'Nina dobrev',
      },
    ]
  }),
};
</script>
