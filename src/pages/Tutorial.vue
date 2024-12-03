<template>
  <q-page>
    <LeftBar/>
    <TutorialBar/>
    <div :class="$q.platform.is.mobile ? 'row q-mt-lg q-pa-lg kmp-content column reverse' : 'row q-mt-lg q-pa-lg kmp-content'">
      <div class="col-12 q-mt-lg col-md-8">
        <!-- VPN -->
        <div :class="$q.platform.is.mobile ? 'q-pb-md' : 'q-pb-md q-pr-md'" v-if="selected === 'Installation VPN'">
          <q-card class="my-card" flat bordered>
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/vpn1.jpeg"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">1. Capsule Check Point VPN</div>
                <div class="text-caption text-grey">
                  VPN yang digunakan adalah Check Point Capsule Connect berikut linknya untuk pengguna android <q-icon name="o_cloud_download" @click="doVpnAndro()" class="text-primary cursor-pointer"/> dan untuk pengguna apple <q-icon name="o_cloud_download" @click="doVpnIphone()" class="text-primary cursor-pointer"/> .
                </div>
              </q-card-section>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/vpn2.png"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">2. Langkah Pertama</div>
                <div class="text-caption text-grey"> Ketika telah didownload dan diinstall, tampilan awal pada aplikasi yang muncul adalah sebagai berikut.
                  Tekan <q-btn outline color="gray" size="xs" label="Continue" /> untuk melakukan pengaturan VPN.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/vpn3.png"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">3. Langkah Kedua</div>
                <div class="text-caption text-grey">
                  Masukan Name dan Server dengan isian sebagai berikut:<br/>
                  Name: KPK<br/>
                  Server: vp3.kpk.go.id<br/>
                  Setelah terisi seperti gambar diatas maka tekan tombol <q-btn style="background: gray; color: white" size="xs" label="Create" />.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/vpn4.png"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">4. Langkah Ketiga</div>
                <div class="text-caption text-grey">
                  Tampilan dari halaman akan berlanjut ke halaman berikut, tekan tombol <q-btn style="background: gray; color: white" size="xs" label="Trust" />
                  untuk melanjutkan pengaturan.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/vpn5.png"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">5. Langkah Keempat</div>
                <div class="text-caption text-grey">
                  Tampilan akan berlanjut dengan menampilkam opsi metode untuk autentikasi, pilihlah Username and Password.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/vpn6.png"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">6. Langkah Kelima</div>
                <div class="text-caption text-grey">
                  Tampilan akan tampil dengan meminta Username dan Password.<br/>
                  Masukan username dan password kantor untuk autentifikasi.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
          </q-card>
        </div>
        <!-- ANDROID -->
        <div :class="$q.platform.is.mobile ? 'q-pb-md' : 'q-pb-md q-pr-md'" v-if="selected === 'Installation SMART Mobile for Android'">
          <q-card class="my-card" flat bordered>
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/andro1.jpeg"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">1. Langkah Pertama</div>
                <div class="text-caption text-grey">Akses link <q-icon name="o_web" size="sm" class="text-primary cursor-pointer" @click="doSmart()"/> melalui browser, aplikasi SMART ini akan optimal jika diakses melalui browser Google Chrome untuk android.
                </div>
              </q-card-section>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/andro2.jpeg"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">2. Langkah Kedua</div>
                <div class="text-caption text-grey"> Tampilan halaman login pada Smart akan menampilkan kotak dialog install App. <br/>
                  Tekan <q-btn style="background: gray; color: white" size="xs" label="Install" /> pada pilihan dari kotak dialog. Jika dialog box lanjut kebagian selanjutnya.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/andro3.png"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">3. Langkah Ketiga</div>
                <div class="text-caption text-grey">Jika tidak muncul kotak dialog maka anda bisa menekan bagian kanan paling atas dengan icon <q-btn padding="xs" color="grey" size="xs" icon="more_vert" />
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/andro4.png"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">4. Langkah Keempat</div>
                <div class="text-caption text-grey"> Setelah menekan icon tersebut maka akan menampilkan kotak dialog, pilih opsi <b>Instal Aplikasi</b>.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/andro5.jpeg"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">5. Langkah Kelima</div>
                <div class="text-caption text-grey">
                  Buka Aplikasi yang ada pada handphone dengan nama SMART Mobile. Tampilan setelah login akan seperti berikut.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
          </q-card>
        </div>
        <!-- IPHONE -->
        <div :class="$q.platform.is.mobile ? 'q-pb-md' : 'q-pb-md q-pr-md'" v-if="selected === 'Installation SMART Mobile for Iphone'">
          <q-card class="my-card" flat bordered>
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/iphone1.jpeg"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">1. Langkah Pertama</div>
                <div class="text-caption text-grey">
                Akses halaman SMART Mobile <q-icon name="o_web" size="sm" class="text-primary cursor-pointer" @click="doSmart()"/> melalui browser safari.
                Ketika telah di halaman login tekan <q-btn padding="xs" color="grey" size="xs" icon="more_horiz" /> pada bagian kanan bawah.</div>
              </q-card-section>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/iphone2.jpeg"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">2. Langkah Kedua</div>
                <div class="text-caption text-grey"> Tampilan halaman login pada Smart akan menampilkan kotak dialog install App. <br/>
                  Tekan <q-btn style="background: gray; color: white" size="xs" label="Install" /> pada pilihan dari kotak dialog. Jika dialog box lanjut kebagian selanjutnya.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/iphone3.jpeg"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">3. Langkah Ketiga</div>
                <div class="text-caption text-grey">
                  Tampilan akan muncul menjadi kotak dialog yang memiliki banyak opsi, pilihlah perintah
                  bagian <b>Tambahkan ke Layar Utama</b>.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
            <q-separator inset />
            <q-card-section :horizontal="$q.platform.is.mobile ? false : true">
              <q-card-section class="col-3 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="../assets/images/tutorial/iphone4.jpeg"
                />
              </q-card-section>

              <q-card-section class="q-pt-xs">
                <div class="text-overline">4. Langkah Keempat</div>
                <div class="text-caption text-grey">Cari Aplikasi dengan nama SMART Mobile, dan tampilan setelah login seperti berikut.
                </div>
              </q-card-section>
              <q-separator/>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-md-4 q-mt-lg col-xs-12">
        <div class="items-start kmp-sticky" style="position: -webkit-sticky;position: sticky;top: 146px">
          <q-card class="my-card q-py-md q-px-sm">
            <q-card-section class="q-py-xs">
              <div class="row items-center">
                <span><q-icon name="system_update" class="text-neutral q-mr-sm" size="30px"/> </span>
                <span class="text-neutral kmp-font-bold kmp-font-lg">Panduan Instalasi SMART Mobile</span>
                <q-space></q-space>
              </div>
            </q-card-section>
            <q-card-section class="q-py-xs q-pt-none">
            </q-card-section>
            <q-card-section class="q-py-xs q-pt-md">
              <div class="row items-center">
                <span class="text-neutral kmp-font-md">This page contains tutorials for installing VPN and SMART KPK applications</span>
              </div>
            </q-card-section>
            <q-scroll-area :style="{
              height: '200px',
              minHeight: '200px'
            }">
              <q-card-section class="q-py-xs">
                 <q-tree
                    :nodes="tutor"
                    node-key="label"
                    selected-color="primary"
                    v-model:selected="selected"
                    default-expand-all
                  />
              </q-card-section>
            </q-scroll-area>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import TutorialBar from 'components/tutorial/TutorialBar';
import { UserById } from 'src/lib/api';

export default {
  components: { LeftBar, TutorialBar },
  data() {
    return {
      isLoading: false,
      isDisableEdit: true,
      rating_star: 0,
      suggestions: '',
      user: {},
      data_lufti: null,
      data_sandri: null,
      windowHeight: window.innerHeight,
      selected: 'Installation VPN',
      tutor: [
        {
          label: 'Tutorial',
          icon: 'system_update',
          children: [
            {
              label: 'Installation VPN'
            },
            {
              label: 'Installation SMART Mobile for Android'
            },
            {
              label: 'Installation SMART Mobile for Iphone'
            }
          ]
        }
      ]
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
    },
    doVpnAndro() {
      window.open('https://play.google.com/store/apps/details?id=com.checkpoint.VPN');
    },
    doVpnIphone() {
      window.open('https://apps.apple.com/id/app/check-point-capsule-connect/id506669652');
    },
    doSmart() {
      window.open('https://smart-app.kpk.go.id/');
    }
  }
};
</script>
