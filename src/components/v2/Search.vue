<template>
  <div>
    <q-list separator class="bg-white kmp-new-font" style="border-radius: 8px;">
      <q-item clickable v-ripple class="q-px-md kmp-y-padding search-list-1" @click="openModalSearch()">
        <!-- <q-item-section avatar style="padding-right: 0px !important">
          <q-icon size="16px" class="kmp-black-text" name="search" />
        </q-item-section>
        <q-item-section class="kmp-md-text kmp-normal-text kmp-line-125">Search anything here using advanced search</q-item-section> -->
        <div class="q-mr-sm">
          <Icon icon="lets-icons:search-alt" color="#363638" width="16" />
        </div>
        <div class="kmp-md-text kmp-normal-text kmp-line-125">
          Search anything here using advanced search
        </div>
      </q-item>
      <q-item clickable v-ripple class="q-px-md kmp-y-padding search-list-2" @click="openModalCreateKnowledge()">
        <!-- <q-item-section avatar>
          <q-item-label>
            <span class="q-mt-sm">
              <Icon icon="la:edit-solid" color="#363638" width="16" height="16" />
            </span>
            Create new knowledge or ask the expert here...
          </q-item-label>
        </q-item-section> -->
        <div class="q-mr-sm">
          <Icon icon="bx:edit" color="#363638" width="16" height="16" />
        </div>
        <div class="kmp-md-text kmp-normal-text kmp-line-125">
          <b>Create new knowledge</b> or <b>ask the expert</b> here...
        </div>
      </q-item>
    </q-list>
    <q-dialog v-model="modal_search" persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 500px'" class="q-py-md">
        <q-card-section>
          <q-icon name="close" size="24px" class="text-neutral float-right desktop-only" v-close-popup/>
        </q-card-section>
        <q-card-section class="q-pb-none q-mt-md">
          <q-input ref="direktorat_filter" outlined dense v-model="direktorat_filter" debounce="500" placeholder="Search Something">
            <template v-slot:append>
              <q-icon name="close" v-if="search_filter !== ''" @click="search_filter = ''"
                      class="cursor-pointer"/>
              <q-icon name="search" v-if="search_filter === ''"/>
            </template>
          </q-input>
        </q-card-section>
        <q-separator class="q-mt-lg"/>
        <q-card-section class="q-pt-md">
          <div class="text-form"> Narrow your search</div>
          <q-checkbox v-model="checkbox_knowledge" right-label label="Knowledge" color="Blue" />
          <q-checkbox v-model="checkbox_post" right-label label="Post" color="Blue" />
          <q-checkbox v-model="checkbox_kmap" right-label label="KMAP" color="Blue" />
          <q-checkbox v-model="checkbox_channel" right-label label="Channel" color="Blue" />
          <q-checkbox v-model="checkbox_training" right-label label="Training" color="Blue" />
          <q-checkbox v-model="checkbox_member" right-label label="Member" color="Blue" />
        </q-card-section>
        <q-separator class=""/>
        <q-card-section class="q-pt-md">
          <div class="text-form"> Recent searches</div>
          <q-item clickable style="border-radius: 4px;" v-ripple active-class="text-primary" class="">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
              <q-icon name="search" size="16px" />
            </q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">implementasi gratifikasi di kantor</q-item-section>
            <q-icon name="close" class="text-neutral float-right desktop-only"/>
          </q-item>
          <q-item clickable style="border-radius: 4px;" v-ripple active-class="text-primary" class="">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
              <q-icon name="search" size="16px" />
            </q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">event webinar terdekat</q-item-section>
            <q-icon name="close" class="text-neutral float-right desktop-only"/>
          </q-item>
          <q-item clickable style="border-radius: 4px;" v-ripple active-class="text-primary" class="">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
              <q-icon name="search" size="16px" />
            </q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">webinar</q-item-section>
            <q-icon name="close" class="text-neutral float-right desktop-only"/>
          </q-item>
          <q-item clickable style="border-radius: 4px;" v-ripple active-class="text-primary" class="">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
              <q-icon name="search" size="16px" />
            </q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">penanganan kasus tpk</q-item-section>
            <q-icon name="close" class="text-neutral float-right desktop-only"/>
          </q-item>
          <q-item clickable style="border-radius: 4px;" v-ripple active-class="text-primary" class="">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
              <q-icon name="search" size="16px" />
            </q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">kasus tpk</q-item-section>
            <q-icon name="close" class="text-neutral float-right desktop-only"/>
          </q-item>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-item clickable v-ripple>
            <div class="text-form"> Use Advanced Seach</div>
          </q-item>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_create_knowledge" persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 900px'" class="q-pa-md">
        <q-card-section>
          <q-icon name="close" size="24px" class="text-neutral float-right desktop-only" v-close-popup/>
        </q-card-section>
        <div class="q-mt-lg">
            <q-tabs
            class="tab-content"
            v-model="tab"
            dense
            inline-label
            align="justify"
            style="color: #666666;"
          >
            <q-tab no-caps name="knowledge" label="Post Knowledge" icon="edit"/>
            <q-tab no-caps name="expert" label="Ask the Experts" icon="help"/>
          </q-tabs>
        </div>
        <q-tab-panels v-model="tab" animated style="background: none !important">
          <q-tab-panel name="knowledge" style="padding:0px">

            <div class="q-mt-lg q-mb-md">
                <q-tabs
                class="text-blue"
                v-model="tab_post"
                inline-label
                align="justify"
                style="color: #666666;"
              >
                <q-tab no-caps name="artikel" label="Artikel" icon="article"/>
                <q-tab no-caps name="audio" label="Audio" icon="mic"/>
                <q-tab no-caps name="video" label="Video" icon="slideshow"/>
                <q-tab no-caps name="visual" label="Visual" icon="photo"/>
                <q-tab no-caps name="games" label="Games" icon="sports_esports"/>
              </q-tabs>
            </div>
            <q-tab-panels v-model="tab_post" animated style="background: none !important">
              <q-tab-panel name="artikel" style="padding:0px">
                 <div class="q-px-md q-py-sm">
                  <div class="kmp-black-text kmp-md-text kmp-bold-text q-pb-sm"> Detail Knowledge</div>
                  <q-input dense v-model="cop_organisasi" outlined placeholder="Tuliskan judul knowledge anda"/>
                </div>
                 <div class="q-px-md">
                  <q-input :input-style="{ minHeight: '150px' }" dense v-model="cop_organisasi" autogrow type="textarea" outlined placeholder="Tuliskan isi atau rangkuman knowledge. Anda juga bisa menambahkan tautan atau sumber lainnya yang relevan"/>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Sumber Knowledge</div>
                      <q-radio v-model="reference_selected" val="internal" label="Internal"/>
                      <q-radio v-model="reference_selected" val="eksternal" label="Eksternal"/>
                    </div>
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Jenis Dokumen *</div>
                      <q-select
                              v-model="alasan_ditolak_as"
                              :options="['Explicit Knowledge', 'Best Practice', 'Development Needed']"
                              outlined
                              dense
                        >
                        </q-select>
                    </div>
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Post Knowledge ke KMAP *</div>
                      <q-select
                              v-model="alasan_ditolak_as"
                              :options="['Explicit Knowledge', 'Best Practice', 'Development Needed']"
                              outlined
                              dense
                        >
                        </q-select>
                    </div>
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Tambah Kolaborator</div>
                      <q-select
                              v-model="alasan_ditolak_as"
                              :options="['Explicit Knowledge', 'Best Practice', 'Development Needed']"
                              outlined
                              dense
                        >
                        </q-select>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Tagging </div>
                      <q-input dense v-model="cop_organisasi" outlined placeholder="Tuliskan tagging untuk knowledge ini, misal: gratifikasi."/>
                    </div>
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Knowledge </div>
                      <q-input dense v-model="cop_organisasi" outlined placeholder="Tuliskan tagging untuk knowledge ini, misal: gratifikasi."/>
                    </div>
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> File Pendukung </div>
                      <q-input dense v-model="cop_organisasi" outlined placeholder="Tuliskan tagging untuk knowledge ini, misal: gratifikasi."/>
                    </div>
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Thumbnail </div>
                      <q-input dense v-model="cop_organisasi" outlined placeholder="Tuliskan tagging untuk knowledge ini, misal: gratifikasi."/>
                    </div>

                  </div>
                </div>
                <div class="kmp-black-text kmp-md-text kmp-bold-text q-px-md q-pt-sm"> Kategori Knowledge</div>
                <div class="row">
                  <div class="col-6">
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Jenis Pengetahuan *</div>
                      <q-select
                              v-model="alasan_ditolak_as"
                              :options="['Kebijakan Eksternal', 'Kebijakan Internal', 'Panduan Kerja','Produk Kegiatan','Bahan Ajar','Referensi Kerja','Dokumen Penuntutan']"
                              outlined
                              dense
                        >
                        </q-select>
                    </div>
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Sumber Konten *</div>
                      <q-select
                              v-model="alasan_ditolak_as"
                              :options="['Hasil Pekerjaan']"
                              outlined
                              dense
                        >
                        </q-select>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Hak Akses *</div>
                      <q-select
                              v-model="alasan_ditolak_as"
                              :options="['Kebijakan Eksternal', 'Kebijakan Internal', 'Panduan Kerja','Produk Kegiatan','Bahan Ajar','Referensi Kerja','Dokumen Penuntutan']"
                              outlined
                              dense
                        >
                        </q-select>
                    </div>
                    <div class="q-px-md q-py-sm">
                      <div class="text-form"> Topik *</div>
                      <q-select
                              v-model="alasan_ditolak_as"
                              :options="['Hasil Pekerjaan']"
                              outlined
                              dense
                        >
                        </q-select>
                    </div>
                  </div>
                </div>
                <div class="row items-center q-py-md q-px-md">
                  <q-btn class="btn-primary-color float-right q-mr-sm publish-button" v-close-popup>Simpan Sebagai Draft</q-btn>
                  <q-space/>

                  <q-btn class="q-mr-md" v-close-popup>Back</q-btn>
                  <q-btn class="btn-primary-color float-right q-mr-sm publish-button" v-close-popup>Publish</q-btn>
                </div>
              </q-tab-panel>
            </q-tab-panels>

            <!-- <q-card-actions align="right" class="text-primary">
              <q-btn class="" v-close-popup>Back</q-btn>
              <q-btn class="btn-primary-color float-right q-mr-sm publish-button" v-close-popup>Publish</q-btn>
            </q-card-actions> -->
          </q-tab-panel>
          <q-tab-panel name="expert" style="padding:0px">
            <q-card class="knowledge-content cursor-pointer q-mb-md">
              <q-card-section class="q-px-lg q-py-sm">
                <div class="text-form"> Choose the most relevant topic</div>
                <q-select
                        v-model="alasan_ditolak_asa"
                        :options="['Explicit Knowledge', '18', '27', '36', '45', '100']"
                        outlined
                        dense
                  >
                  </q-select>
              </q-card-section>
              <q-card-section class="q-px-lg q-py-sm">
                  <q-input
                    outlined
                    dense
                    v-model="alasan_ditolak"
                    class=""
                    required
                    placeholder="Question Title"
                  ></q-input>
              </q-card-section>
              <q-card-section class="q-px-lg q-py-sm">
                <q-input :input-style="{ minHeight: '150px' }" dense v-model="cop_organisasi" autogrow type="textarea" outlined placeholder="Write knowledge description here..."/>
              </q-card-section>
              <q-card-section class="q-pa-lg">
                <div class="text-form"> Expert group</div>
              </q-card-section>
            </q-card>
            <q-card class="knowledge-content cursor-pointer ">
              <q-card-section class="q-pa-lg">
                <div>
                  bbbb
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  components: { Icon },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      tab: 'knowledge',
      tab_post: 'artikel',
      modal_search: false,
      search_filter: '',
      checkbox_knowledge: false,
      checkbox_post: false,
      checkbox_kmap: false,
      checkbox_channel: false,
      checkbox_training: false,
      checkbox_member: false,
      modal_create_knowledge: false
    };
  },
  methods: {
    openModalSearch() {
      this.modal_search = true;
    },
    openModalCreateKnowledge() {
      this.modal_create_knowledge = true;
    }
  }
};
</script>
