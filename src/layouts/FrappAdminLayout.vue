<template>
  <q-layout view="hHh Lpr fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="toggleDrawer"></q-btn>

        <q-toolbar-title class="row items-center">
          <q-avatar
            square
            class="q-mr-md cursor-pointer"
            @click="$router.push({ name: 'landing' })"
          >
            <img src="app-logo-128x128.png" />
          </q-avatar>
          <span
            class="text-h6 cursor-pointer"
            @click="$router.push({ name: 'landing' })"
          ></span>
        </q-toolbar-title>
        <q-btn flat class="gt-sm"></q-btn>
        <q-btn flat round dense icon="exit_to_app" @click="confirmLogout">
          <session-status />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :mini="miniState"
      :width="280"
      :breakpoint="500"
      bordered
      content-class="bg-white"
      show-if-above
    >
      <q-scroll-area class="fit">
        <q-list padding testcafe-tag="user-list">
          <q-item
            clickable
            v-ripple
            @click="$router.push({ name: 'admin-home' })"
            :active="$route.name === 'home'"
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>Beranda</q-item-section>
          </q-item>
          <q-separator />
          <q-item-label header>Administrasi</q-item-label>
          <q-item clickable v-ripple :to="{ name: 'admin-codes-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Code</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'admin-comments-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Comment</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'admin-media-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Media</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'admin-mediables-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Mediable</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            :to="{ name: 'admin-password-resets-list' }"
          >
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Password Reset</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'admin-permissions-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Permission</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            :to="{ name: 'admin-permission-roles-list' }"
          >
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Permission Role</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            :to="{ name: 'admin-permission-users-list' }"
          >
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Permission User</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'admin-posts-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Post</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'admin-roles-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Role</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'admin-role-users-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Role User</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'admin-users-list' }">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>User</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import SessionStatus from 'components/SessionStatus';
import { logout } from '../lib/SessionHelper';

export default {
  components: {
    SessionStatus
  },
  data() {
    return {
      appName: 'KM Portal',
      drawer: true,
      miniState: false
    };
  },
  computed: {
    currentPermissions() {
      return this.$store.getters['user/currentPermissions'].map(p => p.name);
    },
    name() {
      const profile = this.$store.getters['user/profile'];
      return profile ? profile.name : null;
    }
  },
  methods: {
    toggleDrawer() {
      if (this.$q.screen.gt.xs) {
        this.drawer = true;
        this.miniState = !this.miniState;
      } else {
        this.drawer = !this.drawer;
        this.miniState = false;
      }
    },
    can(permissionName) {
      return this.$store.getters['user/hasPermission'](permissionName);
    },
    hasRole(roleName) {
      return this.$store.getters['user/currentHasRole'](roleName);
    },
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

<style scoped></style>
