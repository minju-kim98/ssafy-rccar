import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const lat = ref(35.2055289)
  const lon = ref(126.8115756)

  function setlat(num) {
    lat.value = num;
  }

  function setlon(num) {
    lon.value = num;
  }

  return { lat, lon, setlat, setlon }
})
