<!-- <script setup>
import ChartBTS from "@/components/ChartBTS.vue";
</script> -->

<!-- <ChartBTS msg="I'm B.T.S." /> -->

<script setup>
import { RouterView } from "vue-router";
import HomeNav from "@/components/HomeNav.vue";

</script>

<template>
  <header>
    
  </header>

  <main>
    <RouterView />

    <div><HomeNav /></div>
  </main>
  <footer>
    <p>&copy; 2023 Minju Kim. All rights reserved.</p>
    <p>
      Contact:
      <a
        href="mailto:minju.kim98@kakao.com"
        style="text-decoration: none; color: black"
        >minju.kim98@kakao.com</a
      >
    </p>
  </footer>
</template>

<style scoped>

footer {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 20px 0 0 0;
  text-align: center;
}
</style>

