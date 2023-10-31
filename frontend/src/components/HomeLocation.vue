<script setup>
  const vueComp = new Vue({

data () {
    return {
        /* Reactive properties */
    };
},

created() {

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Do something with the position
    };

    const error = (err) => {
        console.log(error)
    };

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error);
}

});
</script>

<template>
  <main>

  </main>
</template>

<style scoped>
main{
  margin-left: 60px;
}
</style>