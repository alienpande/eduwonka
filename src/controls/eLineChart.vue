<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>

<style>
</style>