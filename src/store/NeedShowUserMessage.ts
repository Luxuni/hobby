import { getUserDetailById, getUserPlaylist } from '@/servies/api'
import { API } from '@/servies/api/API'
import { defineStore } from 'pinia'

export const NeedShowUserMessage = defineStore('NeedShowUserMessage', {
  state: () => {
    return {
      needShowUserMessage: {} as API.getUserDetailByIdTypes,
      getNeedShowUserMessageLoading: false,
      needShowUserPlaylist: {} as API.getUserPlaylistTypes,
      getNeedShowUserPlaylistLoading: false,
    }
  },
  actions: {
    //获取用户详情
    async getUserMessageById(uid: number) {
      this.getNeedShowUserMessageLoading = true
      const { data } = await getUserDetailById({ uid })
      this.needShowUserMessage = data
      this.getNeedShowUserMessageLoading = false
    },
    //获取用户创建的歌单
    async getUserPlaylist(uid: number, limit?: number, offset?: number) {
      this.getNeedShowUserPlaylistLoading = true
      const { data } = await getUserPlaylist({ uid, limit, offset })
      this.needShowUserPlaylist = data
      this.getNeedShowUserPlaylistLoading = false
    },
  },
})
