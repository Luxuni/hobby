//私人定制的信息在这里维护
import { defineStore, storeToRefs } from 'pinia'
import { API } from '@/servies/api/API'
import { getDailyRecommendationList, getUserCollectArtists, getUserPlaylist } from '@/servies/api'
//拿取userid
import { useUserMessage } from '@/store/UserMessage'
const UserMessageStroe = useUserMessage()
const { userMessage } = storeToRefs(UserMessageStroe)
export const MyMusic = defineStore('MyMusic', {
  state: () => {
    return {
      dailyRecommendationList: [] as API.recommend,
      dailyRecommendationListLoading: false,
      userPlaylist: [] as API.userPlaylistType[],
      getUserPlaylistLoading: false,
      userCollectSinger: [] as API.userCollectSingerType[],
      getUserCollectSingerLoading: false,
    }
  },
  getters: {},
  actions: {
    async getDailyRecommendationList() {
      this.dailyRecommendationListLoading = true
      const res = await getDailyRecommendationList()
      this.dailyRecommendationList = res.data.recommend
      this.dailyRecommendationListLoading = false
    },
    //获取用户歌单
    async getUserPlaylist() {
      this.getUserPlaylistLoading = true
      const res = await getUserPlaylist({ uid: userMessage.value?.userId as number })
      console.log(res.data)
      this.userPlaylist = res.data.playlist
      this.getUserPlaylistLoading = false
    },
    //获取用户收藏的歌手
    async getUserCollectSinger() {
      this.getUserCollectSingerLoading = true
      const res = await getUserCollectArtists()
      console.log(res.data)
      this.userCollectSinger = res.data.data
      this.getUserCollectSingerLoading = false
    },
  },
})
