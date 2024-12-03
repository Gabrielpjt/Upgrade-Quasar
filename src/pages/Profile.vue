<template>
  <q-page>
    <LeftBar/>
    <ProfileBar :data_own="myProfile"/>
    <div class="row q-px-lg q-pt-lg q-pb-md kmp-content">
      <div class="col-12">
        <ProfileInfo :loading="is_loading"
                     :data_user="data_user"
                     :data_own="myProfile"
                     :data_level="select_level"
                     :data_channel="myChannel"
                     :data_badges="myBadges"
                     @evtSaveProfile="handleSaveProfile"
                     :loginId="loginId"
        />
      </div>
    </div>
    <q-separator class="q-mx-lg" />
    <div class="row q-pa-lg kmp-content">
      <div class="col-12">
        <div class="text-h6 text-weight-bold">Smart Journey</div>
        <div class="text-subtitle2 text-grey-7">Dapatkan banyak poin dengan melakukan banyak aktifitas di dalam SMART KPK.</div>
      </div>
    </div>
    <div class="row q-px-lg q-pb-lg kmp-content">
      <div class="col-12">
        <Gamification :loading="is_loading"
                     :data_user="data_user"
                     :data_own="myProfile"
                     :data_level="select_level"
                     :data_channel="myChannel"
                     @evtSaveProfile="handleSaveProfile"
                     :loginId="loginId"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import ProfileBar from 'components/profile/ProfileBar';
import ProfileInfo from 'components/profile/ProfileInfo';
import { dateFormat, getLoginId, urlify } from 'src/lib/helper';
import Gamification from 'components/profile/Gamification';
import {
  getPointHistory,
  pointLevelList,
  profileDetail
} from '../lib/api';
// import ChannelBar from 'components/ChannelBar';

export default {
  components: { Gamification, LeftBar, ProfileBar, ProfileInfo },
  data() {
    return {
      is_loading: true,
      data_user: [],
      myProfile: false,
      option_level: [],
      select_level: null,
      myChannel: [],
      myBadges: [],
      loginId: getLoginId
    };
  },
  methods: {
    getProfile(id) {
      if (id === undefined) { id = getLoginId(); }
      this.is_loading = true;
      let optLevel = [];
      let dataProfile = null;
      pointLevelList().then(res => {
        optLevel = res.data;
        this.option_level = res.data;
      });
      profileDetail(id).then(response => {
        response.data.post.forEach(v => {
          if (v.article !== '' && v.article !== null) {
            const idxStart = v.article.indexOf('<img');
            const idxEnd = v.article.indexOf('>', v.article.indexOf('<img'));
            if (idxStart > -1 && idxEnd > -1) {
              v.cover = v.article.substring(idxStart, idxEnd + 1);
            }
          }
          if (v.post_type === 'Post' || v.post_type === 'Post Document' || v.post_type === 'Post Image' || v.post_type === 'Post Video') {
            v.scan = urlify(v.description);
          }
          if (v.post_type === 'Poll') {
            v.poll_user_participant = [];
            v.poll_options = v.poll.poll_choice.map(m => (
              { value: m.id, label: m.text, picture: m.picture }
            ));
            v.poll_choice_id = null;
            v.poll.end_date_format = dateFormat(v.poll.end_date);
            v.poll_expired = new Date() > new Date(v.poll.end_date);
            v.poll.poll_choice.forEach(e => { e.poll_participant.forEach(m1 => v.poll_user_participant.push(m1.users_id)); });
            v.poll.poll_choice.forEach(f => {
              f.value = f.id;
              f.label = f.text;
              f.scan = urlify(f.label);
              f.persentase = v.poll_user_participant.length > 0
                ? ((f.poll_participant.length / v.poll_user_participant.length) * 100).toFixed() : 0;
              f.choice = false;
            });
          }
        });
        dataProfile = response.data;
        this.data_user = response.data;
        this.myProfile = response.data.id === getLoginId();
        this.is_loading = false;
        if (optLevel.length !== 0 && dataProfile.poin !== null) {
          this.select_level = optLevel.find(v => {
            return v.point_max > dataProfile.poin.poin || v.point_max === dataProfile.poin.poin;
          });
        } else {
          this.select_level = optLevel.find(v => { return v.id === 1; });
        }
      });
    },
    handleSaveProfile() {
      setTimeout(() => {
        this.getProfile(this.$route.params.id);
      }, 1000);
      // window.location.reload();
    },
    getChannel() {
      const id = getLoginId();
      profileDetail(id).then(res => {
        this.myChannel = res.data.channel_member.map(v => v.channel_id);
      });
    },
    getBadges(id) {
      const data = {
        module: 'Badge',
        member: id
      };
      getPointHistory(data).then(res => {
        this.myBadges = res.data;
      });
    }

  },
  watch: {
    '$route.params.id': {
      immediate: true,
      deep: true,
      handler(value) {
        this.getProfile(value);
        this.getChannel();
        this.getBadges(value);
        // this.selected_channel = parseInt(value, 10);
      }
    }
  },
  mounted() {}
};
</script>

<style>
.my-card{
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.text-neutral {
  color: #65738F;
}
</style>
