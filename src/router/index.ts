import { getLoginStatus } from '@/servies/api'
import { useUserMessage } from '@/store/UserMessage'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: { name: 'Login' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/main',
    component: () => import('@/pages/Home/MainPage.vue'),
    children: [
      { path: '', name: 'main_parents', redirect: { name: 'Banner' } },
      {
        path: 'my',
        component: () => import('@/pages/Home/Middle/MainCenter/MainCenter.vue'),
        children: [
          { path: '', name: 'Banner', component: () => import('@/components/Home/Banner/index.vue') },
          {
            path: 'daily_recommendation',
            name: 'dailyRecommendation',
            component: () => import('@/pages/Home/Middle/MainCenter/DailyRecommendation.vue'),
          },
        ],
      },
      //当前播放列表
      {
        path: 'currently_playing_list',
        name: 'CurrentlyPlayingList',
        component: () => import('@/pages/Home/Middle/CurrentlyPlayingMusicList.vue'),
      },
      {
        path: 'playlist_details/:id',
        name: 'PlaylistDetails',
        component: () => import('@/pages/Home/Middle/PlaylistDetails.vue'),
      },
      {
        path: 'favorite',
        components: {
          leftNavigation: () => import('@/pages/Home/Middle/Favorite/FavoriteNavigation.vue'),
          default: () => import('@/pages/Home/Middle/Favorite/FavoriteMusic.vue'),
        },
        children: [
          {
            path: '',
            name: 'FavoriteArtist',
            component: () => import('@/pages/Home/Middle/Favorite/FavoriteArtist.vue'),
          },
          {
            path: 'favorite_playlist/:id',
            name: 'FavoritePlaylist',
            component: () => import('@/pages/Home/Middle/PlaylistDetails.vue'),
          },
        ],
      },
      {
        path: 'singer',
        name: 'Singer',
        component: () => import('@/pages/Home/Middle/SingerPage.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

//全局前置守卫，用于判断用户是否登陆
router.beforeEach(async (to) => {
  console.log(to.name)
  const useUserMessageStore = useUserMessage()
  try {
    const res = await getLoginStatus()
    useUserMessageStore.getLoginStatus(res)
    if (to.name === undefined) {
      return { name: 'Login' }
    }
    if (res.data.profile === null && to.name !== 'Login') {
      console.log('重定向到login')
      // 将用户重定向到登录页面
      return { name: 'Login' }
    }
    console.log('放行')
  } catch (error: any) {
    if (error.data === '' && to.name !== 'Login') {
      // 将用户重定向到登录页面
      return { name: 'Login' }
    }
  }
})

//全局解析守卫用于获取theme,并添加到mate供页面使用
router.beforeResolve(async (to) => {
  to.meta.switchThemes = !document.documentElement.classList.contains('dark')
})

export default router
