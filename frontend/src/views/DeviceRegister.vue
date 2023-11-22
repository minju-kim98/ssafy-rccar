<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/utils/axios";

const route = useRoute();
const router = useRouter();

const name = ref("");
const location = ref("");
const newLocation = ref("");
const locations = ref([]);

async function deviceCreate() {
  if (!name.value || !location.value) {
    alert("빈 값이 있습니다. 내용을 전부 작성해주세요.");
    return;
  }
  if (location.value == "addByUsr") {
    location.value = newLocation.value;
  }
  const result = await api.devices.create(name.value, location.value);
  console.log(result);
  // 요청 성공
  if (result.data.success) {
    alert(result.data.message);
    router.push({ name: "homecontrol" });
  }
  // 요청 실패
  if (!result.data.success) {
    alert(result.data.message);
  }
}
async function deviceUpdate() {
  if (location.value == "addByUsr") {
    location.value = newLocation.value;
  }
  const result = await api.devices.updateInfo(route.params.id, name.value, location.value);
  alert(result.data.message);
  router.push({
    name: "homecontrol",
  });
}

async function getLocation() {
  const result = await api.devices.findAll();
  locations.value = result.data;
  locations.value = locations.value.filter((device, idx, arr) => {
    return arr.findIndex((l) => l.location === device.location) === idx;
  });
}

getLocation();
</script>

<template>
  <div class="form-wrapper">
    <div>
      <span>이름: </span>
      <input type="text" v-model="name" />
    </div>
    <div>
      <span>장소: </span>
      <select v-model="location" @change="setLocation">
        <option :key="l.id" :value="l.location" v-for="l in locations">
          {{ l.location }}
        </option>
        <option value="addByUsr">직접 추가</option>
      </select>
      <input type="text" v-if="location == 'addByUsr'" v-model="newLocation" />
    </div>

    <div v-if="route.params.id">
      <button @click="deviceUpdate">디바이스 수정하기</button>
    </div>
    <div v-else>
      <button @click="deviceCreate">디바이스 추가하기</button>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 50px;
  border: 1px solid black;
  padding: 20px;
  font-size: 20px;
}

.form-wrapper > * {
  margin: 10px;
}
</style>
