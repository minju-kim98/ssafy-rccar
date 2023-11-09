<script setup>
import { ref } from "vue";
import koreaMap from "@/components/koreaMap.vue";
import { useLocationStore } from "@/stores/location";

const location = useLocationStore();

const latitude = ref(null);
const longitude = ref(null);
const address = ref("");

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function renderPosition() {
  try {
    const position = await getPosition();
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;

    location.setlat(latitude.value);
    location.setlon(longitude.value);

    getAddress(latitude.value, longitude.value);
  } catch (error) {
    console.log(error);
  }
}

async function getAddress(latitude, longitude) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();

    const method = "GET";
    const api = "AIzaSyBwFL0bOKefj-72LOh7kHxL-hDJayyfe4k";
    const url =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      latitude +
      "," +
      longitude +
      "&key=" +
      api;
    const async = true;

    request.open(method, url, async);
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          const data = JSON.parse(request.responseText);
          data.results[0].address_components.forEach((name, index) => {
            if (index > 0 && (name.long_name.match(/[a-zA-Z ]/))) address.value += name.long_name + ", ";
          });
          address.value = address.value.slice(0, -2);
          resolve(address.value);
        } else {
          reject(request.status);
        }
      }
    };
    request.send();
  });
}

renderPosition();

</script>

<template>
  <div>
    <i class="fa-solid fa-location-dot"></i>
    {{ address }}
    <koreaMap :latitude="latitude" :longitude="longitude" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  font-weight: bold;
  text-align: center;
  width: 500px;
  line-height: 1.5;
}

.fa-location-dot{
  font-size: 45px;
}

</style>
