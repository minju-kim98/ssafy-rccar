<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/utils/axios";

const router = useRouter();

const props = defineProps({
  deviceProp: Object,
});

const device = ref(props.deviceProp);

const nowState = ref("OFF");

function getState(num) {
  if (num === 0) {
    nowState.value = "OFF";
  } else {
    nowState.value = "ON";
  }
}

init();

async function changeState() {
  const newState = (device.value.state + 1) % 2;
  await api.devices.updateState(props.deviceProp.id, newState);
  const result = await api.devices.findOne(props.deviceProp.id);
  device.value = result.data;
  getState(device.value.state);
}

async function init() {
  const result = await api.devices.findOne(props.deviceProp.id);
  device.value = result.data;
  getState(device.value.state);
}

async function deleteDevice(id) {
  const confirmResult = confirm("삭제하시겠습니까?");
  if (confirmResult) {
    const result = await api.devices.delete(device.value.id);
    alert(result.data.message);
    router.push({ name: "homecontrol" });
    router.go();
  }
}

function changeDevice() {
  router.push({
    name: "device-update",
    params: { id: device.value.id },
  });
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
    <div class="delete">
      <i class="fa-solid fa-pen" @click="changeDevice"></i>
      <i class="fa-regular fa-trash-can" @click="deleteDevice"></i>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: rgb(175, 247, 223);
  border-radius: 1%;
  padding: 10px 0px 10px 10px;
  margin: 10px;
  display: flex;
  justify-content: space-around;
}

.delete {
  font-size: 15px;
  color: red;
  letter-spacing: 20px;
}
</style>
