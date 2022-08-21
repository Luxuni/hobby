const homeNavigation = {
  findMusic: [
    { content: '首页', key: 'home', path: 'Banner' },
    { content: '专辑', key: 'album', path: '' },//album
    { content: '歌手', key: 'singer', path: '' },//singer
    { content: '播客', key: 'radio', path: '' },//radio
  ],
  myMusic: [
    { content: '本地与下载', key: 'local', path: '' },//local
    { content: '我喜欢的音乐', key: 'like', path: '' },//like
    { content: '创建歌单', key: 'create', path: '' },//create
  ],
  other: [
    { content: '每日推荐', key: 'recommend', path: 'dailyRecommendation' },
    { content: '情绪助推器', key: 'emotion', path: '' },//emotion
  ]
}

export default [
  {
    url: "/mock/navigation", // 模拟登录的链接
    method: "get", // 请求方式
    timeout: 500, // 超时时间
    statusCode: 200, // 返回的http状态码
    response: { // 返回的结果集
      code: 200,
      message: "success",
      homeNavigation: homeNavigation,
    },
  },
]