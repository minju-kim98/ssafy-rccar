<script setup>
import ChartBTS from "@/components/ChartBTS.vue";
import Chart2 from "../components/Chart2.vue";
import HomeLocation from "@/components/HomeLocation.vue";
import HomeCompanion from "@/components/HomeCompanion.vue";
import HomeWeather from "@/components/HomeWeather.vue";
import HomeTime from "../components/HomeTime.vue";
</script>

<template>
  <main>
    <div class="widgets-wrapper">
      <div class="widget time">
        <HomeTime />
      </div>
      <div class="widget weather">
        <HomeWeather />
      </div>
      <div class="widget ownership">
        <HomeCompanion />
      </div>
      <div class="widget loc">
        <HomeLocation />
      </div>
      <div class="widget chart1">
        <ChartBTS msg="온도 / 습도 / 대기압" />
      </div>
      <div class="widget chart2">
        <Chart2 msg = "일 별 12시 데이터" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-left: 80px;
  margin-top: 40px;
}
.widgets-wrapper {
  display: grid;
  grid-template-areas:
  "time ownership chart1"
  "weather ownership chart1"
  "loc ownership chart2";
  gap: 20px;
}

.widget {
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.widget:hover {
  transform: scale(1.05);
}

.time {
  grid-area: time;
  margin: 0 auto;
}

.weather {
  grid-area: weather;
  margin: 0 auto;
}

.ownership {
  grid-area: ownership;
  margin: 0 auto;
}

.loc {
  grid-area: loc;
  margin: 0 auto;
}

.chart1 {
  grid-area: chart1;
  margin: 0 auto;
}
.chart2 {
  grid-area: chart2;
  margin: 0 auto;
}
</style>
