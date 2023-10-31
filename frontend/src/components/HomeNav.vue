<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

const changedWidth = ref("60px");

function openNav() {
  changedWidth.value = "200px";
}

function closeNav() {
  changedWidth.value = "60px";
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
      <div>Dashboard</div></RouterLink
    >
    <RouterLink to="/control" class="link-to-web"
      ><i class="fa-solid fa-gamepad"></i>
      <div>Control</div></RouterLink
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
  gap: 25px;
  align-items: baseline;
}

.link-to-web div {
  width: 300px;
  text-align: left;
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

.btn-linkemenu {
  position: fixed;
  left: 40px;
  bottom: 40px;
  width: 60px;
  height: 60px;
  background-image: url(@/images/circle-plus-solid.svg);
  background-color: transparent;
  border: none;
  cursor: pointer;
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
