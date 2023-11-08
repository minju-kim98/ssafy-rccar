<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/utils/axios";

const router = useRouter();

const companionship = ref([]);

async function getCompanionship() {
  const result = await api.companionship.findAll();
  companionship.value = result.data;
  console.log(companionship.value)
}
function setImage(image_src) {
  return `http://localhost:3000/${image_src}`;
}

getCompanionship();

</script>

<template>
  <main>
    <div class="title">
      <i class="fa-solid fa-heart"></i> 호감도
    </div>

    <div class="section-wrapper">
      <section v-for="p in companionship" :key="p.id">
        <article class="profile">
          <img :src="`${setImage(p.photo)}`" alt="profile image" width="200"/>
          <div class="name-container">{{ p.name }}</div>
          <div class="level-container">{{ p.level }}</div>
        </article>
      </section>
    </div>



  </main>
</template>

<style scoped>
main{
  margin-left: 60px;
}
.title{
  font-size: 25pt;
  text-align: center;
  color:rgb(206, 167, 243);
}

.section-wrapper{
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
}

section{
  margin: 20px;
  padding: 30px;
  background-color: rgba(219, 198, 238, 0.733);
  border-radius: 2%;
}

.profile{
  display: flex;
  align-items: center;
  gap: 30px;
}

img{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  transform: translate(50, 50);
  box-shadow: 5px 15px 30px rgba(217, 173, 230, 0.8);
}



</style>
