import { getPlaylistComment, getPlaylistDetail, getPlaylistSong } from '@/servies/api'
import { API } from '@/servies/api/API'
import { defineStore } from 'pinia'
type neededShowPlaylistSongListTypes = {
  name: string
  id: number
  pst: number
  ar: {
    id: number
    name: string
    tns: []
    alias: []
  }[]
  alia: []
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt: null
  cf: string
  al: {
    id: number
    name: string
    picUrl: string
    tns: []
    pic_str: string
    pic: number
  }
  mv: number
  publishTime: number
}[]

export const NeededShowPlaylistMessage = defineStore('NeededShowPlaylistMessage', {
  state: () => {
    return {
      neededShowPlaylistMessage: {} as API.playListTypes,
      getNeededShowPlaylistMessageLoading: false,
      neededShowPlaylistSongsList: [] as neededShowPlaylistSongListTypes,
      getNeededShowPlaylistSongsListLoading: false,
      CommentsMessage: {} as API.getPlaylistCommentTypes,
      getPlaylistCommentsLoading: false,
    }
  },
  actions: {
    async getNeededShowPlaylistMessage(id: number) {
      this.getNeededShowPlaylistMessageLoading = true
      const res = await getPlaylistDetail({ id: id })
      this.neededShowPlaylistMessage = res.data.playlist
      this.getNeededShowPlaylistMessageLoading = false
    },
    async getPlaylistTrack(id: number, limit?: number, offset?: number) {
      this.getNeededShowPlaylistSongsListLoading = true
      const res = await getPlaylistSong({ id: id, limit: limit, offset: offset })
      this.neededShowPlaylistSongsList = res.data.songs
      this.getNeededShowPlaylistSongsListLoading = false
    },
    //根据歌单ID获取歌单评论
    async getPlaylistComment(id: number, limit?: number, offset?: number, before?: number) {
      this.getPlaylistCommentsLoading = true
      const res = await getPlaylistComment({ id, limit, offset, before })
      console.log(res)
      this.CommentsMessage = res.data
      this.getPlaylistCommentsLoading = false
    },
  },
})
