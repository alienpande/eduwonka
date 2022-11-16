<template>
  <div>
    <e-container
      pageTitle="Quick test"
      btnIcon="el-icon-plus"
      btnText="Add Lesson"
      @btnClick="$router.push($url.LN_LESSON_CREATE)"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active">
          <div style="color: #222222; font-weight: 500; font-size: 20px">
            8 lessons
          </div>

          <div
            style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              width: 59rem;
              margin-top: 20px;
            "
          >
            <lesson-card
              v-for="i in 4"
              :key="i"
              title="Lorem ipsum dolor sit amet consectetur"
              Alloted="3 classes"
              Takenby="Stephen Rodrigus"
              topic="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcoming"> </el-tab-pane>
        <el-tab-pane label="Completed" name="Completed"> </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>
<script>
import lessonCard from "@/components/learn/lesson/lessonCard.vue";
export default {
  components: { lessonCard },
  data: () => ({
    activeName: "active",
  }),
};
</script>
