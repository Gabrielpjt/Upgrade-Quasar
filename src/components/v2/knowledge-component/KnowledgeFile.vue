<template>
  <div class="kmp-new-font">
    <div class="kmp-lg-text kmp-bold-text kmp-line-125 kmp-gray-text" v-if="data">
            Attachments
        </div>
        <div class="row q-mt-md">
          <div class="col">
            <div class="kmp-md-text kmp-normal-text kmp-line-125 kmp-gray-text q-mb-sm">
                1 file(s)
            </div>
            <div class="row q-mr-sm kmp-xs-text" :class="data.filemime === 'pptx' ? 'box-attachment-yellow' : data.filemime === 'pdf' ? 'box-attachment-red' : 'box-attachment-blue'">
              <div class="col">
                <q-badge class="q-mr-sm kmp-bold-text kmp-line-125 text-uppercase" :class="data.filemime === 'pptx' ? 'badge-attachment-yellow' : data.filemime === 'pdf' ? 'badge-attachment-red' : 'badge-attachment-blue'">{{ data.filemime }}</q-badge>
                <span class="kmp-bold-text kmp-line-125" style="word-wrap: break-word;">
                  {{ data.filename }}
                </span>
              </div>
              <div class="col-3 text-right custom-container-file kmp-xs-text kmp-bold-text kmp-line-125">
                <span class="knowledge-file-size">
                  {{ data.filesize }} KB
                </span>
                <span style="margin-top: 2px">
                  <Icon class="cursor-pointer" icon="fluent:arrow-download-16-filled"  width="16" height="16" />
                </span>
              </div>
            </div>
            <!-- <div class="row q-mr-sm q-mt-sm kmp-xs-text box-attachment-blue">
              <div class="col">
                <q-badge class="q-mr-sm badge-attachment-blue kmp-bold-text kmp-line-125">DOCX</q-badge>
                <span class="kmp-bold-text kmp-line-125" style="word-wrap: break-word;">
                  User Guide Mobile Member for Galileo v 1.2
                </span>
              </div>
              <div class="col-3 text-right custom-container-file kmp-xs-text kmp-bold-text kmp-line-125">
                <span class="knowledge-file-size">
                  1.024 KB
                </span>
                <span style="margin-top: 2px">
                  <Icon class="cursor-pointer" icon="fluent:arrow-download-16-filled"  width="16" height="16" />
                </span>
              </div>
            </div>
            <div class="row q-mr-sm q-mt-sm kmp-xs-text box-attachment-yellow">
              <div class="col">
                <q-badge class="q-mr-sm badge-attachment-yellow kmp-bold-text kmp-line-125 ">PPTX</q-badge>
                <span class="kmp-bold-text kmp-line-125" style="word-wrap: break-word;">
                  Master - Galileo Product Presentation
                </span>
              </div>
              <div class="col-3 text-right custom-container-file kmp-xs-text kmp-bold-text kmp-line-125">
                <span class="knowledge-file-size">
                  1.024 KB
                </span>
                <span style="margin-top: 2px">
                  <Icon class="cursor-pointer" icon="fluent:arrow-download-16-filled"  width="16" height="16" />
                </span>
              </div>
            </div> -->
          </div>
          <div class="col">
            <!-- <div class="kmp-md-text kmp-normal-text kmp-line-125 kmp-gray-text q-mb-sm q-ml-sm">
                2 media(s)
            </div>
            <div class="row items-center q-ml-sm kmp-xs-text box-attachment-green">
              <div class="col">
                <q-badge class="q-mr-sm badge-attachment-green kmp-bold-text kmp-line-125">JPG</q-badge>
                <span class="kmp-bold-text kmp-line-125" style="word-wrap: break-word;">
                  GLP on App Store
                </span>
              </div>
              <div class="col-3 text-right custom-container-file kmp-xs-text kmp-bold-text kmp-line-125">
                <span class="knowledge-file-size">
                  1.024 KB
                </span>
                <span style="margin-top: 2px">
                  <Icon class="cursor-pointer" icon="fluent:arrow-download-16-filled"  width="16" height="16" />
                </span>
              </div>
            </div>
            <div class="row items-center q-ml-sm q-mt-sm kmp-xs-text box-attachment-green">
              <div class="col">
                <q-badge class="q-mr-sm badge-attachment-green kmp-bold-text kmp-line-125">MP4</q-badge>
                <span class="kmp-line-125 kmp-bold-text " style="word-wrap: break-word;">
                  GLP on App Store
                </span>
              </div>
              <div class="col-3 text-right custom-container-file kmp-xs-text kmp-bold-text kmp-line-125">
                <span class="knowledge-file-size">
                  1.024 KB
                </span>
                <span style="margin-top: 2px">
                  <Icon class="cursor-pointer" icon="fluent:arrow-download-16-filled"  width="16" height="16" />
                </span>
              </div>
            </div> -->
          </div>
        </div>
  </div>
</template>


<script>
import { Icon } from '@iconify/vue2';

export default {
  props: ['data'],
  components: { Icon }
};
</script>
