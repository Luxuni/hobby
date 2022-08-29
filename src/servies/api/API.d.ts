import { type } from 'os'

export declare namespace API {
  //获取用户的登录状态返回值类型
  type getLoginStatusTypes = {
    code: number
    profile: {
      userId: number
      avatarUrl: string
      nickname: string
    } | null
  }
  //用户登录接口返回值类型
  type loginByPhoneTypes = {
    code: number
    token: string
    profile: {
      userId: number
      avatarUrl: string
      nickname: string
    }
  }
  //热搜列表(简略)返回值类型
  type getHotSearchTypes = {
    code: number
    data: {
      searchWord: string
      score: number
      content: string
      source: number
      iconType: number
      iconUrl: string
      url: string
      alg: string
    }[]
  }
  //默认搜索关键词返回值类型
  type getSearchDefaultTypes = {
    code: number
    message: null
    data: {
      showKeyword: string
      styleKeyword: {
        keyWord: string
        descWord: string
      }
      realkeyword: string
      searchType: number
      action: number
      alg: string
      gap: number
      source: null
      bizQueryInfo: string
      logInfo: null
    }
  }
  //搜索结果相关返回值类型
  type cloudSearchTypes = {
    code: number
    result: {
      searchQcReminder: null
      songs: {
        name: string
        id: number
        ar: {
          id: number
          name: string
        }[]
        al: {
          id: number
          name: string
          picUrl: string
        }[]
      }[]
      songCount: number
    }
  }
  //获取轮播图返回值类型
  type getBannerTypes = {
    code: number
    banners: {
      imageUrl: string
      targetId: number
      adid: null
      targetType: number
      titleColor: string
      typeTitle: string
      url: string
      exclusive: boolean
      encodeId: string
      scm: string
    }[]
  }
  //获取推荐歌单返回值类型
  type getPersonalizedTypes = {
    code: number
    hasTaste: boolean
    category: number
    result: {
      id: number
      type: number
      name: string
      copywriter: null
      picUrl: string
      canDislike: boolean
      trackNumberUpdateTime: number
      playCount: number
      trackCount: number
      highQuality: boolean
    }[]
  }
  //获取热门歌手返回值类型
  type getTopArtistsTypes = {
    code: number
    more: boolean
    artists: {
      name: string
      id: number
      picId: number
      img1v1Id: number
      briefDesc: string
      picUrl: string
      img1v1Url: string
      albumSize: number
      alias: string[]
      trans: string
      musicSize: number
      topicPerson: number
      showPrivateMsg: null
      isSubed: null
      accountId: null
      picId_str: string
      img1v1Id_str: string
      transNames: null
      followed: boolean
      mvSize: null
      publishTime: null
      identifyTag: null
      alg: null
      fansCount: number
    }[]
  }
  //获取歌曲详情接口返回值类型
  type getSongDetailTypes = {
    code: number
    songs: {
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
  }
  //获取歌曲url接口返回值类型
  type getSongUrlTypes = {
    code: number
    data: {
      id: number
      url: string
      br: number
      size: number
      md5: string
      code: number
    }[]
  }
  type playListTypes = {
    id: number
    name: string
    coverImgId: number
    coverImgUrl: string
    coverImgId_str: string
    adType: number
    userId: number
    createTime: number
    status: number
    opRecommend: boolean
    highQuality: boolean
    newImported: boolean
    updateTime: number
    trackCount: number
    specialType: number
    privacy: number
    trackUpdateTime: number
    commentThreadId: string
    playCount: number
    trackNumberUpdateTime: number
    subscribedCount: number
    cloudTrackCount: number
    ordered: boolean
    description: string
    tags: string[]
    updateFrequency: null
    backgroundCoverId: number
    backgroundCoverUrl: null
    titleImage: number
    titleImageUrl: null
    englishTitle: null
    officialPlaylistType: null
    subscribers: {
      defaultAvatar: boolean
      province: number
      authStatus: number
      followed: boolean
      avatarUrl: string
      accountStatus: number
      gender: number
      city: number
      birthday: number
      userId: number
      userType: number
      nickname: string
      signature: string
      description: string
      detailDescription: string
      avatarImgId: number
      backgroundImgId: number
      backgroundUrl: string
      authority: number
      mutual: boolean
      expertTags: null
      experts: null
      djStatus: number
      vipType: number
      remarkName: null
      authenticationTypes: number
      avatarDetail: null
      avatarImgIdStr: string
      anchor: boolean
      backgroundImgIdStr: string
      avatarImgId_str: string
    }[]
    subscribed: boolean
    creator: {
      defaultAvatar: boolean
      province: number
      authStatus: number
      followed: boolean
      avatarUrl: string
      accountStatus: number
      gender: number
      city: number
      birthday: number
      userId: number
      userType: number
      nickname: string
      signature: string
      description: string
      detailDescription: string
      avatarImgId: number
      backgroundImgId: number
      backgroundUrl: string
      authority: number
      mutual: boolean
      expertTags: null
      experts: null
      djStatus: number
      vipType: number
      remarkName: null
      authenticationTypes: number
      avatarDetail: null
      avatarImgIdStr: string
      anchor: boolean
      backgroundImgIdStr: string
      avatarImgId_str: string
    }
    tracks: {
      name: string
      id: number
      pst: number
      t: number
      ar: {
        id: number
        name: string
        tns: []
        alias: []
      }[]
      alia: string
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
      dt: number
      h: {
        br: number
        fid: number
        size: number
        vd: number
        sr: number
      }
      m: {
        br: number
        fid: number
        size: number
        vd: number
        sr: number
      }
      l: {
        br: number
        fid: number
        size: number
        vd: number
        sr: number
      }
      sq: {
        br: number
        fid: number
        size: number
        vd: number
        sr: number
      }
      hr: {
        br: number
        fid: number
        size: number
        vd: number
        sr: number
      }
      a: null
      cd: string
      no: number
      rtUrl: null
      ftype: number
      rtUrls: []
      djId: number
      copyright: number
      s_id: number
      mark: number
      originCoverType: number
      originSongSimpleData: null
      tagPicList: null
      resourceState: boolean
      version: number
      songJumpInfo: null
      entertainmentTags: null
      single: number
      noCopyrightRcmd: null
      mst: number
      cp: number
      mv: number
      rtype: number
      rurl: null
      publishTime: number
    }[]
    videoIds: null
    videos: null
    trackIds: {
      id: number
      v: number
      t: number
      at: number
      alg: null
      uid: number
      rcmdReason: string
      sc: null
    }[]
    shareCount: number
    commentCount: number
    remixVideo: null
    sharedUsers: null
    historySharedUsers: null
    gradeStatus: string
    score: null
    algTags: string[]
  }
  //获取歌单详情接口返回值类型
  type getPlaylistDetailTypes = {
    code: number
    relatedVideos: null
    playlist: playListTypes
  }
  //获取精品歌单接口返回值类型
  type getTopPlaylistTypes = {
    code: number
    more: boolean
    lasttime: number
    total: number
    playlists: playListTypes[]
  }
  //获取每日推荐歌单接口返回类型
  type recommend = {
    id: number
    type: number
    name: string
    copywriter: string
    picUrl: string
    playcount: number
    createTime: number
    creator: {
      remarkName: null
      mutual: boolean
      detailDescription: string
      defaultAvatar: boolean
      expertTags: null
      djStatus: number
      followed: boolean
      backgroundUrl: string
      avatarImgIdStr: string
      avatarImgId: number
      backgroundImgId: number
      backgroundImgIdStr: string
      userId: number
      accountStatus: number
      vipType: number
      province: number
      avatarUrl: string
      authStatus: number
      userType: number
      nickname: string
      gender: number
      birthday: number
      city: number
      description: string
      signature: string
      authority: number
    }
    trackCount: number
    userId: number
    alg: string
  }[]
  type getDailyRecommendationListTypes = {
    code: number
    featureFirst: boolean
    haveRcmdSongs: boolean
    recommend: recommend
  }
  //根据歌单id获取推荐歌单返回值类型
  type AccordingCurrentPlaylistIdGetRecommendPlaylistTypes = {
    code: number
    playlists: {
      creator: {
        userId: number
        nickname: string
      }
      coverImgUrl: string
      name: string
      id: string
    }[]
  }
  //根据歌单id获取歌单评论返回值类型
  type CommentItemType = {
    user: {
      locationInfo: null
      liveInfo: null
      anonym: number
      commonIdentity: null
      userId: number
      avatarDetail: null
      userType: number
      avatarUrl: string
      nickname: string
      authStatus: number
      expertTags: null
      experts: null
      vipType: number
      followed: boolean
      mutual: boolean
      remarkName: null
      vipRights: null
    }
    beReplied: {
      user: {
        locationInfo: null
        liveInfo: null
        anonym: number
        commonIdentity: null
        userId: number
        avatarDetail: null
        userType: number
        avatarUrl: string
        nickname: string
        authStatus: number
        expertTags: null
        experts: null
        vipType: number
        followed: boolean
        mutual: boolean
        remarkName: null
        vipRights: null
      }
      beReplied: []
      pendantData: null
      showFloorComment: null
      status: number
      commentId: number
      content: string
      richContent: null
      contentResource: null
      time: number
      timeStr: string
      needDisplayTime: boolean
      likedCount: number
      expressionUrl: null
      commentLocationType: number
      parentCommentId: number
      decoration: {
        repliedByAuthorCount: number
      }
      repliedMark: null
      grade: null
      userBizLevels: null
      liked: boolean
    }[]
    pendantData: null
    showFloorComment: null
    status: number
    commentId: number
    content: string
    richContent: null
    contentResource: null
    time: number
    timeStr: string
    needDisplayTime: boolean
    likedCount: number
    expressionUrl: null
    commentLocationType: number
    parentCommentId: number
    decoration: {
      repliedByAuthorCount: number
    }
    repliedMark: null
    grade: null
    userBizLevels: null
    liked: boolean
  }
  type getPlaylistCommentTypes = {
    isMusician: boolean
    cnum: number
    userId: number
    topComments: []
    moreHot: boolean
    hotComments: CommentItemType[]
    commentBanner: null
    code: number
    comments: CommentItemType[]
    total: number
    more: boolean
  }

  type userPlaylistType = {
    subscribers: []
    subscribed: boolean
    id: number
    creator: {
      defaultAvatar: boolean
      province: number
      authStatus: number
      followed: boolean
      avatarUrl: string
      accountStatus: number
      gender: number
      city: number
      birthday: number
      userId: number
      userType: number
      nickname: string
      signature: string
      description: string
      detailDescription: string
      avatarImgId: number
      backgroundImgId: number
      backgroundUrl: string
      authority: number
      mutual: boolean
      expertTags: null
      experts: null
      djStatus: number
      vipType: number
      remarkName: null
      authenticationTypes: number
      avatarDetail: null
      anchor: boolean
      avatarImgIdStr: string
      backgroundImgIdStr: string
      avatarImgId_str: string
    }
    artists: null
    tracks: null
    updateFrequency: null
    backgroundCoverId: number
    backgroundCoverUrl: null
    titleImage: number
    titleImageUrl: null
    englishTitle: null
    opRecommend: boolean
    recommendInfo: null
    subscribedCount: number
    cloudTrackCount: number
    userId: number
    totalDuration: number
    coverImgId: number
    privacy: number
    trackUpdateTime: number
    trackCount: number
    updateTime: number
    commentThreadId: string
    coverImgUrl: string
    specialType: number
    anonimous: boolean
    createTime: number
    highQuality: boolean
    newImported: boolean
    trackNumberUpdateTime: number
    playCount: number
    adType: number
    description: null
    tags: []
    ordered: boolean
    status: number
    name: string
    coverImgId_str: string
    sharedUsers: null
    shareStatus: null
    copied: boolean
  }
  type getUserPlaylistTypes = {
    version: string
    more: boolean
    playlist: userPlaylistType[]
    code: number
  }
  //登陆后获取用户信息 , 歌单，收藏，mv, dj 数量返回类型
  type getUserDetailTypes = {
    programCount: number
    djRadioCount: number
    mvCount: number
    artistCount: number
    newProgramCount: number
    createDjRadioCount: number
    createdPlaylistCount: number
    subPlaylistCount: number
    code: number
  }
  //登陆后获取用户收藏的歌手列表返回类型
  type userCollectSingerType = {
    info: string
    id: number
    name: string
    trans: null
    alias: []
    albumSize: number
    mvSize: number
    picId: number
    picUrl: string
    img1v1Url: string
  }
  type getUserCollectArtistsTypes = {
    hasMore: boolean
    count: number
    code: number
    data: userCollectSingerType[]
  }
  //获取歌手分类列表返回类型
  type artist = {
    albumSize: number
    alias: string[]
    briefDesc: string
    fansCount: number
    followed: boolean
    id: number
    img1v1Id: number
    img1v1Id_str: string
    img1v1Url: string
    musicSize: number
    name: string
    picId: number
    picId_str: string
    picUrl: string
    topicPerson: number
    trans: string
  }
  type getArtistListTypes = {
    more: boolean
    code: number
    artists: artist[]
  }
  //根据用户id获取用户详情返回类型
  type getUserDetailByIdTypes = {
    level: number
    listenSongs: number
    userPoint: {
      userId: number
      balance: number
      updateTime: number
      version: number
      status: number
      blockBalance: number
    }
    mobileSign: boolean
    pcSign: boolean
    profile: {
      privacyItemUnlimit: {
        area: boolean
        college: boolean
        age: boolean
        villageAge: boolean
      }
      avatarDetail: null
      vipType: number
      userType: number
      createTime: number
      nickname: string
      mutual: boolean
      followed: boolean
      remarkName: null
      authStatus: number
      detailDescription: ''
      birthday: number
      avatarUrl: string
      experts: {}
      expertTags: null
      djStatus: number
      accountStatus: number
      gender: number
      province: number
      city: number
      defaultAvatar: boolean
      avatarImgId: number
      backgroundImgId: number
      backgroundUrl: string
      backgroundImgIdStr: string
      avatarImgIdStr: string
      description: string
      userId: number
      signature: string
      authority: number
      followeds: number
      follows: number
      blacklist: boolean
      eventCount: number
      allSubscribedCount: number
      playlistBeSubscribedCount: number
      avatarImgId_str: string
      followTime: null
      followMe: boolean
      artistIdentity: []
      cCount: number
      inBlacklist: boolean
      sDJPCount: number
      playlistCount: number
      sCount: number
      newFollows: number
    }
    peopleCanSeeMyPlayRecord: boolean
    bindings: {
      expiresIn: number
      refreshTime: number
      bindingTime: number
      tokenJsonStr: null
      expired: boolean
      url: ''
      userId: number
      id: number
      type: number
    }[]
    adValid: boolean
    code: number
    createTime: number
    createDays: number
    profileVillageInfo: {
      title: string
      imageUrl: string
      targetUrl: string
    }
  }
}
