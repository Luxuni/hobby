import { getArtistList } from '@/servies/api'
import { API } from '@/servies/api/API'
import { defineStore } from 'pinia'

export const SingerMessage = defineStore('SingerMessage', {
  state: () => {
    return {
      needShowArtist: [] as API.artist[],
      getNeedShowArtistLoading: false,
    }
  },
  actions: {
    async getActiveList(limit?: number, offset?: number, type?: number, area?: number) {
      this.getNeedShowArtistLoading = true
      const res = await getArtistList({ limit, offset, type, area })
      this.needShowArtist = res.data.artists
      this.getNeedShowArtistLoading = false
    },
  },
})
