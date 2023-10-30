<script setup>
import { ref } from "vue";
import io from "socket.io-client"
import VueApexCharts from "vue3-apexcharts";
import dayjs from "dayjs";

const times = ref([]);
const temperatures = ref([]);
const humidities = ref([]);
const pressures = ref([]);
const options = ref({});
const series = ref([]);

const props = defineProps({
  msg: String,
})

const socket = io("http://localhost:3000");
socket.on("kfc", (arg) => {
  console.log(arg);
  times.value = arg.map((x) => dayjs(x.time).format("HH:mm:ss"));
  temperatures.value = arg.map((x) => x.num1);
  humidities.value = arg.map((x) => x.num2);
  pressures.value = arg.map((x) => x.num3);
  options.value = {
    xaxis: {
      categories: times.value,
    },
  };
  series.value = [
    {
      name: "온도",
      data: temperatures.value,
    },
    {
      name: "습도",
      data: humidities.value,
    },
    {
      name: "대기압",
      data: pressures.value,
    },
  ];
});
socket.emit("bbq", "is soso");
</script>

<template>
  <div class="BTS">
    <h1>{{ msg }}</h1>
    <p>
      BTS는 샴푸가 아닙니다.
    </p>
    <VueApexCharts width="500" type="line" :options="options" :series="series" />
  </div>
</template>