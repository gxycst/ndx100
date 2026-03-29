<template>
  <div>
    <div class="main-tit">{{yearNum}}年-总体走势</div>
    <div id="trendChart_Now" style="width: 100%; height: 420px;"></div>
  </div>
</template>
<script>
import {getYearsForm2000ToNow, ndx100, n225, getChartDataByType} from "../data/utils.js";
import * as echarts from "echarts"
export default {
  props:['type'],
  data() {
    return {
      yearNum: getYearsForm2000ToNow()
    }
  },
  watch:{
    type(){
      this.setAllYears()
    }
  },
  mounted() {
    this.setAllYears()
  },
  methods: {
    setAllYears() {
      let chartData=getChartDataByType(this.type)
      let xDate = chartData.map(it => it['日期'])
      let yEnd = chartData.map(it => it['收盘'])
      let option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderWidth: 0,
          textStyle: { color: '#333' },
          padding: [8, 12],
          shadowBlur: 12,
          shadowColor: 'rgba(0,0,0,0.08)'
        },

        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            type: 'slider',
            start: 0,
            end: 100,

            // ★ 高级美化
            height: 18,
            borderRadius: 8,
            backgroundColor: 'rgba(255, 0, 0, 0.03)',        // 淡淡的红背景
            fillerColor: 'rgba(230, 0, 0, 0.20)',            // 填充红色更亮一点

            // 边框去掉更干净
            borderColor: 'rgba(0,0,0,0)',

            // 手柄美化
            handleIcon:
                'M8.7,11.5v-9c0-0.8-0.7-1.5-1.5-1.5h-0.4c-0.8,0-1.5,0.7-1.5,1.5v9c0,0.8,0.7,1.5,1.5,1.5h0.4c0.8,0,1.5-0.7,1.5-1.5z',

            handleSize: '80%',
            handleStyle: {
              color: 'rgba(230, 0, 0, 0.85)',       // 手柄红色
              shadowBlur: 4,
              shadowColor: 'rgba(230, 0, 0, 0.25)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            },

            // 手柄之间的折线条
            moveHandleStyle: {
              color: 'rgba(230, 0, 0, 0.20)'
            },

            // 标签隐藏（干净）
            textStyle: {
              color: 'rgba(0,0,0,0.4)'
            }
          }
        ],


        xAxis: {
          type: 'category',
          data: xDate,
          boundaryGap: false,
          axisLine: { lineStyle: { color: 'rgba(0,0,0,0.15)' } },
          axisLabel: { color: 'rgba(0,0,0,0.6)' }
        },

        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: 'rgba(0,0,0,0.5)' },
          splitLine: { lineStyle: { color: 'rgba(0,0,0,0.08)' } }
        },
        legend:{
          show:true,
          top:'10px'
        },

        series: [
          {
            name: this.type,
            data: yEnd,
            type: 'line',
            smooth: true,

            // ★ A 股红色（涨表示红）
            lineStyle: {
              width: 1.6,             // 折线变细
              color: '#e60000'        // A 股常用亮红
            },
            symbol: 'circle',
            symbolSize: 3,
            itemStyle: {
              color: '#e60000',
              borderWidth: 0.8,
              borderColor: '#fff'
            },
          },
        ]
      };


      let myChart = echarts.init(document.getElementById('trendChart_Now'));
      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
  },
}
</script>