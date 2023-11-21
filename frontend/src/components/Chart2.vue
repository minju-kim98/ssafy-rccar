<script setup>
import { ref } from "vue";
import io from "socket.io-client"
import VueApexCharts from "vue3-apexcharts";
import dayjs from "dayjs";
import { useSensedataStore } from "@/stores/sensedata";

const sensedata = useSensedataStore();

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
socket.on("bbq", (arg) => {
  times.value = arg.map((x) => dayjs(x.time).format("YYYY-MM-DD"));
  pressures.value = arg.map((x) => x.num1);
  temperatures.value = arg.map((x) => x.num2);
  humidities.value = arg.map((x) => x.num3);
  
  sensedata.settemp(temperatures.value[0]);
  sensedata.setpressure(pressures.value[0]);
  sensedata.sethumid(humidities.value[0]);
 
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
      name: "대기압/100",
      data: pressures.value,
    },
  ];
});
</script>

<template>
  <div class="BTS">
    <h1>{{ msg }}</h1>
    <p>
      오구오구 우리 RC카 측정값
    </p>
    <VueApexCharts width="500" type="line" :options="options" :series="series" />
  </div>
</template>

<style scoped>
.BTS {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  font-weight: bold;
  width: 500px;
}


</style>