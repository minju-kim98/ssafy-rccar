<script setup>
import { useLocationStore } from "@/stores/location";
import { useSensedataStore } from "@/stores/sensedata";
import axios from "axios";
import { ref } from "vue";

const location = useLocationStore();
const sensedata = useSensedataStore();
const datas = ref({});
const nowpressure = ref();

const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.lat}&lon=${location.lon}&appid=ef8c52362dd11b105f2467fbb3cc6623`;

async function getWeatherData() {
  try {
    const response = await axios.get(url);
    datas.value = response.data.main;
    console.log(response.data.main);
  } catch (e) {
    console.error(e);
  }
}

getWeatherData();

if(sensedata.pressure < 100){
  nowpressure.value = sensedata.pressure * 100;
}
else{
  nowpressure.value = sensedata.pressure;
}


</script>

<template>
  <div>
    <h1>현재 실외 날씨</h1>
    <ul>
      <li>체감온도: {{ datas.feels_like }}도</li>
      <li>실제온도: {{ datas.temp }}도</li>
      <li>습도: {{ datas.humidity }}%</li>
      <li>기압: {{ datas.pressure }}Pa</li>
    </ul>
    <h1>현재 실내 날씨</h1>
    <ul>
      <li>온도: {{ sensedata.temp }}도</li>
      <li>습도: {{ sensedata.humid }}%</li>
      <li>기압: {{ Math.round(nowpressure) }}Pa</li>
    </ul>
  </div>
</template>

<style scoped>
div{
  padding: 20px;
  width: 250px;

}
ul {
  line-height: 2;
  font-size: 18px;
  padding-left: 10px;
}
</style>
