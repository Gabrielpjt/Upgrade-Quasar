<template>
  <q-page :class="this.$q.platform.is.mobile ? 'page-mobile' : 'page'" window-height window-width row justify-center items-center>
    <div
      class="row items-center full-width" :class="this.$q.platform.is.mobile ? 'height-margin-mobile' : 'height-margin-dekstop'"
    >
      <div class="col-12 column items-center q-pa-md">
        <div class="desktop-only">
          <div class="row no-wrap items-center" style="min-width:70vw;">
            <q-img
              class="logo-km q-mb-md"
              src="../assets/images/logo-kpk.png"
              width="8vw"
            />
            <q-space/>
            <q-img
              class="logo-km q-mb-md q-mr-lg"
              src="../assets/images/logo-km-fest.png"
              width="8vw"
            />
            <q-img
              class="logo-km q-mb-md q-mr-lg"
              src="../assets/images/logo-act.png"
              width="8vw"
            />
            <q-img
              class="logo-km q-mb-md q-mr-lg"
              src="../assets/images/logo-kmd.png"
              width="8vw"
            />
            <q-img
              class="logo-km q-mb-md q-mr-lg"
              src="../assets/images/logo-brain.png"
              width="8vw"
            />
          </div>
        </div>
        <div class="mobile-only">
          <div class="row no-wrap text-center q-pt-lg q-my-lg">
            <img src="../assets/images/logo-kpk.png" class="" width="90vw">
          </div>
        </div>
        <div class="q-px-md row">
          <q-card class="my-card login-new-card desktop-only text-white">
            <q-chat-message
              style="position: absolute; right: 10px; bottom: 0;"
              avatar="../assets/images/helpdesk.png"
              :text="['Need help?']"
              width="100px"
              sent
              class="cursor-pointer"
              bg-color="white"
              @click="$router.push({ name: 'helpdesk-offline' })"
            />
            <q-card-section>
              <q-card-section class="col-6 q-pa-xl sec-card">
                <div class="q-mt-sm text-center">
                  <span style="font-size: 1.7vw;">Selamat Datang di</span>
                  <q-space/>
                  <q-img
                    class="logo-km q-mb-md"
                    src="../assets/images/smart-white.png"
                    width="18vw"
                  />
                  <q-space/>
                  <span style="font-size: 1.5vw;">User Login</span>
                  <!-- <div class="w welcome-1">Welcome back!</div> -->
                  <!-- <div class="w welcome-2 text-left q-mb-lg q-mt-sm">Selamat Datang di <b>Sistem Manajemen pengetAhuan beRbasis Teknologi (SMART)</b> KPK</div> -->
                  <div class="row q-mt-md">
                    <div class="col-md-4 offset-md-4">
                      <q-input
                        dense
                        outlined
                        rounded
                        bg-color="white"
                        label="Username"
                        v-model="username"
                        @blur="$v.username.$touch"
                        :error="$v.username.$error"
                        error-message="Wajib diisi">
                        <template v-slot:prepend>
                          <q-icon name="account_circle"/>
                        </template>
                      </q-input>
                      <q-input
                        dense
                        rounded
                        outlined
                        class="q-mb-md"
                        bg-color="white"
                        label="Password"
                        v-model="password"
                        :type="showPassword ? 'text': 'password'"
                        @blur="$v.password.$touch"
                        :error="$v.password.$error"
                        error-message="Wajib diisi"
                        v-on:keyup.enter="submit"
                      >
                        <template v-slot:prepend>
                          <q-icon :name="showPassword ? 'visibility_off' : 'remove_red_eye'" @click="showPassword = !showPassword" />
                        </template>
                        <template v-slot:hint>
                            <span class="pw-form text-white" style="font-size: 0.7vw;">
                              Login Menggunakan Username dan Password akun KPK, Username yang lebih dari 1 kata menggunakan titik atau spasi
                            </span>
                        </template>
                      </q-input>
                      <!-- <label for="" class="label-form pass">Forgot Password?</label> -->
                      <q-btn
                        :disable="$v.$invalid || isLoading"
                        rounded
                        class="q-mt-md full-width btn-login"
                        :color="$v.$invalid ? 'btn' : 'btn'"
                        label="Sign In"
                        @click="submit"
                      />
                      <q-inner-loading :showing="isLoading">
                        <q-spinner-bars size="50px" color="primary"></q-spinner-bars>
                      </q-inner-loading>
                    </div>
                  </div>

                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="my-card my-card-login-mobile mobile-only text-white">
            <q-img
              src="../assets/images/helpdesk.png"
              style="position: absolute; right: 10px; bottom: 10px; max-width:50px; z-index:1000"
              @click="$router.push({ name: 'helpdesk-offline' })"
            />
            <q-card-section horizontal>
              <q-card-section class="col-12 q-pa-xl">
                <div class="q-mt-md q-pt-md text-center">
                    <span style="font-size: 5vw;">{{ usernameKeycloak }}, Selamat Datang di</span>
                  <q-space/>
                  <q-img
                    class="logo-km q-mb-md"
                    src="../assets/images/smart-white.png"
                    width="60vw"
                  />
                  <q-space/>
                  <span style="font-size: 4vw;">User Login</span>
                  <div class="row q-mt-md">
                    <q-input
                      dense
                      outlined
                      rounded
                      bg-color="white"
                      v-model="username"
                      @blur="$v.username.$touch"
                      :error="$v.username.$error"
                      error-message="Wajib diisi">
                      <template v-slot:prepend>
                        <q-icon name="account_circle"/>
                      </template>
                    </q-input>
                    <q-input
                      dense
                      outlined
                      rounded
                      v-model="password"
                      bg-color="white"
                      :type="showPassword ? 'text': 'password'"
                      @blur="$v.password.$touch"
                      :error="$v.password.$error"
                      error-message="Wajib diisi"
                      v-on:keyup.enter="submit"
                    >
                      <template v-slot:prepend>
                        <q-icon :name="showPassword ? 'visibility_off' : 'remove_red_eye'" @click="showPassword = !showPassword" />
                      </template>
                      <template v-slot:hint>
                          <span class="pw-form text-white">
                            Login Menggunakan Username dan Password akun KPK, Username yang lebih dari 1 kata menggunakan titik atau spasi
                          </span>
                      </template>
                    </q-input>
                    <q-btn
                      :disable="$v.$invalid || isLoading"
                      class="q-mt-md full-width btn-submit-mobile"
                      :color="$v.$invalid ? 'btn' : 'btn'"
                      label="Sign In"
                      @click="submit"
                    />
                    <q-inner-loading :showing="isLoading">
                      <q-spinner-bars size="50px" color="primary"></q-spinner-bars>
                    </q-inner-loading>
                    <label for="" class="label-form pass">Need help?</label>
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <div class="mobile-only" >
          <div class="row no-wrap items-center q-mt-none">
            <img src="../assets/images/logo-km-fest.png" class="q-mr-sm" width="60vw">
            <img src="../assets/images/logo-act.png" class="q-mr-sm" width="60vw">
            <img src="../assets/images/logo-kmd.png" class="q-mr-sm" width="60vw">
            <img src="../assets/images/logo-brain.png" style="width:20vw">
          </div>
        </div>
        <!-- <q-chat-message
          style="position: absolute; right: 10px; bottom: 0;"
          avatar="../assets/images/helpdesk.png"
          :text="['Need help?']"
          width="100px"
          sent
          class="cursor-pointer mobile-only"
          bg-color="white"
          @click="$router.push({ name: 'helpdesk-offline' })"
        /> -->
      </div>
    </div>
  </q-page>
  <!--  </q-responsive>-->
</template>

<style>
body{
  font-family: Inter;
}
@media (max-width: 1439px){
  .login-card{
    /* background: #2C8ED3; */
    position: absolute;
    top: 50%;
    left: 50%;
    width: 55vw;
    /* height: 70vh; */
    /* margin-right: -50%; */
    transform: translate(-50%, -50%);
    border-radius: 15px;
  }
  .form-card{
    /* background: blue; */
    /* padding-top: 50px;*/
    /*padding: 0px;*/
    /* width: 28.8vw;
    height: 38.5vh; */
    /*margin: auto;*/
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    /* position: absolute; */
  }
  .logo-km{
    width: 12.9vw;
  }
  .img-login{
    width:450px;
    height:633px
  }
}
@media (min-width:1440px){
  .login-card{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 71vw;
    height: 70vh;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
  }
  /*.form-card{*/
  /*  !* background: blue; *!*/
  /*  !* padding: 5px; *!*/
  /*  padding: 0px;*/
  /*  width: 28.8vw;*/
  /*  height: 38.5vh;*/
  /*  margin: auto;*/
  /*  top: 50%;*/
  /*  left: 50%;*/
  /*  transform: translate(-50%, -50%);*/
  /*  position: absolute;*/
  /*}*/
  .logo-km{
    width: 12.9vw;
  }
  .img-login{
    width:35.5vw;
    height:70vh
  }
}
.page {
  background: url('../assets/images/back-new.png') center / cover;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: relative;
}
.page-mobile {
  background: url('../assets/images/mobile-bg.png') center / cover;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: relative;
}
.left-cont{
  width: 512px;
  height: 720px;
  /* left: 720px;
  top: 152px; */
}
.my-card-login {
  position: relative;
  /*width: 50vw;*/
  width: 50vw;
  height: 80vh;
  /*left: calc(50% - 130vh/2);*/
  /*top: calc(50% - 90vh/2);*/
  border-radius: 30px !important;
  background: #008fd7;
  opacity: 0.8;
  box-shadow: inset 0 0 10px black, 0 0 50px black;
}

.login-new-card {
  /* width: 110vh; */
  position: relative;
  min-width: 70vw;
  height: 75vh;
  border-radius: 30px !important;
  background: #008fd7;
  opacity: 0.8;
  box-shadow: inset 0 0 10px #0054a1, 0 0 50px black;
}

.sec-card {
  width:auto;
}

.my-card-login-mobile {
  position: relative;
  height: 62vh;
  border-radius: 30px !important;
  background: #008fd7;
  opacity: 0.8;
  /* box-shadow: inset 0 0 10px #0054a1, 0 0 50px black; */
}
/* .page {
  background: url('../assets/images/back.png') center / cover
} */
.form-card{
  padding: 5px;
}
.w{
  font-family: Inter;
  font-style: normal;
}
.welcome-1{
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #000000;
}
.label-form{
  display: flex;
  font-weight: normal;
  font-size: 12px;
  line-height: 140%;
  color:darkgray;
}
.pass{
  float: right;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  /* identical to box height, or 16px */

  display: flex;
  align-items: center;
  text-align: right;

  /* Primary/600 */

  color: #2C8ED3;


  /* Inside Auto Layout */

  flex: none;
  order: 4;
  flex-grow: 0;
  /* margin: 20px 0px; */
}
.welcome-2{
  font-weight: normal;
  font-size: 12px;
  line-height: 140%;
  color: #394A64;
}
.welcome-2-mobile{
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  color: #394A64;
}
.text-btn {
  color: #ffffff;
}
.bg-btn {
  background: #2C8ED3;
}
.height-margin-dekstop {
  height:100vh;
}
.height-margin-mobile {
  height:90vh;
}
.btn-submit-mobile {
  height: 6vh;
  font-size: 14px;
  margin-top:50px;
  opacity: 1 !important;
  background: #002062;
  /* 011541 */
  box-shadow: inset 0 0 10px #26427C, 0 0 30px #26427C;
  border: 0.5px solid #26427C;
  border-radius: 23px;
}
.btn-login {
  opacity: 1 !important;
  background: #002062;
  /* 011541 */
  box-shadow: inset 0 0 10px #26427C, 0 0 30px #26427C;
  border: 0.5px solid #26427C;
  border-radius: 23px;
}
.q-message-avatar {
  width: 100px;
  height: auto;
}
.q-message-text  {
  margin-bottom: 60px;
}
</style>

<script>
import { required } from 'vuelidate/lib/validators';
import { Notify } from 'quasar';
import { loginAndGetProfile } from '../lib/SessionHelper';
import { profileSyncToHris } from '../lib/api';

export default {
  data() {
    return {
      appName: 'KM Portal',
      slide: 'slide1',
      username: this.$keycloak.tokenParsed.preferred_username ?? null,
      password: this.$keycloak.tokenParsed.preferred_username ? 'secret' : null,
      isLoading: false,
      showPassword: false,
      result: null,
      usernameKeycloak: this.$keycloak.tokenParsed.name ?? ''

    };
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Form tidak valid',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
        this.isLoading = false;
      } else {
        this.isLoading = true;
        loginAndGetProfile(
          {
            username: this.username,
            password: this.password
          },
          this
        )
          .then(result => {
            if (this.$route.query.feedback) {
              const token = this.$route.query.feedback;
              this.isLoading = false;
              this.$router.push({ path: '/training/feedback', query: { token } });
              // } else if (this.$route.query.permission) {
              //   const token = this.$route.query.permission;
              //   this.isLoading = false;
              //   this.$router.push({ path: '/training/permission', query: { token } });
            } else if (this.$route.query.detail) {
              const token = this.$route.query.detail;
              this.isLoading = false;
              this.$router.push({ name: 'training-detail', params: { id: token } }).catch(() => {
              });
            } else {
              profileSyncToHris({ username: this.username }).then(response => {
                const hasil = response.data;
                if (hasil.status === 'success') {
                  Notify.create({
                    message: hasil.message,
                    timeout: 5000,
                    type: 'positive',
                    color: 'positive',
                    icon: 'check'
                  });
                } else if (hasil.status === 'no_update') {
                  Notify.create({
                    message: hasil.message,
                    timeout: 5000,
                    type: 'positive',
                    color: 'warning',
                    icon: 'check'
                  });
                } else {
                  Notify.create({
                    message: hasil.message,
                    timeout: 5000,
                    type: 'negative',
                    color: 'negative',
                    icon: 'warning'
                  });
                }
              });

              this.isLoading = false;
              this.$router.push({
                name: 'admin-home'
              });
            }
          })
          .catch(e => {
            this.isLoading = false;
          });
      }
    }
  },
  beforeMount() {
    if (this.$keycloak.tokenParsed.preferred_username != null) {
      this.submit();
    }
  }
};
</script>
