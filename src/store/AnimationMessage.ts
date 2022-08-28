import { defineStore } from "pinia";

export const AnimationMessage = defineStore('AnimationMessage', {
  state: () => {
    return {
      playerImageLocation: {
        x: 0,
        y: 0,
      },
    }
  },
  getters: {
  },
  actions: {
  }
})