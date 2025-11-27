<template>
  <div id="app">
    <div class="test">可以缩小、扩大窗口查看，带边框的元素宽高，字体大小，将在1366px以下窗口固定到一个最小值；将在1920px以上固定到一个最大值，如果窗口宽度在1366~1920区间，则采用vw单位动态适配。
      <div>
        适配规则为：
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mrow>
            <mi>vw</mi>
            <mo>=</mo>
            <mfrac>
              <mrow>
                <mn>px</mn>
              </mrow>
              <mrow>
                <mn>设计稿尺寸</mn>
              </mrow>
            </mfrac>
            <mo>&#x00D7;</mo>
            <mn>100</mn>
          </mrow>
        </math>
        <div>比如以下黑色框，宽高为192px;</div>
        <div class="wh192">
          92px &#x00D7; 192px<br/>
          转换后<br/>
          10vw &#x00D7; 10vw
        </div>

        <div>
          整个屏幕为100vw，1vw为1个视口单位，等于1%，192px在1920下，则为:192/1920*100=10vw；并且用clamp函数限制了最小和最大范围；以下为浏览器编译后源码：
        </div>
        <pre id="output"></pre>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText === '.wh192') {
            document.getElementById('output').textContent = rule.cssText;
          }
        }
      } catch (e) {
        console.error('无法访问样式表:', e);
      }
    }


  }
};
</script>
<style lang="stylus">
html, body, #app {
  width: 100%
  height: 100%
}

#output {
  font-size: 14px;
}

#app {
  display flex
  justify-content center
  align-items center
}

.test {
  width: 600px
  padding 50px
  line-height: 60px;
  font-size: 18px;
  border: 4px solid black;
  border-radius 20px
}

.test1 {
  font-size: 20px;
}

.wh192 {
  width: 192px;
  height: 192px
  background black
  color white
  font-size: 20px;
  border-radius 10px
  display flex
  justify-content center
  align-items center
}

pre {
  background-color: #2d2d2d; /* 深色背景 */
  color: #f8f8f2; /* 字体颜色 */
  padding: 16px;
  border-radius: 8px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 18px;
  white-space pre-wrap
  line-height: 1.5;
  overflow-x: auto; /* 横向滚动条 */
}


</style>
