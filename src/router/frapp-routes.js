export const routes = {
  path: '/admin',
  component: () => import('layouts/FrappAdminLayout.vue'),
  children: [
    {
      path: 'home',
      name: 'admin-home',
      component: () => import('pages/AdminHome.vue')
    },
    {
      path: 'codes',
      name: 'admin-codes-list',
      component: () => import('pages/FrappAdminCodesList.vue')
    },
    {
      path: 'codes/create',
      name: 'admin-codes-create',
      component: () => import('pages/FrappAdminCodesCreate.vue')
    },
    {
      path: 'codes/:id',
      name: 'admin-codes-detail',
      component: () => import('pages/FrappAdminCodesDetail.vue')
    },
    {
      path: 'codes/:id/edit',
      name: 'admin-codes-edit',
      component: () => import('pages/FrappAdminCodesEdit.vue')
    },
    {
      path: 'comments',
      name: 'admin-comments-list',
      component: () => import('pages/FrappAdminCommentsList.vue')
    },
    {
      path: 'comments/create',
      name: 'admin-comments-create',
      component: () => import('pages/FrappAdminCommentsCreate.vue')
    },
    {
      path: 'comments/:id',
      name: 'admin-comments-detail',
      component: () => import('pages/FrappAdminCommentsDetail.vue')
    },
    {
      path: 'comments/:id/edit',
      name: 'admin-comments-edit',
      component: () => import('pages/FrappAdminCommentsEdit.vue')
    },
    {
      path: 'media',
      name: 'admin-media-list',
      component: () => import('pages/FrappAdminMediaList.vue')
    },
    {
      path: 'media/create',
      name: 'admin-media-create',
      component: () => import('pages/FrappAdminMediaCreate.vue')
    },
    {
      path: 'media/:id',
      name: 'admin-media-detail',
      component: () => import('pages/FrappAdminMediaDetail.vue')
    },
    {
      path: 'media/:id/edit',
      name: 'admin-media-edit',
      component: () => import('pages/FrappAdminMediaEdit.vue')
    },
    {
      path: 'mediables',
      name: 'admin-mediables-list',
      component: () => import('pages/FrappAdminMediablesList.vue')
    },
    {
      path: 'mediables/create',
      name: 'admin-mediables-create',
      component: () => import('pages/FrappAdminMediablesCreate.vue')
    },
    {
      path: 'mediables/:id',
      name: 'admin-mediables-detail',
      component: () => import('pages/FrappAdminMediablesDetail.vue')
    },
    {
      path: 'mediables/:id/edit',
      name: 'admin-mediables-edit',
      component: () => import('pages/FrappAdminMediablesEdit.vue')
    },
    {
      path: 'password-resets',
      name: 'admin-password-resets-list',
      component: () => import('pages/FrappAdminPasswordResetsList.vue')
    },
    {
      path: 'password-resets/create',
      name: 'admin-password-resets-create',
      component: () => import('pages/FrappAdminPasswordResetsCreate.vue')
    },
    {
      path: 'password-resets/:id',
      name: 'admin-password-resets-detail',
      component: () => import('pages/FrappAdminPasswordResetsDetail.vue')
    },
    {
      path: 'password-resets/:id/edit',
      name: 'admin-password-resets-edit',
      component: () => import('pages/FrappAdminPasswordResetsEdit.vue')
    },
    {
      path: 'permissions',
      name: 'admin-permissions-list',
      component: () => import('pages/FrappAdminPermissionsList.vue')
    },
    {
      path: 'permissions/create',
      name: 'admin-permissions-create',
      component: () => import('pages/FrappAdminPermissionsCreate.vue')
    },
    {
      path: 'permissions/:id',
      name: 'admin-permissions-detail',
      component: () => import('pages/FrappAdminPermissionsDetail.vue')
    },
    {
      path: 'permissions/:id/edit',
      name: 'admin-permissions-edit',
      component: () => import('pages/FrappAdminPermissionsEdit.vue')
    },
    {
      path: 'permission-roles',
      name: 'admin-permission-roles-list',
      component: () => import('pages/FrappAdminPermissionRolesList.vue')
    },
    {
      path: 'permission-roles/create',
      name: 'admin-permission-roles-create',
      component: () => import('pages/FrappAdminPermissionRolesCreate.vue')
    },
    {
      path: 'permission-roles/:id',
      name: 'admin-permission-roles-detail',
      component: () => import('pages/FrappAdminPermissionRolesDetail.vue')
    },
    {
      path: 'permission-roles/:id/edit',
      name: 'admin-permission-roles-edit',
      component: () => import('pages/FrappAdminPermissionRolesEdit.vue')
    },
    {
      path: 'permission-users',
      name: 'admin-permission-users-list',
      component: () => import('pages/FrappAdminPermissionUsersList.vue')
    },
    {
      path: 'permission-users/create',
      name: 'admin-permission-users-create',
      component: () => import('pages/FrappAdminPermissionUsersCreate.vue')
    },
    {
      path: 'permission-users/:id',
      name: 'admin-permission-users-detail',
      component: () => import('pages/FrappAdminPermissionUsersDetail.vue')
    },
    {
      path: 'permission-users/:id/edit',
      name: 'admin-permission-users-edit',
      component: () => import('pages/FrappAdminPermissionUsersEdit.vue')
    },
    {
      path: 'posts',
      name: 'admin-posts-list',
      component: () => import('pages/FrappAdminPostsList.vue')
    },
    {
      path: 'posts/create',
      name: 'admin-posts-create',
      component: () => import('pages/FrappAdminPostsCreate.vue')
    },
    {
      path: 'posts/:id',
      name: 'admin-posts-detail',
      component: () => import('pages/FrappAdminPostsDetail.vue')
    },
    {
      path: 'posts/:id/edit',
      name: 'admin-posts-edit',
      component: () => import('pages/FrappAdminPostsEdit.vue')
    },
    {
      path: 'roles',
      name: 'admin-roles-list',
      component: () => import('pages/FrappAdminRolesList.vue')
    },
    {
      path: 'roles/create',
      name: 'admin-roles-create',
      component: () => import('pages/FrappAdminRolesCreate.vue')
    },
    {
      path: 'roles/:id',
      name: 'admin-roles-detail',
      component: () => import('pages/FrappAdminRolesDetail.vue')
    },
    {
      path: 'roles/:id/edit',
      name: 'admin-roles-edit',
      component: () => import('pages/FrappAdminRolesEdit.vue')
    },
    {
      path: 'role-users',
      name: 'admin-role-users-list',
      component: () => import('pages/FrappAdminRoleUsersList.vue')
    },
    {
      path: 'role-users/create',
      name: 'admin-role-users-create',
      component: () => import('pages/FrappAdminRoleUsersCreate.vue')
    },
    {
      path: 'role-users/:id',
      name: 'admin-role-users-detail',
      component: () => import('pages/FrappAdminRoleUsersDetail.vue')
    },
    {
      path: 'role-users/:id/edit',
      name: 'admin-role-users-edit',
      component: () => import('pages/FrappAdminRoleUsersEdit.vue')
    },
    {
      path: 'users',
      name: 'admin-users-list',
      component: () => import('pages/FrappAdminUsersList.vue')
    },
    {
      path: 'users/create',
      name: 'admin-users-create',
      component: () => import('pages/FrappAdminUsersCreate.vue')
    },
    {
      path: 'users/:id',
      name: 'admin-users-detail',
      component: () => import('pages/FrappAdminUsersDetail.vue')
    },
    {
      path: 'users/:id/edit',
      name: 'admin-users-edit',
      component: () => import('pages/FrappAdminUsersEdit.vue')
    }
  ]
};
