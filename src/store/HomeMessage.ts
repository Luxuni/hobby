import { getBanner, getPersonalized, getTopArtists } from "@/servies/api";
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
type personalizedType = {
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
}[]
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
      personalized: [] as personalizedType,
      personalizedLoading: false,
      topArtists: [] as topArtistsType,
      topArtistsLoading: false,
    }
  },
  getters: {
    _banner: state => state.banner,
    _bannerLoading: state => state.bannerLoading,
    _personalized: state => state.personalized,
    _personalizedLoading: state => state.personalizedLoading,
    _topArtists: state => state.topArtists,
    _topArtistsLoading: state => state.topArtistsLoading,
  },
  actions: {
    async getBanner() {
      this.bannerLoading = true
      await getBanner().then(res => {
        this.banner = res.data.banners
        this.bannerLoading = false
      }).catch(error => {
        this.bannerLoading = false
      })
    },
    async getPersonalized(limit: number, offset?: number) {
      this.personalizedLoading = true
      await getPersonalized({ limit: limit, offset: offset }).then(res => {
        console.log(res);
        this.personalized = res.data.result
        this.personalizedLoading = false
      }).catch(error => {
        this.personalizedLoading = false
      })
    },
    async getTopArtists(limit: number, offset?: number) {
      this.topArtistsLoading = true
      await getTopArtists({ limit: limit, offset: offset }).then(res => {
        console.log(res);
        this.topArtists = res.data.artists
        this.topArtistsLoading = false
      }).catch(error => {
        this.topArtistsLoading = false
      })
    }
  }
})