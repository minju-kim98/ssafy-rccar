import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSensedataStore = defineStore('sensedata', () => {
  const temp = ref()
  const pressure = ref()
  const humid = ref()

  function settemp(num) {
    temp.value = num;
  }

  function setpressure(num) {
    pressure.value = num;
  }

  function sethumid(num) {
    humid.value = num;
  }

  return { temp, pressure, humid, settemp, setpressure, sethumid }
})
