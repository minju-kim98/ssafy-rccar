<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/utils/axios";

const route = useRoute();
const router = useRouter();

const name = ref("");
const file = ref(null);

function fileChange(e){
  console.log(e.target.files);
  file.value = e.target.files[0];
}
function setURL(file){
  const imageURL = URL.createObjectURL(file);
  return imageURL;
}
async function companionCreate(){
  if(!name.value || !file.value) {
    alert("빈 값이 있습니다. 내용을 전부 작성해주세요.");
    return;
  }
  const result = await api.companionship.create(
    name.value,
    file.value,
  );
  console.log(result);
  // 요청 성공
  if(result.data.success){
    alert(result.data.message);
    router.push({name: "companion"});
  }
  // 요청 실패
  if(!result.data.success){
    alert(result.data.message);
  }
}
async function companionUpdate(){
  const result = await api.companionship.update(
    route.params.id,
    name.value,
  );
  alert(result.data.message);
  router.push({
    name: "companion",
  });
}
async function updateImage(){
  const result = await api.companionship.updateImage(
    route.params.id,
    file.value,
  );
  alert(result.data.message);
  router.push({
    name: "companion",
  });
}

async function getCompanion(){
  const result = await api.companionship.findAll(route.params.id);
  name.value = result.data.name;
  description.value = result.data.description;
}

</script>

<template>
  <div class="form-wrapper">
    <div>
      <span>이름: </span>
      <input type="text" v-model="name">
    </div>
    <div>
      <span>사진: </span>
      <input type="file" @change="fileChange">
    </div>

    <div v-if="route.params.id">
      <button @click="companionUpdate">이름 수정하기</button>
      <button @click="updateImage">사진 수정하기</button>
    </div>
    <div v-else>
      <button @click="companionCreate">사용자 추가하기</button>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 50px;
  border: 1px solid black;
  padding: 20px;
  font-size: 20px;
}

.form-wrapper>*{
  margin: 10px;
}
</style>