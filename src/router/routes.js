const routes = [
  {
    path: '/',
    component: () => import('layouts/BasicLayout.vue'),
    meta: {
      guestOnly: true
    },
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/',
        name: 'login-sso',
        component: () => import('pages/LoginKeycloak.vue')
      }
    ]
  },
  {
    path: '/unauthorized',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '/',
        name: 'unauthorized',
        component: () => import('pages/Unauthorized.vue')
      }
    ]
  },
  {
    path: '/helpdesk-offline',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '/',
        name: 'helpdesk-offline',
        component: () => import('pages/SmartReport.vue')
      }
    ]
  },
  {
    path: '/channel/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      // {
      //   path: '',
      //   name: 'admin-home',
      //   component: () => import('pages/Channel.vue')
      // },
      {
        // path: ':id/:title',
        path: ':id',
        name: 'channel-detail',
        component: () => import('pages/Channel.vue')
      },
      {
        // path: ':id/:title',
        path: ':id',
        name: 'channel-detail-edit-artikel',
        component: () => import('pages/Channel.vue')
      },
      {
        // path: ':id/:title',
        path: ':id/:post_id',
        name: 'channel-detail-post-detail',
        component: () => import('pages/Channel.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/analytics/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'analytics',
        component: () => import('pages/Analytics.vue'),
        children: [
          {
            path: 'audience',
            name: 'analytics-audience',
            component: () => import('pages/AnalyticsAudience.vue')
          },
          {
            path: 'kmap',
            name: 'analytics-kmap',
            component: () => import('pages/AnalyticsKmap.vue')
          },
          {
            path: 'channel',
            name: 'analytics-channel',
            component: () => import('pages/AnalyticsChannel.vue')
          },
          {
            path: 'content',
            name: 'analytics-content',
            component: () => import('pages/AnalyticsContent.vue')
          }
        ]
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/message/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'message',
        component: () => import('pages/Message.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/message-list/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'messageList',
        component: () => import('pages/MessageList.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/guidelines/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'guidelines-list',
        component: () => import('pages/Guidelines.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/knowledge',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'knowledge',
        component: () => import('pages/Knowledge.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  // {
  //   path: '/dashboard',
  //   component: () => import('layouts/AdminLayout.vue'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'dashboard',
  //       component: () => import('pages/Dashboard.vue')
  //     }
  //   ],
  //   meta: {
  //     requiresPermission: 'frapp-master-manage'
  //   }
  // },
  {
    path: '/profile',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'profile',
        component: () => import('pages/Profile.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/dashboard',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'admin-home',
        component: () => import('pages/Dashboard.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  // {
  //   path: '/search-new',
  //   component: () => import('layouts/AdminLayoutNew.vue'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'search-new',
  //       component: () => import('pages/SearchNew.vue')
  //     }
  //   ],
  //   meta: {
  //     requiresPermission: 'frapp-master-manage'
  //   }
  // },
  {
    path: '/bookmark',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'bookmark',
        component: () => import('pages/Bookmark.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/search',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: ':keyword',
        name: 'search-result',
        component: () => import('pages/Search.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/profile/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'profile-detail',
        component: () => import('pages/Profile.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/article',
    component: () => import('layouts/BasicLayout'),
    children: [
      {
        path: ':id/:title',
        name: 'post-article',
        component: () => import('pages/PostArticle')
      },
      {
        path: ':id/:post/:title',
        name: 'edit-article',
        component: () => import('pages/PostArticle')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/training',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'training',
        component: () => import('pages/Training.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/player',
    component: () => import('components/common/Player.vue')
    // meta: {
    // guestOnly: true
    // requiresPermission: 'frapp-master-manage'
    // }
  },
  {
    path: '/notification/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'notification',
        component: () => import('pages/Notification.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/training/feedback',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        name: 'training-feedback',
        component: () => import('pages/TrainingFeedback.vue')
      }
    ],
    meta: {
      // requiresAuthFeedback: 'frapp-master-manage'
    }
  },
  {
    path: '/training/feedback/thankyou',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        name: 'training-feedback-finish',
        component: () => import('pages/TrainingFeedbackFinish.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/training-report',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'training-report',
        component: () => import('pages/TrainingReport.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/narasumber',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'narasumber',
        component: () => import('pages/TrainingExpertise.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/training-master',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'training-master',
        component: () => import('src/pages/TrainingMaster.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/training/permission',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        name: 'training-permission',
        component: () => import('pages/TrainingPermission.vue')
      }
    ],
    meta: {
      // requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/training/detail/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'training-detail',
        component: () => import('pages/TrainingDetail.vue')
      }
    ],
    meta: {
      // requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/leaderboard',
    component: () => import('layouts/AdminLayout'),
    children: [
      {
        path: 'direktorat',
        name: 'leaderboard-direktorat',
        component: () => import('pages/LeaderboardDirektorat')
      },
      {
        path: 'member',
        name: 'leaderboard-member',
        component: () => import('pages/LeaderboardMember')
      }
    ],
    meta: {
      // requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/ratingapp',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'ratingapp',
        component: () => import('pages/RatingApp.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/smart-report',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'smart-report',
        component: () => import('pages/SmartReport.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/tutorial',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'tutorial',
        component: () => import('pages/Tutorial.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/v2/dashboard',
    component: () => import('layouts/v2/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'v2-dashboard',
        component: () => import('pages/v2/Dashboard.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/v2/library',
    component: () => import('layouts/v2/AdminLayout.vue'),
    children: [
      {
        path: '/',
        name: 'v2-library',
        component: () => import('pages/v2/Library.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  },
  {
    path: '/v2/library/detail',
    component: () => import('layouts/v2/AdminLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'v2-library-detail',
        component: () => import('pages/v2/LibraryDetail.vue')
      }
    ],
    meta: {
      requiresPermission: 'frapp-master-manage'
    }
  }
];

// Always leave this as last one
routes.push({
  path: '/:pathMatch(.*)*',
  component: () => import('pages/Error404.vue')
});

export default routes;
