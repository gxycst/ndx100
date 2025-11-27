<template>
  <div>
    <Top :yearRatios="yearRatios"/>
    <div class="main-tit">二十五年-月份涨跌</div>
    <div class="panel-wrapper">
      <div class="year-panel" v-for="it in yearRatios">
        <div class="year-title">{{ it.year }} 年月度涨跌幅<span :class="valueClass(it.yearRatio)" class="year-ratio">
    （年度：{{ formatValue(it.yearRatio) }}）
  </span></div>
        <div class="month-grid">
          <div class="month-cell" v-for="(si, index) in it.list" :key="index">
            <div class="month-name">{{ si.month }}</div>
            <div class="month-value" :class="valueClass(si.ratio)">
              {{ formatValue(si.ratio) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import {ndx100} from "../data/utils.js";
import Top from "./Top.vue"

export default {
  components: {Top},
  methods: {
    valueClass(v) {
      if (v > 0) return 'pos';
      if (v < 0) return 'neg';
      return 'flat';
    },
    formatValue(v) {
      if (v == null || isNaN(v)) return '-';
      let num = Number(v);
      let sign = num > 0 ? '+' : '';
      return sign + num.toFixed(2) + '%';
    },
  },
  data() {
    return {
      yearRatios: [],
    }
  },
  created() {
// 月份中文
    // 月份中文
    const monthNames = [
      "一月", "二月", "三月", "四月", "五月", "六月",
      "七月", "八月", "九月", "十月", "十一月", "十二月"
    ];

// 输入: data = [{ 日期: "2000-1-3", 涨跌幅: 2.23 }, ...]
    function calcYearMonthRatio(data) {
      const map = {}; // { [year]: { [monthIndex]: sumRatio } }

      data.forEach(item => {
        const dateStr = item["日期"];
        if (!dateStr) return;

        // 手动解析日期
        const parts = dateStr.split("-");
        const year = Number(parts[0]);
        const monthIndex = Number(parts[1]) - 1; // 0-11

        if (isNaN(year) || isNaN(monthIndex)) return;

        const ratio = Number(item["涨跌幅"]) || 0;

        if (!map[year]) map[year] = {};
        if (!map[year][monthIndex]) map[year][monthIndex] = 0;

        // ⭐ 月度 = 每天涨跌幅之和
        map[year][monthIndex] += ratio;
      });

      // ⭐ 输出格式
      const result = [];

      Object.keys(map).forEach(yearStr => {
        const year = Number(yearStr);
        const monthMap = map[year];
        const list = [];
        let yearRatio = 0; // ← ⭐年度涨幅累加

        for (let m = 0; m < 12; m++) {
          const sum = monthMap[m] || 0;
          list.push({
            month: monthNames[m],
            ratio: Number(sum.toFixed(2))
          });

          yearRatio += sum; // ← 累加全年涨幅
        }

        result.push({
          year: String(year),
          yearRatio: Number(yearRatio.toFixed(2)), // ← ⭐年度涨幅
          list
        });
      });

      // 按年份顺序排好
      result.sort((a, b) => Number(a.year) - Number(b.year));

      return result;
    }

    this.yearRatios = calcYearMonthRatio(ndx100).reverse();
    console.log(this.yearRatios)


  }
}
</script>
<style lang="stylus" scoped>

.panel-wrapper {
  margin: 0 auto;
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  gap:20px;
}

.year-panel {
  position: relative;
  width:calc(20% - 20px); /* 两列布局（减去 gap） */
  background: #fff;
  border-radius: 18px;
  padding: 18px 20px 22px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.16),
      0 0 0 1px rgba(148, 163, 184, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  overflow: hidden;
}
/* 手机竖屏：一般是宽度小于 768px */
@media (max-width: 768px) {
  .year-panel {
    width: calc(80% - 20px); /* 两列布局（减去 gap） */
  }
}
/* 顶部彩色条增加层次 */
.year-panel::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #ff7043, #ffb300, #26c6da, #42a5f5);
  opacity: 0.9;
}

.year-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1f2937;
}

.year-title span {
  font-size: 13px;
  font-weight: 400;
  color: #6b7280;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 76px;
  gap: 10px;
}

.month-cell {
  position: relative;
  border-radius: 10px;
  padding: 6px 6px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* 内部渐变 + 微妙高光 */
  background: linear-gradient(145deg, #f9fafb 0, #f3f4f6 50%, #e5e7eb 100%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset,
      0 6px 15px rgba(148, 163, 184, 0.35);
  border: 1px solid rgba(148, 163, 184, 0.35);
  transition: transform 0.16s ease-out,
      box-shadow 0.16s ease-out,
      border-color 0.16s ease-out,
      background 0.16s ease-out;
}

.month-cell::before {
  /* 左上角淡淡的高光块增加层次 */
  content: "";
  position: absolute;
  left: 8px;
  top: 7px;
  width: 18px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.2));
  opacity: 0.9;
  pointer-events: none;
}

.month-cell:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.22);
  border-color: rgba(99, 102, 241, 0.7);
  background: linear-gradient(145deg, #fefefe 0, #f4f4fb 50%, #e7edf8 100%);
}

.month-name {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}

.month-value {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* A 股风格：涨红跌绿 */
.pos {
  color: #d94e5d !important;
}

.neg {
  color: #3ba272 !important;
}

.flat {
  color: #4b5563 !important;
}

.year-title {
  display flex
  align-items center
  justify-content space-between
  font-size 16px
  font-weight 600
  margin-bottom 12px
}


.year-ratio
  font-size 14px
  font-weight 600
  margin-left 6px
</style>