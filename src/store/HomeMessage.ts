import { getBanner, getPersonalized, getTopArtists, getTopPlaylist } from "@/servies/api";
import { API } from "@/servies/api/API";
import { defineStore } from "pinia";
type bannerType = {
  imageUrl: string;
  targetId: number;
  adid: null;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: string;
  exclusive: boolean;
  encodeId: string;
  scm: string;
}[]
export type personalizedType = {
  id: number;
  type: number;
  name: string;
  copywriter: null;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
}
type topArtistsType = {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: string[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  showPrivateMsg: null;
  isSubed: null;
  accountId: null;
  picId_str: string;
  img1v1Id_str: string;
  transNames: null;
  followed: boolean;
  mvSize: null;
  publishTime: null;
  identifyTag: null;
  alg: null;
  fansCount: number;
}[]
export const HomeMessage = defineStore('HomeMessage', {
  state: () => {
    return {
      banner: [] as bannerType,
      bannerLoading: false,
      personalized: [] as personalizedType[] | API.playListTypes[],
      personalizedLoading: false,
      topArtists: [] as topArtistsType,
      topArtistsLoading: false,
    }
  },
  actions: {
    async getBanner() {
      this.bannerLoading = true
      const res = await getBanner()
      this.banner = res.data.banners
      this.bannerLoading = false
    },
    async getPersonalized(limit: number, offset?: number) {
      this.personalizedLoading = true
      const res = await getPersonalized({ limit: limit, offset: offset })
      this.personalized = res.data.result
      this.personalizedLoading = false
    },
    async getTopArtists(limit: number, offset?: number) {
      this.topArtistsLoading = true
      const res = await getTopArtists({ limit: limit, offset: offset })
      this.topArtists = res.data.artists
      this.topArtistsLoading = false
    },
    async getTopPlaylist(cat?: string, limit?: number, before?: number) {
      const res = await getTopPlaylist({ cat: cat, limit: limit, before: before })
      this.personalized.length = 0;
      (this.personalized as API.playListTypes[]).push(...res.data.playlists)
    }
  }
})