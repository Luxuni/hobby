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
      console.log(res)
      this.accordingCurrentPlaylistIdGetRecommendPlaylistMessages = res.data.playlists
      this.accordingCurrentPlaylistIdGetRecommendPlaylistMessagesLoading = false
    }
  }
})