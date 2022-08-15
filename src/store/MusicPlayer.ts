import { defineStore } from "pinia";
import { getPlaylistDetail, getSongDetail, getSongUrl } from '@/servies/api'
import { API } from "@/servies/api/API";

type playlistItemTypes = {
  name: string;
  id: number;
  pst: number;
  ar: {
    id: number;
    name: string;
    tns: [];
    alias: [];
  }[]
  alia: [];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: {
    id: number;
    name: string;
    picUrl: string;
    tns: [];
    pic_str: string;
    pic: number;
  }
  mv: number;
  publishTime: number;
}
export const MusicPlayer = defineStore('MusicPlayer', {
  state: () => {
    return {
      //播放列表（通用）所有页面要播放的歌曲信息都在这里储存
      playlist: [] as playlistItemTypes[],
      //歌单详情
      playListMessage: {} as API.playListTypes,
      playListMessageLoading: false,
    }
  },
  getters: {
    _playlist: state => state.playlist,
    _playListMessage: state => state.playListMessage,
    _playListMessageLoading: state => state.playListMessageLoading,
  },
  actions: {
    //根据歌曲id获取歌曲详细信息(单个id)
    async getSongDetail(ids: number) {
      this.playListMessageLoading = true
      //获取歌曲详细信息
      await getSongDetail({ ids: ids }).then(res => {
        // console.log(res);
        //将请求到的songs数据添加到playlist中
        this.playlist.unshift(...res.data.songs)
        console.log(this.playlist);
      }).catch(err => {
        this.playListMessageLoading = false
      })
    },
    //根据歌单id获取歌单详细信息
    async getPlaylistDetail(id: number) {
      this.playListMessageLoading = true;
      //获取歌单详细信息
      await getPlaylistDetail({ id: id }).then(res => {
        console.log(res.data);
        //保存歌单详细信息
        this.playListMessage = res.data.playlist
        //将歌单信息中的tracks（前20首歌曲的详细信息）保存到playlist中
        this.playlist = res.data.playlist.tracks as unknown as playlistItemTypes[]
      }).catch(err => {
        this.playListMessageLoading = false;
      })
    }
  }
})