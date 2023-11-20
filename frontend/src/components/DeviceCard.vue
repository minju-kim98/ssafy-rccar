<script setup>
import { defineProps, ref } from "vue";
import { api } from "@/utils/axios";
const props = defineProps({
  deviceProp: Object,
});

const device = ref(props.deviceProp)

const nowState = ref("OFF")

function getState(num) {
  if (num === 0) {
    nowState.value = "OFF";
  } else {
    nowState.value = "ON";
  }
}

init()


async function changeState() {
  const newState = (device.value.state + 1) % 2;
  await api.devices.update(props.deviceProp.id, newState);
  const result = await api.devices.findOne(props.deviceProp.id);
  device.value = result.data;
  getState(device.value.state);
}

async function init(){
  const result = await api.devices.findOne(props.deviceProp.id);
  device.value = result.data;
  getState(device.value.state);
}
</script>

<template>
  <div class="card">
    <div class="nameWrapper">
      {{ device.name }}
    </div>
    <div class="stateWrapper" @click="changeState">
      {{ nowState }}
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: rgb(175, 247, 223);
  border-radius: 1%;
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: space-around;
}
</style>
