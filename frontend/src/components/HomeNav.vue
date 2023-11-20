<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

const changedWidth = ref("60px");
const showText = ref(false)

function openNav() {
  changedWidth.value = "180px";
  showText.value = true;
}

function closeNav() {
  changedWidth.value = "60px";
  showText.value = false;
}
</script>

<template>
  <div
    id="mySidenav"
    class="sidenav"
    :style="{ width: changedWidth }"
    @mouseover="openNav()"
    @mouseleave="closeNav()"
  >
    <RouterLink to="/" class="link-to-web"
      ><i class="fa-solid fa-chart-line"></i>
      <div v-if=showText>Dashboard</div></RouterLink
    >

    <RouterLink to="/companion" class="link-to-web"
      ><i class="fa-solid fa-heart"></i>
      <div v-if=showText>Companion Level</div></RouterLink
    >

    <RouterLink to="/control" class="link-to-web"
      ><i class="fa-solid fa-gamepad"></i>
      <div v-if=showText>Control</div></RouterLink
    >

    <RouterLink to="/music" class="link-to-web"
      ><i class="fa-solid fa-music"></i>
      <div v-if=showText>music</div></RouterLink
    >

    <RouterLink to="/homecontrol" class="link-to-web"
      ><i class="fa-solid fa-house-signal"></i>
      <div v-if=showText>home control</div></RouterLink
    >
  </div>
</template>

<style scoped>
.sidenav {
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.link-to-web {
  padding: 8px 8px 8px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  transition: 0.3s;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: baseline;
}

.link-to-web i {
  width: 20px;
  text-align: center;
}

.link-to-web div {
  width: 300px;
  text-align: left;
  font-size: 15px;
  line-height: 1.5;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}


@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
