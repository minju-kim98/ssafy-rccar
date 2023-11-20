<script setup>
import { ref } from "vue";
import { api } from "@/utils/axios";
import deviceCard from "@/components/DeviceCard.vue";

const devices = ref([]);
const uniqdevices = ref([]);
const deviceList = ref([]);

async function getDevices() {
  const result = await api.devices.findAll();
  devices.value = result.data;
  deviceList.value = devices.value.filter(
    (device) => device.location == devices.value[0].location
  );
  uniqdevices.value = devices.value.filter((device, idx, arr) => {
    return arr.findIndex((d) => d.location === device.location) === idx;
  });
  console.log(uniqdevices.value)
}

getDevices();

function getList(loc) {
  deviceList.value = devices.value.filter((device) => device.location == loc);
}

console.log(devices.value);
</script>

<template>
  <div id="contents">
    <div id="tabMenu">
      <div class="tabContainer">
        <div class="tabWrapper" v-for="device in uniqdevices" :key="device.id">
          <input
            v-if="device.id == devices[0].id"
            type="radio"
            :id="`tab${device.location}`"
            @click="getList(device.location)"
            name="tabs"
            checked
          />
          <input
            v-else
            type="radio"
            :id="`tab${device.location}`"
            @click="getList(device.location)"
            name="tabs"
          />
          <label :for="`tab${device.location}`">{{ device.location }}</label>
        </div>
        <div class="tabWrapper">
          <input type="radio" :id="`tabPlus`" @click="getList()" name="tabs" />
          <label :for="`tabPlus`"
            ><i class="fa-solid fa-circle-plus"></i
          ></label>
        </div>
      </div>
      <div class="tabContent">
        <ul>
          <li v-for="device in deviceList" :key="device.id">
            <deviceCard :deviceProp="device" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin-left: 70px;
}

#contents {
  width: 100%; /* 너비 */
  height: 300px; /* 높이 */
}

/* 탭 메뉴 */
#tabMenu {
  float: left; /* 왼쪽으로 플로팅 */
  width: 600px; /* 너비 */
  height: 100%; /* 높이 */
  margin-top: 10px; /* 탭 메뉴 위쪽에 여백 두기 */
}
#tabMenu input[type="radio"] {
  display: none; /* 라디오 버튼 감춤 */
}
#tabMenu label {
  /* 탭 제목 스타일 */
  display: inline-block; /* 탭들을 가로로 배치 */
  margin: 0 0; /* 마진 */
  padding: 15px 25px; /* 패딩 */
  font-weight: 600; /* 글자 굵기 */
  text-align: center; /* 글자 정렬 */
  color: #aaa; /* 글자 색 */
  border: 1px solid transparent; /* 테두리 */
}
#tabMenu label:hover {
  /* 마우스 오버했을 때 탭 제목 스타일 */
  color: #222;
  cursor: pointer;
}
#tabMenu input:checked + label {
  /* 활성화된 탭 제목 스타일 */
  color: #b00;
  border: 1px solid #ddd;
  background-color: #eee;
}

.tabContainer {
  display: flex;
  flex-direction: row;
}

.tabWrapper i {
  margin: 0 auto;
  font-size: 20px;
}

.tabContent ul {
  list-style: disc;
  margin-left: 30px;
}
.tabContent ul li {
  font-size: 16px;
  line-height: 2.5;
}
</style>
