//和MusicPlayer.ts配合使用，主要用来拉取根据用户播放列表的推荐歌单
import { accordingCurrentPlaylistIdGetRecommendPlaylist } from "@/servies/api";
import { MusicPlayer } from "./MusicPlayer";
import { defineStore, storeToRefs } from "pinia";

type accordingCurrentPlaylistIdGetRecommendPlaylistMessagesTypes = {
  creator: {
    userId: number;
    nickname: string;
  }
  coverImgUrl: string;
  name: string;
  id: string;
}[]
export const PlaylistRelatedInformation = defineStore('PlaylistRelatedInformation', {
  state: () => {
    return {
      accordingCurrentPlaylistIdGetRecommendPlaylistMessages: [] as accordingCurrentPlaylistIdGetRecommendPlaylistMessagesTypes,
      accordingCurrentPlaylistIdGetRecommendPlaylistMessagesLoading: false,
    }
  },
  getters: {

  },
  actions: {
    async FuncCcordingCurrentPlaylistIdGetRecommendPlaylist(id?: number | null) {
      const MusicPlayerStore = MusicPlayer()
      const { currentPlaylistId } = storeToRefs(MusicPlayerStore)
      this.accordingCurrentPlaylistIdGetRecommendPlaylistMessagesLoading = true
      const res = await accordingCurrentPlaylistIdGetRecommendPlaylist({ id: id ?? currentPlaylistId.value })
      this.accordingCurrentPlaylistIdGetRecommendPlaylistMessages = res.data.playlists
      this.accordingCurrentPlaylistIdGetRecommendPlaylistMessagesLoading = false
    }
  }
})