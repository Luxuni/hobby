import request from "@/servies/request";
import { AxiosPromise } from "axios";
import { API } from "./API";

//手机号密码登陆接口
export const loginByPhone = (params: { phone: string; password: string }): AxiosPromise<API.loginByPhoneTypes> => {
  return request({
    url: 'api/login/cellphone',
    method: 'get',
    params: params
  })
}

//获取用户登陆状态接口
export const getLoginStatus = (): AxiosPromise<API.getLoginStatusTypes> => {
  return request({
    url: 'api/login/status',
    method: 'get'
  })
}

//搜索结果相关接口
export const cloudSearch = (params: { keywords: string; type: number; limit?: number; offset?: number }): AxiosPromise<API.cloudSearchTypes> => {
  return request({
    url: 'api/cloudsearch',
    method: 'get',
    params: params
  })
}

//获取默认搜索关键词接口
export const getSearchDefault = (): AxiosPromise<API.getSearchDefaultTypes> => {
  return request({
    url: 'api/search/default',
    method: 'get'
  })
}

//获取热搜列表(简略)接口
export const getHotSearch = (): AxiosPromise<API.getHotSearchTypes> => {
  return request({
    url: 'api/search/hot/detail',
    method: 'get'
  })
}

//获取轮播图接口
export const getBanner = (): AxiosPromise<API.getBannerTypes> => {
  return request({
    url: 'api/banner',
    method: 'get'
  })
}

//获取推荐歌单接口
export const getPersonalized = (params: { limit: number, offset?: number }): AxiosPromise<API.getPersonalizedTypes> => {
  return request({
    url: 'api/personalized',
    method: 'get',
    params: params
  })
}

//获取热门歌手接口
export const getTopArtists = (params: { limit: number, offset?: number }): AxiosPromise<API.getTopArtistsTypes> => {
  return request({
    url: 'api/top/artists',
    method: 'get',
    params: params
  })
}

//获取歌曲详情接口
export const getSongDetail = (params: { ids: number }): AxiosPromise<API.getSongDetailTypes> => {
  return request({
    url: 'api/song/detail',
    method: 'get',
    params: params
  })
}

//根据歌曲id获取歌曲url接口
export const getSongUrl = (params: { id: number }): AxiosPromise<API.getSongUrlTypes> => {
  return request({
    url: 'api/song/url',
    method: 'get',
    params: params
  })
}

//获取歌单详情接口
export const getPlaylistDetail = (params: { id: number }): AxiosPromise<API.getPlaylistDetailTypes> => {
  return request({
    url: 'api/playlist/detail',
    method: 'get',
    params: params
  })
}

//获取精品歌单接口（首页底部歌单分类）
export const getTopPlaylist = (params: { cat?: string, limit?: number, before?: number }): AxiosPromise<API.getTopPlaylistTypes> => {
  return request({
    url: 'api/top/playlist/highquality/tags',
    method: 'get',
    params: params
  })
}

//获取每日推荐歌单接口（需要登陆）
export const getDailyRecommendationList = (): AxiosPromise<API.getDailyRecommendationListTypes> => {
  return request({
    url: 'api/recommend/resource',
    method: 'get'
  })
}

//根据歌单id获取推荐歌单接口
export const accordingCurrentPlaylistIdGetRecommendPlaylist = (params: { id: number|null }): AxiosPromise<API.AccordingCurrentPlaylistIdGetRecommendPlaylistTypes> => {
  return request({
    url: 'api/related/playlist',
    method: 'get',
    params: params
  })
}

//退出登陆
export const logout = () => {
  return request({
    url: 'api/logout',
    method: 'get'
  })
}