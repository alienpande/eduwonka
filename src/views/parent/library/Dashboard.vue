<template>
  <div class="dash">
    <el-row class="header">
      <el-col :span="20" class="title">
        Dashboard <span>Welcome Back!</span>
      </el-col>
    </el-row>
    <div style="padding: 40px; overflow: auto; height: 50vh">
      <el-row>
        <el-col :span="2">
          <div
            style="color: #354052; text-transform: capitalize"
            class="fs-20 f-600"
          >
            Quick stats
          </div>
        </el-col>
        <el-col :span="2" :offset="20">
          <e-dropdown :list="filter" primary />
        </el-col>
      </el-row>
      <br />
      <quick-stat
        v-for="(stat, i) in quiceStat"
        :key="i"
        :title="stat.title"
        :arrowUp="stat.stat"
      />
      <br/>
      <br/>
      <dashboard-chart/>
      <br />
      <br />

      <div v-for="(detail,i) in dashboardDetail" :key="i">

    
      <h4>{{detail.title}}</h4>
      
      <div
        style="
          box-shadow: 0px 1px 4px #15223214;
          border-radius: 6px;
          background: white;
        "
      >
        <div style="padding: 30px;height: 40rem;
    overflow: hidden;">
          <el-row style="display: flex; flex-wrap: wrap; justify-content: center;padding:0 10rem">
            <el-col :span="10" style="color: #000000cc; font-size: 16px">
              {{detail.sub}}
            </el-col>
            <el-col :span="2" :offset="12">
              <e-dropdown :list="filter" primary />
            </el-col>
          </el-row>
          <div style="display: flex; flex-wrap: wrap; justify-content: center">
            <book-card
              v-for="(info, i) in bookCard"
              :key="i"
              :bookmark="info.bookmark"
              :status="info.status"
            />
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            background: #FCDFBD66;
            padding: 12px 0;
          "
        >
          <div style="margin-right:20px;color: #BC6C42;font-weight:500">See More</div>
          <e-svg icon="keyDown"></e-svg>
        </div>
      </div>
      <br/>
      <br/>
        </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import dashboardChart from '@/components/library/dashboardChart.vue'
export default {
  components:{dashboardChart},
  data: () => ({
    filter: [{ text: "Year" }, { text: "Standard 2" }, { text: "Standard 3" }],
    quiceStat: [
      {
        title: "Total Books",
        stat: "up",
      },
      {
        title: "Books Available",
        stat: "up",
      },
      {
        title: "Books Issued",
        stat: "up",
      },
      {
        title: "Overdue Books",
        stat: "down",
      },
    ],
    bookCard: [
      {
        status: "Unavailable",
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
        status: "Unavailable",
        bookmark: "mark",
      },

      {
        status: "Unavailable",
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
    dashboardDetail:[
      {
        title:'Reserved available books',
        sub:'List of reserved books that are now available for issue'
      },
       {
        title:'New books added',
        sub:'List of Books recently added in library'
      },
       {
        title:'Most issued books',
        sub:'List of Books that are issued maximum times'
      },
    ]
  }),
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("94px");
    }, 100);
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
<style>
.dash .header {
  background: #fff;
  padding: 40px 56px 50px 56px;
}
.dash > .header > .title {
  font: normal normal 600 24px/35px Poppins;
  color: #000000;
  opacity: 0.8;
}

.dash > .header > .title > span {
  font-size: 13px;
  margin-top: -0.5rem;
  display: block;
  font-weight: 400;
  color: #00000066;
}
</style>
