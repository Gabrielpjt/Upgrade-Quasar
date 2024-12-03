import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import axios from 'axios';
import { Notify } from 'quasar';
import { profile } from 'src/lib/api';

export default async ({ app, router, store }) => {
  async function tokenInterceptor() {
    axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${app.config.globalProperties.$keycloak.token}`;
      return config;
    }, error => {
      return Promise.reject(error);
    });
  }

  async function tokenUpdate(keycloak) {
    store.dispatch('user/login', {
      accessToken: keycloak.token,
      refreshToken: keycloak.refreshToken
    });
  }

  async function tokenInit(keycloak) {
    store.dispatch('user/login', {
      accessToken: keycloak.token,
      refreshToken: keycloak.refreshToken
    });
    profile({ bearerTokenOverride: keycloak.token })
      .then(({ data, errors }) => {
        if (!errors && data) {
          store.dispatch('user/updateRawProfile', JSON.stringify(data));
        }
      })
      .catch(e => {
        Notify.create({
          message: 'Update profile gagal',
          timeout: 5000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
        throw e;
      });
  }

  return new Promise(resolve => {
    app.use(VueKeyCloak, {
      init: {
        onLoad: 'login-required', // or 'check-sso'
        flow: 'standard',
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        checkLoginIframe: false // otherwise it would reload the window every few seconds
      },
      config: {
        url: 'https://sso.kpk.go.id/',
        realm: 'SSO-PROD',
        clientId: 'Smart-ARS'
      },
      onReady(keycloak) {
        tokenInterceptor();
        tokenInit(keycloak);
        resolve();
      },
      onAuthRefreshSuccess(keycloak) {
        tokenUpdate(keycloak);
      }
    });
  });
};
