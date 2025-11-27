<template>
  <div id="app">
   <h1 style="text-align: center">纳斯达克100指数</h1>
    <ndx/>
    <footer class="page-footer">
      <span class="footer-line"></span>
      <p class="footer-text">
        “Desire is the oracle of our fate.” — Friedrich Schiller
      </p>
    </footer>
  </div>
</template>
<script>
import ndx from './ndx/index.vue'

export default {
  name: "App",
  components: {ndx}
}
</script>
<style lang="stylus">
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  margin: 0;
  padding: 24px;
  background: radial-gradient(circle at top left, #fbe9e7 0, transparent 55%), radial-gradient(circle at bottom right, #e3f2fd 0, transparent 55%), linear-gradient(135deg, #f5f5f5 0, #e9edf3 100%);
}

h1 ,.main-tit{
  font-weight: 700;
  margin: 0 0 20px;
  font-size: 14px;
  letter-spacing: 0.8px;
  color: #e60000; /* A 股红色主题不变 */

}
.main-tit {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;

  display: flex;
  align-items: center;
  gap: 10px;

  color: #e60000; /* A 股红色主题不变 */

  /* 为了更高级的立体感 */
  text-shadow: 0 1px 2px rgba(0,0,0,0.06);
}

/* 左侧竖条 —— A 股红 */
.main-tit::before {
  content: "";
  width: 4px;
  height: 20px;
  background: #e60000; /* A 股红涨幅色 */
  border-radius: 2px;
  display: inline-block;

  /* 高级一点的小光泽 */
  box-shadow: 0 0 6px rgba(230, 0, 0, 0.25);
}
.page-footer {
  margin-top: 40px;

  text-align: center;

  /* 与你的背景融合的雾感浅灰透明底 */
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(6px);



  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}



/* 引言文本 */
.footer-text {
  font-size: 14px;
  letter-spacing: 0.3px;
  color: rgba(0, 0, 0, 0.62);

  /* 微弱阴影，让字更立体更精致 */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);

  font-style: italic;
}


/* 整体滚动条宽度 */
body::-webkit-scrollbar {
  width: 8px;
}

/* 滚动条槽（背景轨道） */
body::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05); /* 浅灰透明轨道 */
  border-radius: 10px;
}

/* 滚动条滑块（Thumb） */
body::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #e60000, #ff4d4d); /* A股红渐变 */
  border-radius: 10px;

  /* 轻光泽，专业感 */
  box-shadow: 0 0 4px rgba(230, 0, 0, 0.35);
}

/* 滑块 hover 效果（更亮一点） */
body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #ff1a1a, #ff6666);
}


</style>