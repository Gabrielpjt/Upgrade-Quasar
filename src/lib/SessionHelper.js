import moment from 'moment';
import { Notify } from 'quasar';
import { login, refreshToken, profile } from './api';

export const MAX_IDLE_TIME = 30; // minutes
export const MAX_TOKEN_LIFETIME = 30; // minutes
export const SESSION_CHECK_INTERVAL = 60; // seconds

export function getRemainingIdleTime(lastApiActivity) {
  return MAX_IDLE_TIME - moment().diff(moment(lastApiActivity), 'minutes');
}

export function isIdleToLong(lastApiActivity) {
  return getRemainingIdleTime(lastApiActivity) < 0;
}

export function needToRefreshToken(tokenTimestamp) {
  const tokenLifetime = moment().diff(moment(tokenTimestamp), 'minutes');
  return tokenLifetime >= MAX_TOKEN_LIFETIME;
}

export function loginAndGetProfile({ username, password }, vueContext) {
  return login(
    {
      username,
      password
    },
    {
      showErrorNotification: false,
      timeout: 20000
    }
  )
    .then(payload => {
      vueContext.$store.dispatch('user/login', {
        accessToken: vueContext.$keycloak.token,
        refreshToken: vueContext.$keycloak.refreshToken
      });

      return profile({ bearerTokenOverride: vueContext.$keycloak.token })
        .then(({ data, errors }) => {
          if (!errors && data) {
            vueContext.$store.dispatch(
              'user/updateRawProfile',
              JSON.stringify(data)
            );
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
    })
    .catch(e => {
      const message = e && e.response ? e.response.statusText : e.message;
      vueContext.$router.go();
      Notify.create({
        message: `Login gagal: ${message}`,
        timeout: 5000,
        type: 'negative',
        color: 'negative',
        icon: 'warning'
      });

      throw e;
    });
}

export function logout(vueContext) {
  vueContext.$store.dispatch('user/logout');
  vueContext.$store.dispatch('quiz/clearQuiz');
  vueContext.$keycloak.logoutFn();

  vueContext.$router.push({
    name: 'login-sso'
  });
}

export function refreshTokenAndProfile(vueContext) {
  return refreshToken(
    {
      refresh_token: vueContext.$keycloak.refreshToken

    },
    {
      showErrorNotification: false
    }
  )
    .then(payload => {
      if (payload.access_token) {
        vueContext.$store.dispatch('user/login', {
          accessToken: payload.access_token,
          refreshToken: payload.refresh_token
        });

        return profile({ bearerTokenOverride: vueContext.$keycloak.token })
          .then(({ data, errors }) => {
            if (!errors && data) {
              return vueContext.$store.dispatch(
                'user/updateRawProfile',
                JSON.stringify(data)
              );
            }
            throw new Error('Profile tidak valid');
          })
          .catch(e => {
            Notify.create({
              message: 'Update profile gagal 2',
              timeout: 5000,
              type: 'negative',
              color: 'negative',
              icon: 'warning'
            });

            throw e;
          });
      }

      Notify.create({
        message: 'Refresh token gagal',
        timeout: 5000,
        type: 'negative',
        color: 'negative',
        icon: 'warning'
      });

      throw new Error('Refresh token gagal');
    })
    .catch(error => {
      if (error.response.status === 401) {
        Notify.create({
          message: '<p>Token tidak valid</p><p>Silahkan melakukan login</p>',
          timeout: 5000,
          type: 'negative',
          color: 'negative',
          icon: 'warning',
          html: true
        });

        logout(vueContext);

        vueContext.$router.push({
          // name: 'login'
          name: 'login-sso'

        });
      }

      throw error;
    });
}

export function doRefreshToken(vueContext) {
  return refreshToken(
    {
      refresh_token: vueContext.$keycloak.refreshToken
    },
    {
      showErrorNotification: false
    }
  )
    .then(payload => {
      if (payload.access_token) {
        return vueContext.$store.dispatch('user/login', {
          accessToken: vueContext.$keycloak.token,
          refreshToken: vueContext.$keycloak.refreshToken

        });
      }

      Notify.create({
        message: 'Refresh token gagal',
        timeout: 5000,
        type: 'negative',
        color: 'negative',
        icon: 'warning'
      });

      throw new Error('Refresh token gagal');
    })
    .catch(error => {
      if (error.response.status === 401) {
        Notify.create({
          message: '<p>Token tidak valid</p><p>Silahkan melakukan login</p>',
          timeout: 5000,
          type: 'negative',
          color: 'negative',
          icon: 'warning',
          html: true
        });

        logout(vueContext, false);

        vueContext.$router.push({
          name: 'login-sso'
        });
      }

      throw error;
    });
}
