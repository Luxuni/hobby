//这个商店是专门给播放器使用的，播放器的状态是在这里维护的
import { defineStore } from 'pinia'
import { getPlaylistDetail, getSongDetail, getSongUrl } from '@/servies/api'
import { API } from '@/servies/api/API'

type realityPlaylistItemTypes = {
  url?: string
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
}
type simplePlaylistItemTypes = {
  url?: string
  id: number
  v: number
  t: number
  at: number
  alg: null
  uid: number
  rcmdReason: string
  sc: null
  name?: string
  ar?: {
    id: number
    name: string
    tns: []
    alias: []
  }[]
  al?: {
    id: number
    name: string
    picUrl: string
    tns: []
    pic_str: string
    pic: number
  }
}
export const MusicPlayer = defineStore('MusicPlayer', {
  state: () => {
    return {
      //播放列表（通用）所有页面要播放的歌曲信息都在这里储存
      playlist: [] as realityPlaylistItemTypes[],
      playlistShowNumber: 10,
      playerFlag: 0,
      currentPlaylistId: null as null | number,
      //歌单详情
      playListMessage: {} as API.playListTypes,
      playListMessageLoading: false,
      getSongUrlLoading: false,
    }
  },
  getters: {
    _offsetPlaylist: (state) => (begin: number, ending: number) => state.playlist.slice(begin, ending),
  },
  actions: {
    //根据歌曲id获取歌曲详细信息(单个id)
    async getSongDetail(ids: number, isSingle: boolean = true) {
      this.playListMessageLoading = true
      //获取歌曲详细信息
      const res = await getSongDetail({ ids: ids })
      //如果为单曲则将请求到的songs数据添加到playlist中
      //此时如果是单曲id，则playlist的item为realityPlaylistItemTypes类型，如果是歌单id，则playlist的item为simplePlaylistItemTypes类型
      if (isSingle) {
        ;(this.playlist as realityPlaylistItemTypes[]).unshift(...res.data.songs)
      } else {
        //如果是歌单id，则将请求到的songs数据需要插入到playlist的正确位置中
        this.playlist.splice(
          this.playlist.findIndex((item) => item.id === ids),
          1,
          ...res.data.songs,
        )
      }
      this.playListMessageLoading = false
    },
    //根据歌单id获取歌单详细信息
    async getPlaylistDetail(id: number) {
      this.currentPlaylistId = id
      this.playListMessageLoading = true
      //获取歌单详细信息
      const res = await getPlaylistDetail({ id: id })
      this.playlistShowNumber = 10
      this.playerFlag = 0
      //保存歌单详细信息
      this.playListMessage = res.data.playlist
      //先将playlist内容清空
      this.playlist.length = 0
      //将歌单信息中的tracksIds（全部歌曲的简略信息）保存到playlist中,此时playlist的item为simplePlaylistItemTypes类型
      ;(this.playlist as unknown as simplePlaylistItemTypes[]).unshift(...res.data.playlist.trackIds)
      //将歌单信息中的tracks（全部歌曲的详细信息）插入到playlist中,此时playlist的item为realityPlaylistItemTypes类型
      ;(this.playlist as realityPlaylistItemTypes[]).splice(
        0,
        res.data.playlist.tracks.length,
        ...(res.data.playlist.tracks as unknown as realityPlaylistItemTypes[]),
      )
      this.playListMessageLoading = false
    },
    //根据歌曲id获取歌曲url
    async getSongUrl(id: number) {
      this.getSongUrlLoading = true
      const res = await getSongUrl({ id: id })
      //将url保存到歌曲信息中,此时playlist的item为realityPlaylistItemTypes类型
      ;(this.playlist as realityPlaylistItemTypes[])[this.playlist.findIndex((item) => item.id === id)].url =
        res.data.data.map((item) => ({ url: item.url, id: item.id }))[
          res.data.data.map((item) => ({ url: item.url, id: item.id })).findIndex((item) => item.id === id)
        ].url
    },
  },
})
