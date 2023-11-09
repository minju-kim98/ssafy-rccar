<script setup>
import ChartBTS from "@/components/ChartBTS.vue";
import HomeLocation from "@/components/HomeLocation.vue";
import HomeCompanion from "@/components/HomeCompanion.vue";
import HomeWeather from "@/components/HomeWeather.vue";
</script>

<template>
  <main>
    <div class="widgets-wrapper">
      <div class="widget loc">
        <HomeLocation />
      </div>
      <div class="widget chart1">
        <ChartBTS msg="온도 / 습도 / 대기압" />
      </div>
      <div class="widget ownership">
        <HomeCompanion />
      </div>
      <div class="widget weather">
        <HomeWeather />
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.widget {
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.widget:hover {
  transform: scale(1.05);
}
</style>
