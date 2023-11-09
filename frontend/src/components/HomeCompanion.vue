<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/utils/axios";

const router = useRouter();

const companionship = ref([]);

async function getCompanionship() {
  const result = await api.companionship.findAll();
  companionship.value = result.data;
  console.log(companionship.value);
}
function setImage(image_src) {
  return `http://localhost:3000/${image_src}`;
}

getCompanionship();
</script>

<template>
  <div class="ownership">
    <h1>인증된 사용자</h1>
    <div v-for="p in companionship" :key="p.id">
      <div class="profile">
        <img :src="`${setImage(p.photo)}`" alt="profile image" width="200" />
        <div class="name-container">{{ p.name }}</div>
        <div class="level-container">
          Level: {{ Math.floor(p.level / 100) + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ownership{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.profile {
  background-color: rgb(241, 223, 248);
  border-radius: 1%;
  padding: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
}

img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  transform: translate(50, 50);
  box-shadow: 5px 15px 30px rgba(217, 173, 230, 0.8);
}

.name-container {
  font-size: 24px;
}
</style>
