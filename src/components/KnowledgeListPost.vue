<template>
  <q-item class="q-list--bordered q-mb-sm kmp-post-item kmp-post-text" clickable v-ripple>
<!--    <div class="col-1 q-mt-xs">-->
<!--      <q-icon name="link" size="24px" class="q-mr-sm"/>-->
<!--    </div>-->
<!--    <div class="col-10">-->
<!--      <q-item-section class="q-ml-sm">-->
<!--        <q-item-label class="kmp-font-medium">{{post.title}}</q-item-label>-->
<!--        <q-item-label class="kmp-font-small">{{post.description}}</q-item-label>-->
<!--      </q-item-section>-->
<!--    </div>-->
    <div class="row col-11 q-my-xs items-center" @click="openPost(post.id)">
      <div class="col-1">
        <q-icon name="link" size="24px" class="q-mr-sm"/>
      </div>
      <div class="col-11">
        <q-item-section class="q-ml-sm">
          <q-item-label class="kmp-font-medium">{{post.title}}</q-item-label>
          <!--        <q-item-label class="kmp-font-small">{{post.description}}</q-item-label>-->
        </q-item-section>
      </div>
    </div>
    <div class="col-1 q-my-xs items-center text-right">
      <!--      <q-icon v-if="!is_manage" name="open_in_new" size="20px" class="" @click="openPost(post.id)"/>-->
      <!--      <q-icon v-if="is_manage" name="open_in_new" size="20px" class="" @click="openPost(post.id)"/>-->
      <q-icon v-if="is_openlink" name="content_copy" size="20px" class="" @click="handleCopy(post.id)"/>
      <q-icon v-if="is_manage" name="delete" size="20px" class="" @click="handleDelete(item.id)" />
    </div>
  </q-item>
</template>

<script>
import { getPostChannelList } from 'src/lib/api';
import { copyToClipboard } from 'quasar';

export default {
  props: ['item', 'post', 'manage', 'openlink'],
  data() {
    return {
      is_manage: false,
      is_openlink: true,
      baseurl: window.location.origin
    };
  },
  methods: {
    handleDelete(id) {
      this.$emit('delete_knowledge', id, id);
    },
    openPost(post_id) {
      getPostChannelList({ post_id }).then(res => {
        if (res.data) {
          // this.$router.push({
          //   name: 'channel-detail-post-detail',
          //   params: {
          //     id: res.data[0].channel_id,
          //     post_id
          //   }
          // });
          const routeData = this.$router.resolve({
            name: 'channel-detail-post-detail',
            params: {
              id: res.data[0].channel_id,
              post_id
            }
          });
          window.open(routeData.href, '_blank');
        }
      });
    },
    handleCopy(post_id) {
      getPostChannelList({ post_id }).then(res => {
        if (res.data) {
          const routeData = this.$router.resolve({
            name: 'channel-detail-post-detail',
            params: {
              id: res.data[0].channel_id,
              post_id
            }
          });
          copyToClipboard(this.baseurl + routeData.href).then(() => {
            this.$q.notify({
              message: 'Copy Success',
              timeout: 3000,
              color: 'positive',
              icon: 'done',
              position: 'bottom'
            });
          }).catch(() => {
            this.$q.notify({
              message: 'Copy Fail',
              timeout: 3000,
              color: 'negative',
              icon: 'done',
              position: 'bottom'
            });
          });
        }
      });
    }
  },
  watch: {
    manage: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.is_manage = value;
      }
    },
    openlink: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.is_openlink = value;
      }
    }
  },
  mounted() {}
};
</script>
