<script setup>
import { ref } from "vue";

const timer = ref("")
const nowHour = ref(0)
const nowMinute = ref(0)
const nowSecond = ref(0)

function setTime() {
  setInterval(() => {
    const date = new Date();
    const hours = ("00" + date.getHours()).slice(-2);
    const minutes = ("00" + date.getMinutes()).slice(-2);
    const seconds = ("00" + date.getSeconds()).slice(-2);
    timer.value = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

setTime();
</script>

<template>
<div>{{ timer }}</div>
</template>

<style scoped>
*{
  font-family: "digital";
}

div{
  font-size: 100px;
  width: 400px;
  text-align: center;
}
</style>
