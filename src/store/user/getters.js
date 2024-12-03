import { find } from 'lodash';

export function isAuthenticated(state) {
  return !!state.accessToken;
}

export function profile(state) {
  return JSON.parse(state.rawProfile);
}

export function hasPermission(state, getters) {
  if (!getters.profile) {
    return () => null;
  }

  return permissionName => {
    const permissions = getters.profile.roles
      .map(r => r.permissions)
      .reduce((prev, current) => [...prev, ...current], []);

    return find(permissions, { name: permissionName });
  };
}

export function session(state) {
  return state.session;
}
