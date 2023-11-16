<script setup>
import { useRouter } from "vue-router";
import { api } from "@/utils/axios";

const router = useRouter();

async function insertCommand(cmd_string, arg_string){
  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;
  const todayDay = new Date().getDate();
  const todayHour = new Date().getHours();
  const todayMinute = new Date().getMinutes();
  const todaySecond = new Date().getSeconds();

  const time = todayYear + "-" + todayMonth + "-" + todayDay + " " + todayHour + ":" + todayMinute + ":" + todaySecond;

  const result = await api.command.create(
    time,
    cmd_string,
    arg_string,
  );
  console.log(result);
  if(result.data.success){
    router.push({name: "control"});
  }
  // 요청 실패
  if(!result.data.success){
    alert(result.data.message);
  }
}

function forward(){
  insertCommand("go", "0");
}

function back(){
  insertCommand("back", "0");
}

function mid(){
  insertCommand("mid", "0");
}

function left(){
  insertCommand("left", "0");
}

function right(){
  insertCommand("right", "0");
}

function stop(){
  insertCommand("stop", "0");
}
</script>

<template>
  <main>
    <div class="main-control">
      <div class="control-pad">
        <div class="control-key forward" @click="forward">forward</div>
        <div class="control-key back" @click="back">back</div>
        <div class="control-key mid" @click="mid">mid</div>
        <div class="control-key left" @click="left">left</div>
        <div class="control-key right" @click="right">right</div>
      </div>
      <div class="switch-container">
        <div class="switch stop" @click="stop">stop</div>
      </div>
    </div>

    <div class="streaming-video">
      <iframe src="http://192.168.110.141:8000/index.html" height="500" width="660"></iframe>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-left: 60px;
  margin-top: 70px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 100px;
}

.main-control {
  display: flex;
  gap: 100px;
  align-items: center;
}

.control-pad{
  display: grid;
  grid-template-columns: 100px 100px 100px;
  height: 300px;
  line-height: 6;
  grid-template-areas:
    ". forward ."
    "left mid right"
    ". back .";
}

.switch-container{
  line-height: 6;
  
}

.control-key,
.switch{
  border: 1px solid black;
  background-color: rgb(194, 194, 194);
  text-align: center;
}

.switch{
  width: 100px;
  height: 100px;
  margin: 10px;
}

.forward {
  grid-area: forward;
}

.left {
  grid-area: left;
}

.mid {
  grid-area: mid;
}

.right {
  grid-area: right;
}

.back {
  grid-area: back;
}
</style>
