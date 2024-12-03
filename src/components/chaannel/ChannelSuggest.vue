<template>
  <div>
    <q-card>
        <div v-if="is_loading">
          <PostLoading :count="2" :isDashboard="true"/>
        </div>
        <div v-else="">
          <q-card-section>
            <q-scroll-area style="height: 459px;">
              <q-card class="my-card q-mb-md bg-grey-3 shadow-box shadow-2"
                      v-for="(item, index) in dataChannel"
                      :key="index"
              >
                <q-item>
                  <q-item-section avatar>
                    <q-avatar v-if="item.avatar" size="35px">
                      <img :src="item.avatar ? item.avatar_channel : 'https://cdn.quasar.dev/img/boy-avatar.png'">
                    </q-avatar>
                    <span v-else="">
                      <q-icon v-if="item.channel_type === 'COP'" name="group_add" class="text-neutral q-mr-sm" size="30px" />
                      <q-icon v-if="item.channel_type === 'Project'" name="chat_bubble" class="text-neutral q-mr-sm" size="30px" />
                      <q-icon v-if="item.channel_type === 'Hobby'" name="sports_esports" class="text-neutral q-mr-sm" size="30px" />
                    </span>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ item.name }}</q-item-label>
                    <q-item-label caption>{{ item.channel_type }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-card-section horizontal>
                  <q-card-section class="q-pt-xs">
                    <div class="text-caption text-grey-7">{{ item.description }}</div>
                  </q-card-section>

                  <!--
                  <q-space/>
                  <q-card-section class="col-5 flex flex-right">
                    <q-img
                      class="rounded-borders"
                      :src="item.banner ? item.banner_channel : 'https://via.placeholder.com/300x150.png?text=No+Banner'"
                    />
                  </q-card-section>
                  -->
                </q-card-section>

                <q-separator />

                <q-card-actions class="row justify-between">
                  <div>
                    <span class="text-caption text-grey-7 text-capitalize" style="font-size: 11px">Creator: {{ item.created_by_user.name.toLowerCase() }}</span>
                    <br/>
                    <span class="text-caption text-grey-7" style="font-size: 11px">{{ item.channel_member_count }} member berada di channel ini</span>
                  </div>
                  <q-space/>
                  <q-btn outline flat dense class="q-mr-none" color="primary" v-show="!item.is_private" @click="viewChannel(item)">
                    View
                  </q-btn>
                  <q-btn outline flat dense color="primary" style="font-size: 13px;"
                         v-if="item.is_private && item.channel_member.filter(f => { return f.users_id === loginId}).length > 0"
                         @click="joinCancelChannel(item.channel_member.find(f => { return f.users_id === loginId}).id)"
                         label="Waiting Approval"/>
                  <q-btn outline flat dense color="primary" style="font-size: 13px;" v-else="" @click="joinChannel(item)">
                    {{ item.is_private ? 'Request Join' : 'Join' }}
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-card-section>

          <q-card-section style="display: none;">
            <q-btn flat color="primary" class="full-width">
              More Suggestion Channel
            </q-btn>
          </q-card-section>
        </div>
      </q-card>

  </div>
</template>

<script>
import PostLoading from 'components/PostLoading';
import _ from 'lodash';
import { getLoginId } from 'src/lib/helper';
import { channelMemberCreate, channelMemberDelete } from 'src/lib/api';
import { point } from 'src/lib/point';

export default {
  name: 'ChannelSuggest',
  props: ['is_data'],
  components: { PostLoading },
  data() {
    return {
      is_loading: true,
      dataChannel: [],
      loginId: getLoginId()
    };
  },
  methods: {
    getChannelList(data) {
      _.forEach(data, v => {
        v.avatar_channel = `${process.env.QUASAR_API_URL}${v.avatar}`;
        v.banner_channel = `${process.env.QUASAR_API_URL}${v.banner}`;
      });
      this.dataChannel = data;
      setTimeout(() => {
        this.is_loading = false;
      }, 500);
    },
    joinChannel(data) {
      const params = {
        join_type: data.is_private ? 'Join' : 'Create',
        enabled: !data.is_private,
        channel_id: data.id,
        users_id: this.loginId,
        member_role: !data.is_private ? 'Member' : 'Request'
      };
      this.$q.dialog({
        title: 'Confirm',
        message: 'Anda yakin join channel ini?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.is_loading = true;
        channelMemberCreate(params).then(res => {
          if (res.message === 'OK') {
            this.$emit('update_suggest');
            this.$q.notify({
              message: 'Join member sucessfully.',
              color: 'blue'
            });
            // todo add point history
            if (data.channel_type === 'Project') {
              point('add', { tag: 'channel_follow_project', channel_id: data.id });
            } else if (data.channel_type === 'Hobby') {
              point('add', { tag: 'channel_follow_hobby', channel_id: data.id });
            } else {
              point('add', { tag: 'channel_follow_cop', channel_id: data.id });
            }
            // todo add point history
          }
        }).catch(err => {
          this.is_loading = false;
          this.$q.notify({
            message: 'Terjadi error pada aplikasi, hubungi admin segera!',
            color: 'red'
          });
        });
      });
    },
    joinCancelChannel(data) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Anda yakin cancel join channel ini?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.is_loading = true;
        channelMemberDelete(data).then(res => {
          if (res.message === 'OK') {
            this.$emit('update_suggest');
            this.$q.notify({
              message: 'Cancel join member sucessfully.',
              color: 'blue'
            });
          }
        }).catch(err => {
          this.is_loading = false;
          this.$q.notify({
            message: 'Terjadi error pada aplikasi, hubungi admin segera!',
            color: 'red'
          });
        });
      });
    },
    viewChannel(data) {
      this.$router.push({
        name: 'channel-detail',
        params: {
          id: data.id
        }
      });
    }
  },
  computed: {
  },
  watch: {
    is_data: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.getChannelList(value);
        }
      }
    }
  }
};
</script>

<style scoped>

</style>
