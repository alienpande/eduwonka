<template>
  <div>
    <div v-for="(quick, i) in quickStat" :key="i" style="display:inline-block;margin-right:20px">
      <el-card style="background: #fcdfbd66; width: 25rem" shadow="none">
        <el-row>
          <el-col :span="7">
            <e-svg v-if="!users" style="margin-top: 10px; margin-left: 15px" icon="openBok" />
            <e-svg v-else style="margin-top: 10px; margin-left: 15px" icon='quickstat' />
          </el-col>
          <el-col :span="15" :offset="1">
            <div style="color: #00000099">{{ quick.title }}</div>
            <div style="color: #000000cc; font-size: 24px; font-weight: 600">
              {{ books ? getBookStats(quick.title) : getFinanceStats(quick.title) }}
            </div>
          </el-col>
        </el-row>
        <div>
          <div v-if="quick.stat === 'up'">
            <span class="mg-l-30" style="color: #3dd598">2.3%</span>
            <span><e-svg class="arrow-icon" icon="library/arrow-up"></e-svg></span>
            <span class="mg-l-15" style="color: #00000066; font-size: 12px">than last year</span>
          </div>
          <div v-else>
            <span class="mg-l-30" style="color: #f0142f">2.3%</span>
            <span><e-svg class="arrow-icon" icon="arrow-down"></e-svg></span>
            <span class="mg-l-15" style="color: #00000066; font-size: 12px">than last year</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    quickStat: {
      type: Array,
    },
    books: {
      type: Array,
      default: null
    },
    users: {
      type: Array,
      default: null
    },
    expenses: {
      type: Array,
      default: null
    }
  },
  created() {},
  methods: {
    getFinanceStats(stat) {
      let payable = 0
      let paid = 0
      let due = 0
      let expenses = 0
      for (const user of this.users) {
        for (const item of user.student_fee_line_items) {
          payable += item.default_amount
          paid += item.paid_amount
        }
      }
      for (const expense of this.expenses) {
        expenses += expense.amount
      }
      due = payable - paid
      switch (stat) {
        case 'Total Fee (INR)':
          return payable
        case 'Total Collected (INR)':
          return paid
        case 'Total Due (INR)':
          return due
        case 'Total Expense':
          return expenses
        default:
          return 0
      }
    },
    getBookStats(stat) {
      let total = 0
      let issuedcount = 0
      let overduecount = 0
      for (const book of this.books) {
        total += book.number_of_copies
        if (book.issue_returns.length > 0) {
          for (const item of book.issue_returns) {
            if (item.status === 'ISSUED') {
              issuedcount ++
            } else if (item.status === 'RETURNED' && item.penality) {
              overduecount ++
            }
          }
        }
      }
      if (stat === 'Total Books') {
        return total
      } else if (stat === 'Books Available') {
        return total - issuedcount
      } else if (stat === 'Books Issued') {
        return issuedcount
      } else if (stat === 'Overdue Books') {
        return overduecount
      }
    },
  }
}
</script>
<style>
.arrow-icon {
  display: inline-block;
  margin: -2px 4px;
}
.arrow-icon img {
  display: block;
}
</style>
