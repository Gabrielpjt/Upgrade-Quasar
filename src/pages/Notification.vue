<template>
  <q-page>
    <LeftBar/>
    <NotifBar/>
    <div style="margin-top: 70px">
      <div :class="$q.platform.is.mobile ? 'row q-px-lg q-col-gutter-lg column reverse' : 'row q-px-lg q-col-gutter-lg'">
        <div class="col-12 col-md-6">
          <div class="row q-mb-sm items-center">
            <div class="text-weight-bold kmp-font-lg">Notification Messages</div>
          </div>
          <div class="row q-gutter-md">
            <div :class="$q.platform.is.mobile ? 'col-12 q-pr-md' : 'col'">
              <q-card class="q-px-sm">
                <q-card-section>
                  <NotifContent/>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div :class="$q.platform.is.mobile ? 'col-12' : 'col-6 q-mb-lg'">
          <div :class="$q.platform.is.desktop ? 'kmp-sticky' : ''">
            <Action
              :data="dataAction.expertise" v-if="dataAction.expertise.list.length >0 && isAuthorized()"
              @refresh="onRefresh" :class="$q.platform.is.mobile ? '' : 'q-mb-lg'"/>
            <Action
              :data="dataAction.knowlege" v-if="dataAction.knowlege.list.length >0 && isAuthorized()"
              @refresh="onRefresh" :class="$q.platform.is.mobile ? '' : 'q-mb-lg'"/>
            <Action
              :data="dataAction.profile" v-if="dataAction.profile.list.length >0 && isAuthorized()"
              @refresh="onRefresh" :class="$q.platform.is.mobile ? '' : 'q-mb-lg'"/>
            <Action
              :data="dataAction.training" v-if="dataAction.training.list.length >0"
              @refresh="onRefresh" :class="$q.platform.is.mobile ? '' : 'q-mb-lg'"/>


            <!-- todo tambahan component Action disini untuk membuat action baru -->

          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import NotifBar from 'components/NotifBar';
import NotifContent from 'components/notif/NotifContent.vue';
import Action from 'components/notif/Action.vue';
import { checkRole } from 'src/lib/helper';
import { UserUk } from 'src/lib/api';
import { getCredential } from 'src/lib/storage';
import { kmapGetExpertise, kmapGetKnowledge } from 'components/notif/ActionKmap';
import { getRequestProfile } from 'components/notif/ActionProfile';
import { trainingGetParticipant } from 'components/notif/ActionTraining';

export default {
  components: { Action, LeftBar, NotifBar, NotifContent },
  data() {
    return {
      loading: false,
      roles: ['km_manager', 'channel_manager', 'content_manager'],
      current_user: {},
      dataAction: {
        expertise: {
          type: 'kmap',
          actionTitle: 'Pending Expertise Request',
          modalTitle: 'Request as Expertise',
          list: []
        },
        knowlege: {
          type: 'kmap',
          actionTitle: 'Pending Knowledge Request',
          modalTitle: 'Submit Knowledge Request',
          list: []
        },
        profile: {
          type: 'profile',
          actionTitle: 'Pending Profile Request',
          modalTitle: 'Submit Profile Request',
          list: []
        },
        current_role: '',
        training: {
          type: 'training',
          actionTitle: 'Pending Training Participant Request',
          modalTitle: 'Submit Training Participant Request',
          list: []
        },
        external_training: {
          type: 'external_training',
          actionTitle: 'Pending External Training Request',
          modalTitle: 'Submit External Training Request',
          list: []
        }
        // todo tambahkan config disini untuk membuat action baru
      }
    };
  },
  watch: {},
  mounted() {
    const user = getCredential();
    this.current_user = JSON.parse(user.rawProfile);
    this.current_role = checkRole().name;
    this.getCurrentDirektorat();
    this.onRefresh();
  },
  methods: {
    onRefresh() {
      setTimeout(async () => {
        this.dataAction.expertise.list = await kmapGetExpertise();
        if (this.dataAction.expertise.list.length > 0 && (this.current_role === 'channel_manager' || this.current_role === 'content_manager')) {
          const exp = this.dataAction.expertise.list.filter(x => x.extra.unit_kerja === this.current_user.unit_kerja);
          this.dataAction.expertise.list = exp;
        }
        this.dataAction.knowlege.list = await kmapGetKnowledge();
        if (this.dataAction.knowlege.list.length > 0 && (this.current_role === 'channel_manager' || this.current_role === 'content_manager')) {
          const exp_knowledge = this.dataAction.knowlege.list.filter(x => x.extra.unit_kerja === this.current_user.unit_kerja);
          this.dataAction.knowlege.list = exp_knowledge;
        }
        // this.dataAction.profile.list = await getRequestJabatan();
        this.dataAction.training.list = await trainingGetParticipant();
        this.dataAction.profile.list = await getRequestProfile();
        // todo tambahkan line di atas untuk mengambil data action
      }, 500);
    },
    isAuthorized() {
      if (this.roles.includes(checkRole().name) && checkRole().name === 'channel_manager' && this.current_user.organization) {
        if (this.current_user.organization === this.channel_model.label) return true;
        return false;
      }
      return this.roles.includes(checkRole().name);
    },
    getCurrentDirektorat() {
      UserUk(this.current_user.id).then(res => {
        this.current_user.unit_kerja = res.data.unit_kerja.name;
        console.log(this.current_user.unit_kerja);
      });
    }
  }
};
</script>

<style>
.my-card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.text-neutral {
  color: #65738F;
}
</style>
