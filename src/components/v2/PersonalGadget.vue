<template>
  <div>
    <q-card class="q-mb-md kmp-new-font"
    >
    <q-card-section>
      <q-item class="q-pa-none">
        <q-item-section side class="q-pr-sm cursor-pointer">
          <Avatar size="xl" :picture="user_new.picture ? `./api${user_new.picture}` : ''" :name="user_new.name"
                  @click="clickMyProfile"/>
        </q-item-section>
        <q-item-section class="q-pa-none kmp-black-text">
          <q-item-label class="kmp-md-text kmp-bold-text kmp-line-125 link-underscore">{{ user_new.name }}</q-item-label>
          <q-item-label class="kmp-xs-text kmp-normal-text kmp-line-125">{{ user_new.unit_kerja }}</q-item-label>
        </q-item-section>
        <q-item-section side @click="clickMyProfile">
          <div class="q-mb-sm cursor-pointer text-right"><q-icon style="color: #AAAAAA" name="arrow_forward_ios" size="16px"/></div>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <q-item side class="q-pa-sm box-yellow-gadget" style="border-radius: 4px;">
        <q-item-section side class="q-pr-sm cursor-pointer">
            <q-icon size="26px" class="q-mr-xs" :style="{color: getPaletteColor(point_user.icon_color+'-8')}" :name="point_user.icon_name"/>
        </q-item-section>
        <q-item-section class="q-pa-none kmp-black-text">
          <q-item-label class="kmp-xs-text kmp-bold-text kmp-line-125">
           {{ point_user.remark }}
          </q-item-label>
          <q-item-label class="kmp-xs-text kmp-bold-text kmp-line-125" style="margin-top:  0px !important;">
            {{point_user.point ? point_user.point.toLocaleString() : '0'}} pts
          </q-item-label>
        </q-item-section>
        <q-item-section class="q-pa-none kmp-black-text">
          <q-item-label class="kmp-xs-text kmp-normal-text kmp-line-125 text-right">
            <span class="kmp-bold-text">{{point_user.final_point ? point_user.final_point.toLocaleString() : '0'}}</span> LXP
          </q-item-label>
          <q-item-label class="kmp-xs-text kmp-normal-text kmp-line-125 text-right">
            to next level
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="q-pa-none">
        <q-item-section>
          <q-item side class="q-pa-sm box-blue-gadget" style="border-radius: 4px;margin-top: 8px !important;">
            <q-item-section side class="q-pr-sm cursor-pointer">
              <q-img src="../../assets/images/v2/poin.png" style="width: 18px;height: 18px;"/>
            </q-item-section>
            <q-item-section class="q-pa-none kmp-black-text">
              <q-item-label class="kmp-xs-text kmp-line-125">
                <span class="kmp-bold-text">0</span><span class="kmp-normal-text"> Points</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-item-section>
        <q-item-section>
          <q-item side class="q-pa-sm box-green-gadget" style="border-radius: 4px;margin-top: 8px !important;">
            <q-item-section side class="q-pr-sm cursor-pointer">
              <q-img src="../../assets/images/v2/credit.png" style="width: 18px;height: 18px;"/>
            </q-item-section>
            <q-item-section class="q-pa-none kmp-black-text">
              <q-item-label class="kmp-xs-text kmp-bold-text kmp-line-125">
                <span class="kmp-bold-text">0</span><span class="kmp-normal-text"> Credits</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-item-section>
      </q-item>
      <q-item-label class="q-my-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Recommended Task</q-item-label>
      <q-item class="q-pa-sm box-gray-gadget" style="border-radius: 4px;">
        <q-item-section side class="q-pr-sm cursor-pointer">
          <q-badge size="30px" class="kmp-xs-text kmp-bold-text kmp-line-125" style="border-radius: 2px;background: var(--opacity-system-green-80, rgba(38, 185, 114, 0.80));">
            x5
          </q-badge>
        </q-item-section>
        <q-item-section class="q-pa-none kmp-black-text">
          <q-item-label class="kmp-xs-text kmp-normal-text kmp-line-125">
          <!-- <q-item-label> -->
            Post a content in channel #general or #unit_kerja
          </q-item-label>
        </q-item-section>
        <!-- <q-item-section class="q-pa-none items-end"> -->
        <q-item-section side>
          <q-item-label style="color: #119656;" class="kmp-xs-text kmp-bold-text kmp-line-125 text-right">
            +50 pts
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <q-list class="text-primary">
        <!-- <q-item
          class="gadget-menu-left q-mb-sm kmp-sm-text kmp-normal-text"
          dense
          clickable
          v-ripple
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="bookmark_border" class="" size="16px"/>
          </q-item-section>
          <q-item-section class="kmp-line-130 kmp-black-text">My Bookmark</q-item-section>
        </q-item> -->
        <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm">
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="bookmark_border" size="16px" :class="active === false ? 'kmp-black-text' : ''"/>
          </q-item-section>
          <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text" :class="active === false ? 'kmp-black-text' : ''">My Bookmark</q-item-section>
        </q-item>
        <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm">
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <Icon icon="cil:school" :class="active === false ? 'kmp-black-text' : ''" width="16" height="16" />
          </q-item-section>
          <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text" :class="active === false ? 'kmp-black-text' : ''">My Training</q-item-section>
        </q-item>
        <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm">
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <!-- <q-icon name="o_emoji_events" :class="active === false ? 'kmp-black-text' : ''" size="16px"/> -->
            <Icon icon="solar:cup-outline" :class="active === false ? 'kmp-black-text' : ''" width="16" height="16" />
          </q-item-section>
          <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text" :class="active === false ? 'kmp-black-text' : ''">My Leaderboard</q-item-section>
        </q-item>
        <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary">
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <!-- <q-icon name="support_agent" :class="active === false ? 'kmp-black-text' : ''" size="16px"/> -->
            <Icon icon="streamline:customer-support-1" :class="active === false ? 'kmp-black-text' : ''" width="16" height="16" />
          </q-item-section>
          <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text" :class="active === false ? 'kmp-black-text' : ''">Helpdesk</q-item-section>
        </q-item>
        <!-- <q-item
          class="gadget-menu-left q-mb-sm kmp-sm-text kmp-normal-text"
          dense
          clickable
          v-ripple
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="o_school" class="" size="16px"/>
          </q-item-section>
          <q-item-section class="kmp-line-130 kmp-black-text">My Training</q-item-section>
        </q-item> -->
        <!-- <q-item
          class="gadget-menu-left kmp-sm-text kmp-normal-text"
          dense
          clickable
          v-ripple
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="o_emoji_events" class="" size="16px"/>
          </q-item-section>
          <q-item-section class="kmp-line-130 kmp-black-text">My Leaderboard</q-item-section>
        </q-item> -->
      </q-list>
    </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { colors } from 'quasar';
import { Icon } from '@iconify/vue2';
import { getUserLogin } from 'src/lib/helper';
import { getCredential } from 'src/lib/storage';
import { leaderboardMemberByMemberIdPointHistory } from 'src/lib/api';
import Avatar from '../../components/common/Avatar';

const { getPaletteColor } = colors;

export default {
  components: { Icon, Avatar },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      getPaletteColor,
      user_new: {
        id: '',
        name: '',
        initial: '',
        unit_kerja: ''
      },
      profile_picture: getUserLogin().profile_picture
        ? process.env.QUASAR_API_URL + getUserLogin().profile_picture
        : null,
      profile_name: getUserLogin().name,
      point_user: {},
      active: false,
      slide: 'style',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  },
  methods: {
    getUser() {
      const user = getCredential();
      const profile_user = JSON.parse(user.rawProfile);
      this.profileRole = profile_user;
      this.user_new = {
        id: profile_user.id,
        name: profile_user.name,
        picture: user.userPic === null ? profile_user.profile_picture : user.userPic,
        initial: profile_user.name
          .match(/\b(\w)/g)
          .join('')
          .toUpperCase(),
        unit_kerja: profile_user.unit_kerja.name
      };
      this.getPoint();
    },
    async getPoint() {
      const res = await leaderboardMemberByMemberIdPointHistory(this.user_new.id);
      this.point_user = (res.data.length === 0) ? {
        point: 0,
        level_name: 'Star 1',
        remark: 'Newbie',
        icon_name: 'stars',
        icon_color: '#FEB82D',
        final_point: 200,
        percent_point: 0
      } : res.data[0];
    },
    clickMyProfile() {
      this.$router.push({
        name: 'profile'
      });
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>
