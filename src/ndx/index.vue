<template>
  <div>
    <Trend/>
    <YearPanel/>
  </div>
</template>
<script>
  import YearPanel from "./components/YearPanel.vue"
  import Trend from "./components/Trend.vue"
  export default {
    components: {YearPanel,Trend},
  }
</script>