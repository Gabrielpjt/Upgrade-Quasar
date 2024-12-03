import { download, get, post, put, del } from './HttpHelper';

export function downloadPublic(url) {
  return download({ fullPath: url });
}

export function adminCodesList(params) {
  return get({ path: 'api/admin-codes/', params });
}

export function adminCodesCreate(params) {
  return post({ path: 'api/admin-codes/', params });
}

export function adminCodesUpdate(id, params) {
  return put({ path: `api/admin-codes/${id}`, params });
}

export function adminCodesDetail(id, params) {
  return get({ path: `api/admin-codes/${id}`, params });
}

export function adminCodesDelete(id, params) {
  return del({ path: `api/admin-codes/${id}`, params });
}

export function adminCodesRestore(id, params) {
  return post({ path: `api/admin-codes/${id}/restore`, params });
}

export function adminCommentsList(params) {
  return get({ path: 'api/admin-comments/', params });
}

export function adminCommentsCreate(params) {
  return post({ path: 'api/admin-comments/', params });
}

export function adminCommentsUpdate(id, params) {
  return put({ path: `api/admin-comments/${id}`, params });
}

export function adminCommentsDetail(id, params) {
  return get({ path: `api/admin-comments/${id}`, params });
}

export function adminCommentsDelete(id, params) {
  return del({ path: `api/admin-comments/${id}`, params });
}

export function adminCommentsRestore(id, params) {
  return post({ path: `api/admin-comments/${id}/restore`, params });
}

export function adminMediaList(params) {
  return get({ path: 'api/admin-media/', params });
}

export function adminMediaCreate(params) {
  return post({ path: 'api/admin-media/', params });
}

export function adminMediaUpdate(id, params) {
  return put({ path: `api/admin-media/${id}`, params });
}

export function adminMediaDetail(id, params) {
  return get({ path: `api/admin-media/${id}`, params });
}

export function adminMediaDelete(id, params) {
  return del({ path: `api/admin-media/${id}`, params });
}

export function adminMediaRestore(id, params) {
  return post({ path: `api/admin-media/${id}/restore`, params });
}

export function adminMediaMediableList(id, params) {
  return get({ path: `api/admin-media/${id}/mediables/`, params });
}

export function adminMediablesList(params) {
  return get({ path: 'api/admin-mediables/', params });
}

export function adminMediablesCreate(params) {
  return post({ path: 'api/admin-mediables/', params });
}

export function adminMediablesUpdate(id, params) {
  return put({ path: `api/admin-mediables/${id}`, params });
}

export function adminMediablesDetail(id, params) {
  return get({ path: `api/admin-mediables/${id}`, params });
}

export function adminMediablesDelete(id, params) {
  return del({ path: `api/admin-mediables/${id}`, params });
}

export function adminMediablesRestore(id, params) {
  return post({ path: `api/admin-mediables/${id}/restore`, params });
}

export function adminPasswordResetsList(params) {
  return get({ path: 'api/admin-password-resets/', params });
}

export function adminPasswordResetsCreate(params) {
  return post({ path: 'api/admin-password-resets/', params });
}

export function adminPasswordResetsUpdate(id, params) {
  return put({ path: `api/admin-password-resets/${id}`, params });
}

export function adminPasswordResetsDetail(id, params) {
  return get({ path: `api/admin-password-resets/${id}`, params });
}

export function adminPasswordResetsDelete(id, params) {
  return del({ path: `api/admin-password-resets/${id}`, params });
}

export function adminPasswordResetsRestore(id, params) {
  return post({ path: `api/admin-password-resets/${id}/restore`, params });
}

export function adminPermissionsList(params) {
  return get({ path: 'api/admin-permissions/', params });
}

export function adminPermissionsCreate(params) {
  return post({ path: 'api/admin-permissions/', params });
}

export function adminPermissionsUpdate(id, params) {
  return put({ path: `api/admin-permissions/${id}`, params });
}

export function adminPermissionsDetail(id, params) {
  return get({ path: `api/admin-permissions/${id}`, params });
}

export function adminPermissionsDelete(id, params) {
  return del({ path: `api/admin-permissions/${id}`, params });
}

export function adminPermissionsRestore(id, params) {
  return post({ path: `api/admin-permissions/${id}/restore`, params });
}

export function adminPermissionsRoleList(id, params) {
  return get({ path: `api/admin-permissions/${id}/roles/`, params });
}

export function adminPermissionsSyncRoles(id, params) {
  return post({ path: `api/admin-permissions/${id}/sync-roles`, params });
}

export function adminPermissionRolesList(params) {
  return get({ path: 'api/admin-permission-roles/', params });
}

export function adminPermissionRolesCreate(params) {
  return post({ path: 'api/admin-permission-roles/', params });
}

export function adminPermissionRolesUpdate(id, params) {
  return put({ path: `api/admin-permission-roles/${id}`, params });
}

export function adminPermissionRolesDetail(id, params) {
  return get({ path: `api/admin-permission-roles/${id}`, params });
}

export function adminPermissionRolesDelete(id, params) {
  return del({ path: `api/admin-permission-roles/${id}`, params });
}

export function adminPermissionRolesRestore(id, params) {
  return post({ path: `api/admin-permission-roles/${id}/restore`, params });
}

export function adminPermissionUsersList(params) {
  return get({ path: 'api/admin-permission-users/', params });
}

export function adminPermissionUsersCreate(params) {
  return post({ path: 'api/admin-permission-users/', params });
}

export function adminPermissionUsersUpdate(id, params) {
  return put({ path: `api/admin-permission-users/${id}`, params });
}

export function adminPermissionUsersDetail(id, params) {
  return get({ path: `api/admin-permission-users/${id}`, params });
}

export function adminPermissionUsersDelete(id, params) {
  return del({ path: `api/admin-permission-users/${id}`, params });
}

export function adminPermissionUsersRestore(id, params) {
  return post({ path: `api/admin-permission-users/${id}/restore`, params });
}

export function adminPostsList(params) {
  return get({ path: 'api/admin-posts/', params });
}

export function adminPostsCreate(params) {
  return post({ path: 'api/admin-posts/', params });
}

export function adminPostsUpdate(id, params) {
  return put({ path: `api/admin-posts/${id}`, params });
}

export function adminPostsDetail(id, params) {
  return get({ path: `api/admin-posts/${id}`, params });
}

export function adminPostsDelete(id, params) {
  return del({ path: `api/admin-posts/${id}`, params });
}

export function adminPostsRestore(id, params) {
  return post({ path: `api/admin-posts/${id}/restore`, params });
}

export function adminPostsCommentList(id, params) {
  return get({ path: `api/admin-posts/${id}/comments/`, params });
}

export function adminRolesList(params) {
  return get({ path: 'api/admin-roles/', params });
}

export function adminRolesCreate(params) {
  return post({ path: 'api/admin-roles/', params });
}

export function adminRolesUpdate(id, params) {
  return put({ path: `api/admin-roles/${id}`, params });
}

export function adminRolesDetail(id, params) {
  return get({ path: `api/admin-roles/${id}`, params });
}

export function adminRolesDelete(id, params) {
  return del({ path: `api/admin-roles/${id}`, params });
}

export function adminRolesRestore(id, params) {
  return post({ path: `api/admin-roles/${id}/restore`, params });
}

export function adminRolesUserList(id, params) {
  return get({ path: `api/admin-roles/${id}/users/`, params });
}

export function adminRolesSyncUsers(id, params) {
  return post({ path: `api/admin-roles/${id}/sync-users`, params });
}

export function adminRolesPermissionList(id, params) {
  return get({ path: `api/admin-roles/${id}/permissions/`, params });
}

export function adminRolesSyncPermissions(id, params) {
  return post({ path: `api/admin-roles/${id}/sync-permissions`, params });
}

export function adminRoleUsersList(params) {
  return get({ path: 'api/admin-role-users/', params });
}

export function adminRoleUsersCreate(params) {
  return post({ path: 'api/admin-role-users/', params });
}

export function adminRoleUsersUpdate(id, params) {
  return put({ path: `api/admin-role-users/${id}`, params });
}

export function adminRoleUsersDetail(id, params) {
  return get({ path: `api/admin-role-users/${id}`, params });
}

export function adminRoleUsersDelete(id, params) {
  return del({ path: `api/admin-role-users/${id}`, params });
}

export function adminRoleUsersRestore(id, params) {
  return post({ path: `api/admin-role-users/${id}/restore`, params });
}

export function adminUsersList(params) {
  return get({ path: 'api/admin-users/', params });
}

export function adminUsersCreate(params) {
  return post({ path: 'api/admin-users/', params });
}

export function adminUsersUpdate(id, params) {
  return put({ path: `api/admin-users/${id}`, params });
}

export function adminUsersDetail(id, params) {
  return get({ path: `api/admin-users/${id}`, params });
}

export function adminUsersDelete(id, params) {
  return del({ path: `api/admin-users/${id}`, params });
}

export function adminUsersRestore(id, params) {
  return post({ path: `api/admin-users/${id}/restore`, params });
}

export function adminUsersRoleList(id, params) {
  return get({ path: `api/admin-users/${id}/roles/`, params });
}

export function adminUsersSyncRoles(id, params) {
  return post({ path: `api/admin-users/${id}/sync-roles`, params });
}

export function adminUsersCommentList(id, params) {
  return get({ path: `api/admin-users/${id}/comments/`, params });
}

export function adminUsersPostList(id, params) {
  return get({ path: `api/admin-users/${id}/posts/`, params });
}
