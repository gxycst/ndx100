<template>
  <div>
    <div class="main-tit">二十五年-年度涨幅</div>
    <div id="myTop" style="height: 600px;width: 100%"></div>
  </div>
</template>
<script>
import * as echarts from "echarts"

export default {
  props: ['yearRatios'],
  methods: {
    setOpt() {
      let years = this.yearRatios.map(it => it.year)
      let rawData = this.yearRatios.map(it => it.yearRatio)
      const barData = rawData.map(v => Math.abs(v)); // ⭐ 柱子全部显示绝对值

      return {
        title: {
          x: 'center',
          txtStyle: {
            fontSize: 16,
            color: '#333',
            fontWeight: 'normal',
            textAlign: 'center'
          }
        },
        xAxis: {
          type: 'category',
          data: years
        },
        yAxis: {
          axisLabel: {
            formatter: '{value}%',  // ⭐ y轴显示百分号
            fontSize: 12
          },
          type: 'value'
        },
        tooltip: {
          formatter: function (p) {
            const original = rawData[p.dataIndex];
            const sign = original > 0 ? '+' : '';
            return `${p.name} 年：${sign}${original}%`;
          }
        },
        series: [
          {
            type: 'bar',

            // ⭐ 渲染绝对值作为柱子高度
            data: barData,

            // ⭐ 根据原始值决定颜色
            itemStyle: {
              color: function (params) {
                const original = rawData[params.dataIndex];
                return original >= 0 ? '#d94e5d' : '#3ba272'; // 红 / 绿
              }
            },

            // ⭐ 标签显示绝对值
            label: {
              show: true,
              position: 'top',
              formatter: function (p) {
                return barData[p.dataIndex] + '%'; // 绝对值
              }
            }
          }
        ]
      };

    }
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('myTop'));
    myChart.setOption(this.setOpt());
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  }
}
</script>