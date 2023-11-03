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
  return `http://3.36.75.253:3000/${image_src}`;
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
        <img :src="`${setImage(p.photo)}`" alt="profile image" />

        <h1>{{ p.name }}</h1>
        <h2>{{ p.companion }}</h2>
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




</style>
