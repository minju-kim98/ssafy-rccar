<script setup>
import { ref } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { api } from "@/utils/axios";

const router = useRouter();
const route = useRoute();

const companionship = ref([]);

async function getCompanionship() {
  const result = await api.companionship.findAll();
  companionship.value = result.data;
  console.log(companionship.value);
}
function setImage(image_src) {
  return `http://15.164.171.167:3000/${image_src}`;
}

async function deleteCompanion(id) {
  const confirmResult = confirm("삭제하시겠습니까?");
  if (confirmResult) {
    const result = await api.companionship.delete(id);
    alert(result.data.message);
    router.push({ name: "companion" });
    router.go();
  }
}

function moveRegister(id) {
  router.push({
    name: "companion-update",
    params: { id: id },
  });
}

getCompanionship();
</script>

<template>
  <main>
    <div class="title"><i class="fa-solid fa-heart"></i> 호감도</div>

    <div class="section-wrapper">
      <section v-for="p in companionship" :key="p.id">
        <article class="profile">
          <img :src="`${setImage(p.photo)}`" alt="profile image" width="200" />
          <div class="name-container">{{ p.name }}</div>
          <div class="progress-container">
            <progress
              id="progress"
              :value="`${p.level % 100}`"
              min="0"
              max="100"
            ></progress>
          </div>
          <div class="level-container">
            Level: {{ Math.floor(p.level / 100) + 1 }}
          </div>
          <div class="delete">
            <i class="fa-solid fa-pen" @click="moveRegister(p.id)"></i>
            <i
              class="fa-regular fa-trash-can"
              @click="deleteCompanion(p.id)"
            ></i>
          </div>
        </article>
      </section>
      <RouterLink :to="{ name: 'companion-register' }">
        <article class="profile">
          <i class="fa-solid fa-circle-plus"></i>
        </article>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-left: 60px;
}
.title {
  font-size: 30pt;
  text-align: center;
  color: rgb(206, 167, 243);
}

.section-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.profile {
  background-color: rgba(232, 219, 243, 0.733);
  border-radius: 1%;
  padding: 30px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  text-decoration: none;
  color: black;
}

img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  transform: translate(50, 50);
  box-shadow: 5px 15px 30px rgba(217, 173, 230, 0.8);
}

.name-container {
  font-size: 24px;
}

#progress {
  appearance: none;
  width: 500px;
}
#progress::-webkit-progress-bar {
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: inset 3px 3px 10px #ccc;
}
#progress::-webkit-progress-value {
  border-radius: 10px;
  background: #701d97;
  background: -webkit-linear-gradient(to right, #dca5f5, #701d97);
  background: linear-gradient(to right, #dca5f5, #701d97);
}

.fa-circle-plus {
  font-size: 50px;
}

.delete {
  font-size: 25px;
  color: red;
  padding-left: 50px;
  letter-spacing: 20px;
}
</style>
