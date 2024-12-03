<template>
  <q-page>
    <LeftBar v-if="$route.name === 'smart-report'"/>
    <q-page-sticky expand position="top" class="kmp-bar" v-if="$route.name !== 'smart-report'">
      <q-toolbar class="">
        <span class="cursor-pointer text-h6 kmp-text-grey-2 q-ml-md" @click="$router.push({ name: 'login' })"> &lt;&nbsp;&nbsp;Back</span>
      </q-toolbar>
    </q-page-sticky>
    <div class="row q-pa-lg kmp-content" :style="$route.name !== 'smart-report' ? 'padding-top: 50px' : ''">
      <div class="col-12 col-md-6" v-if="$route.name === 'smart-report'">
        <div :class="$q.platform.is.mobile ? 'q-pb-md' : 'q-pb-md q-pr-md'">
          <q-card class="kmp-card-rounded">
            <q-card-section>
              <div class="row">
                <div class="col q-px-none">
                  <div class="row justify-between">
                    <div class="kmp-smart-report-title q-pl-sm">Guideline</div>
                  </div>
                  <div class="col-12 kmp-smart-report-bg q-pa-md q-my-sm" style="border-radius: 10px; min-height:340px">
                    <div class="row justify-center items-center q-my-lg">
                      <q-icon
                        color="#4f4f4f"
                        size="80px"
                        name="o_fact_check"
                      />
                    </div>
                    <div class="kmp-smart-report-text">Bila anda kesulitan dalam menggunakan Aplikasi SMART, anda bisa mempelajari panduan berikut</div>
                    <div class="row justify-center items-center q-my-sm">
                      <div class="q-mx-md"><q-btn color="km-blue" no-caps label="Go To Guideline" @click="$router.replace({ name: 'guidelines-list' }).catch(() => {});"/></div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div :class="$q.platform.is.mobile ? 'q-pb-md' : 'q-pb-md q-pr-md'">
          <q-card class="kmp-card-rounded">
            <q-card-section>
              <div class="row">
                <div class="col q-px-none">
                  <div class="row justify-between">
                    <div class="kmp-smart-report-title q-pl-sm">Help</div>
                  </div>
                  <div class="col-12 kmp-smart-report-bg q-pa-md q-my-sm" style="border-radius: 10px; min-height:340px">
                    <div class="row justify-center items-center text-center q-my-lg">
                      <q-img src="../assets/images/icon-help.png" style="width:80px; height:80px" />
                      <!-- <q-icon
                        color="black"
                        size="80px"
                        name="help_center"
                      /> -->
                    </div>
                    <div class="kmp-smart-report-text">Bila anda memiliki kendala teknis dalam menggunakan Aplikasi SMART, hubungi Tim IT kami</div>
                    <div class="row justify-center items-center q-my-sm">
                      <div class="q-mx-md"><q-btn color="km-blue" no-caps label="Go To Helpdesk" @click="doOpenWAEldy()" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div :class="$q.platform.is.mobile ? 'q-pb-md' : 'q-pb-md q-pr-md'">
          <q-card class="kmp-card-rounded">
            <q-card-section>
              <div class="row">
                <div class="col q-px-none">
                  <div class="row justify-between">
                    <div class="kmp-smart-report-title q-pl-sm">Contact Us</div>
                  </div>
                  <div class="col-12 kmp-smart-report-bg q-pa-md q-my-sm" style="border-radius: 10px; min-height:340px">
                    <div class="kmp-smart-report-text q-my-md">Bila anda memiliki pertanyaan atau ingin berkonsultasi seputar implementasi Knowledge Management hubungi kami</div>
                    <div class="row justify-center items-center text-center q-my-md q-mx-sm">
                      <div :class="$q.platform.is.mobile ? 'col-12 col-md-4 q-mb-lg' : 'col-12 col-md-4'">
                        <q-avatar v-if="data_sandri !== null" bordered :size="windowHeight > 700 ? '150px' : '100px'" style="border-color: #FFFFFF" class="q-mb-lg">
                          <img v-if="data_sandri.profile_picture !== null" :src="data_sandri.profile_picture">
                          <q-avatar bordered :size="windowHeight > 700 ? '150px' : '100px'" style="border-color: #FFFFFF" color="primary" text-color="white" v-else>
                            {{ data_sandri.name.match(/\b(\w)/g).join('').toUpperCase() }}
                          </q-avatar>
                        </q-avatar>
                        <div :class="$q.platform.is.mobile ? 'kmp-smart-report-title-mb' : 'kmp-smart-report-title'">Sandri Justiana</div>
                        <q-btn color="km-blue" no-caps label="Konsultan 1" @click="doOpenWASandri()" :size="$q.platform.is.mobile ? 'md' : 'md'"/>
                      </div>
                      <div class="col-12 col-md-4">
                        <q-avatar v-if="data_lufti !== null" bordered :size="windowHeight > 700 ? '150px' : '100px'" style="border-color: #FFFFFF" class="q-mb-lg">
                          <img v-if="data_lufti.profile_picture !== null" :src="data_lufti.profile_picture">
                          <q-avatar bordered :size="windowHeight > 700 ? '150px' : '100px'" style="border-color: #FFFFFF" color="primary" text-color="white" v-else>
                            {{ data_lufti.name.match(/\b(\w)/g).join('').toUpperCase() }}
                          </q-avatar>
                        </q-avatar>
                        <div :class="$q.platform.is.mobile ? 'kmp-smart-report-title-mb' : 'kmp-smart-report-title'">Lufti Avianto</div>
                        <q-btn color="km-blue" no-caps label="Konsultan 2" @click="doOpenWALufti()" :size="$q.platform.is.mobile ? 'md' : 'md'"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import { UserById } from 'src/lib/api';

export default {
  components: { LeftBar },
  data() {
    return {
      isLoading: false,
      isDisableEdit: true,
      rating_star: 0,
      suggestions: '',
      user: {},
      data_lufti: null,
      data_sandri: null,
      windowHeight: window.innerHeight
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    doOpenTutorial() {
      window.open('https://aclc.kpk.go.id/smart/');
    },
    doOpenWAEldy() {
      window.open('//api.whatsapp.com/send?phone=6282251561186&text=Saya memiliki kendala teknis dalam menggunakan Aplikasi SMART...');
    },
    doOpenWALufti() {
      window.open('//api.whatsapp.com/send?phone=6287876000676&text=Saya memiliki pertanyaan dan ingin berkonsultasi seputar implementasi Knowledge Management...');
    },
    doOpenWASandri() {
      window.open('//api.whatsapp.com/send?phone=6282116517172&text=Saya memiliki pertanyaan dan ingin berkonsultasi seputar implementasi Knowledge Management...');
    },
    getUser() {
      UserById(6)
        .then(response => {
          this.data_lufti = response.data;
          this.data_lufti.profile_picture = this.data_lufti.profile_picture ? process.env.QUASAR_API_URL + this.data_lufti.profile_picture : null;
        });
      UserById(5)
        .then(response => {
          this.data_sandri = response.data;
          this.data_sandri.profile_picture = this.data_sandri.profile_picture ? process.env.QUASAR_API_URL + this.data_sandri.profile_picture : null;
        });
    }
  }
};
</script>
