import { defineStore } from "pinia";
import { API } from "@/servies/api/API";
import { getDailyRecommendationList } from "@/servies/api";

export const MyMusic = defineStore('MyMusic', {
  state: () => {
    return {
      dailyRecommendationList: [] as API.recommend,
      dailyRecommendationListLoading: false,
    }
  },
  getters: {
  },
  actions: {
    async getDailyRecommendationList() {
      this.dailyRecommendationListLoading = true;
      const res = await getDailyRecommendationList();
      this.dailyRecommendationList = res.data.recommend;
      this.dailyRecommendationListLoading = false;
    }
  }
})