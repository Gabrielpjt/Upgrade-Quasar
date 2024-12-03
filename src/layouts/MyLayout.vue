<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-white">
      <div class="q-pt-xl q-px-xl" v-if="$q.screen.gt.sm">
        <q-toolbar>
          <q-toolbar-title class="row items-center">
            <q-avatar
              square
              class="q-mr-md cursor-pointer"
              @click="$router.push({ name: 'landing' })"
            >
              <img src="/app-logo-128x128.png" />
            </q-avatar>
            <span
              class="text-primary text-weight-bold text-h4 cursor-pointer"
              @click="$router.push({ name: 'landing' })"
              >{{ appName }}</span
            >
          </q-toolbar-title>
          <q-btn size="lg" flat color="primary" label="Action 1" />
          <q-btn size="lg" flat color="primary" label="Action 2" />
          <q-btn
            v-if="!authenticated"
            size="lg"
            flat
            color="primary"
            label="Login"
            :to="{ name: 'login' }"
          />

          <q-btn
            v-if="authenticated"
            flat
            color="negative"
            label="Logout"
            size="lg"
            @click="confirmLogout"
          />
        </q-toolbar>
      </div>
      <div v-else>
        <q-toolbar>
          <q-btn
            dense
            flat
            round
            icon="menu"
            @click="left = !left"
            v-if="$q.screen.lt.md"
            color="primary"
            class="q-mr-md"
          />
          <q-toolbar-title class="row items-center">
            <q-avatar
              square
              class="q-mr-sm cursor-pointer"
              @click="$router.push({ name: 'landing' })"
            >
              <img src="/app-logo-128x128.png" />
            </q-avatar>
            <span
              class="text-primary text-weight-bold text-h6 cursor-pointer"
              @click="$router.push({ name: 'landing' })"
              >{{ appName }}</span
            >
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-header>
    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      bordered
      v-if="$q.screen.lt.md"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label class="text-primary">Action 1</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label class="text-primary">Action 2</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-if="!authenticated"
            v-ripple
            clickable
            :to="{ name: 'login' }"
          >
            <q-item-section>
              <q-item-label class="text-primary">Login</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-else v-ripple clickable @click="confirmLogout">
            <q-item-section>
              <q-item-label class="text-negative">Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <transition
        appear
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { logout } from '../lib/SessionHelper';

export default {
  data() {
    return {
      appName: 'KM Portal',
      left: false
    };
  },
  computed: {
    authenticated() {
      return this.$store.getters['user/isAuthenticated'];
    }
  },
  methods: {
    confirmLogout() {
      const vueContext = this;
      this.$q
        .dialog({
          title: 'Konfirmasi',
          message: 'Apakah anda yakin untuk keluar dari aplikasi?',
          persistent: true,
          cancel: {
            label: 'Batal',
            flat: true
          },
          ok: {
            label: 'Ya'
          }
        })
        .onOk(() => {
          logout(vueContext);
        });
    }
  }
};
</script>
