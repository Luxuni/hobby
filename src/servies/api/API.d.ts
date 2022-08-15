import { NumericDictionary } from lodash;

declare namespace API {
  //获取用户的登录状态返回值类型
  type getLoginStatusTypes = {
    code: number;
    profile: {
      avatarUrl: string;
      nickname: string;
    } | null;
  }
  //用户登录接口返回值类型
  type loginByPhoneTypes = {
    code: number;
    token: string;
    profile: {
      avatarUrl: string;
      nickname: string;
    }
  }
  //热搜列表(简略)返回值类型
  type getHotSearchTypes = {
    code: number;
    data: {
      searchWord: string;
      score: number;
      content: string;
      source: number;
      iconType: number;
      iconUrl: string;
      url: string;
      alg: string;
    }[]
  }
  //默认搜索关键词返回值类型
  type getSearchDefaultTypes = {
    code: number;
    message: null;
    data: {
      showKeyword: string;
      styleKeyword: {
        keyWord: string;
        descWord: string;
      }
      realkeyword: string;
      searchType: number;
      action: number;
      alg: string;
      gap: number;
      source: null;
      bizQueryInfo: string;
      logInfo: null;
    }
  }
  //搜索结果相关返回值类型
  type cloudSearchTypes = {
    code: number;
    result: {
      searchQcReminder: null;
      songs: {
        name: string;
        id: number;
        ar: {
          id: number;
          name: string;
        }[]
        al: {
          id: number;
          name: string;
          picUrl: string;
        }[]
      }[]
      songCount: number;
    }
  }
  //获取轮播图返回值类型
  type getBannerTypes = {
    code: number;
    banners: {
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
  }
  //获取推荐歌单返回值类型
  type getPersonalizedTypes = {
    code: number;
    hasTaste: boolean;
    category: number;
    result: {
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
  }
  //获取热门歌手返回值类型
  type getTopArtistsTypes = {
    code: number;
    more: boolean;
    artists: {
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
  }
  //获取歌曲详情接口返回值类型
  type getSongDetailTypes = {
    code: number;
    songs: {
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
    }[]
  }
  //获取歌曲url接口返回值类型
  type getSongUrlTypes = {
    code: number;
    data: {
      id: number;
      url: string;
      br: number;
      size: number;
      md5: string;
      code: number;
    }[]
  }
  type playListTypes = {
    id: number;
    name: string;
    coverImgId: number;
    coverImgUrl: string;
    coverImgId_str: string;
    adType: number;
    userId: number;
    createTime: number;
    status: number;
    opRecommend: boolean;
    highQuality: boolean;
    newImported: boolean;
    updateTime: number;
    trackCount: number;
    specialType: number;
    privacy: number;
    trackUpdateTime: number;
    commentThreadId: string;
    playCount: number;
    trackNumberUpdateTime: number;
    subscribedCount: number;
    cloudTrackCount: number;
    ordered: boolean;
    description: string;
    tags: string[];
    updateFrequency: null;
    backgroundCoverId: number;
    backgroundCoverUrl: null;
    titleImage: number;
    titleImageUrl: null;
    englishTitle: null;
    officialPlaylistType: null;
    subscribers: {
      defaultAvatar: boolean;
      province: number;
      authStatus: number;
      followed: boolean;
      avatarUrl: string;
      accountStatus: number;
      gender: number;
      city: number;
      birthday: number;
      userId: number;
      userType: number;
      nickname: string;
      signature: string;
      description: string;
      detailDescription: string;
      avatarImgId: number;
      backgroundImgId: number;
      backgroundUrl: string;
      authority: number;
      mutual: boolean;
      expertTags: null;
      experts: null;
      djStatus: number;
      vipType: number;
      remarkName: null;
      authenticationTypes: number;
      avatarDetail: null;
      avatarImgIdStr: string;
      anchor: boolean;
      backgroundImgIdStr: string;
      avatarImgId_str: string;
    }[]
    subscribed: boolean;
    creator: {
      defaultAvatar: boolean;
      province: number;
      authStatus: number;
      followed: boolean;
      avatarUrl: string;
      accountStatus: number;
      gender: number;
      city: number;
      birthday: number;
      userId: number;
      userType: number;
      nickname: string;
      signature: string;
      description: string;
      detailDescription: string;
      avatarImgId: number;
      backgroundImgId: number;
      backgroundUrl: string;
      authority: number;
      mutual: boolean;
      expertTags: null;
      experts: null;
      djStatus: number;
      vipType: number;
      remarkName: null;
      authenticationTypes: number;
      avatarDetail: null;
      avatarImgIdStr: string;
      anchor: boolean;
      backgroundImgIdStr: string;
      avatarImgId_str: string;
    }
    tracks: {
      name: string;
      id: number;
      pst: number;
      t: number;
      ar: {
        id: number;
        name: string;
        tns: [];
        alias: []
      }[];
      alia: string;
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
      };
      dt: number;
      h: {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number;
      };
      m: {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number;
      };
      l: {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number;
      };
      sq: {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number;
      };
      hr: {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number
      };
      a: null;
      cd: string;
      no: number;
      rtUrl: null;
      ftype: number;
      rtUrls: [];
      djId: number;
      copyright: number;
      s_id: number;
      mark: number;
      originCoverType: number;
      originSongSimpleData: null;
      tagPicList: null;
      resourceState: true;
      version: number;
      songJumpInfo: null;
      entertainmentTags: null;
      single: number;
      noCopyrightRcmd: null;
      mst: number;
      cp: number;
      mv: number;
      rtype: number;
      rurl: null;
      publishTime: number;
    }[];
    videoIds: null;
    videos: null;
    trackIds: {
      id: number;
      v: number;
      t: number;
      at: number;
      alg: null;
      uid: number;
      rcmdReason: string;
      sc: null;
    }[]
    shareCount: number;
    commentCount: number;
    remixVideo: null;
    sharedUsers: null;
    historySharedUsers: null;
    gradeStatus: string;
    score: null;
    algTags: string[];
  }
  //获取歌单详情接口返回值类型
  type getPlaylistDetailTypes = {
    code: number;
    relatedVideos: null;
    playlist: playListTypes
  }
}