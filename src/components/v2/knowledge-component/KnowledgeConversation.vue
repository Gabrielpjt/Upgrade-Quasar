<template>
  <div class="kmp-new-font">
    <div class="q-pa-none items-start">
      <div>
        <div class="row">
          <q-card class="q-pa-md knowledge-comment-card">
            <div class="row">
              <q-item-section side class="q-pr-sm" style="justify-content: unset;">
                <Avatar class="cursor-pointer" size="custom-32" :picture="'https://cdn.quasar.dev/img/boy-avatar.png'" name="Rahmad Reza"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-black-text">
                  Rahmad Reza <span class="kmp-time q-ml-sm">10:01</span>
                </q-item-label>
              </q-item-section>
              <q-space/>
            </div>
            <div class="row q-mt-sm">
              <q-item-section side class="q-pr-sm" style="justify-content: unset;">
                <q-item-label class="kmp-md-text kmp-normal-text kmp-black-text">
                  <p class="kmp-line-130">
                    This is the first paragraph. It can contain multiple lines of text and is styled based on the default typography settings.
                  </p>

                  <p class="kmp-line-130">
                    This is the second paragraph. You can customize the content, add links, or include any other HTML elements within the paragraph.
                  </p>
                </q-item-label>
                <div>
                  <span class="cursor-pointer link-underscore kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text">58 Likes</span>
                  <span class="kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text" style="margin: 0px 8px 0px 8px !important">•</span>
                  <span class="cursor-pointer link-underscore kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text">8 Reply</span>
                </div>
              </q-item-section>
              <q-space/>
            </div>
          </q-card>
        </div>
        <div class="row justify-end">
          <q-card class="q-pa-md q-mt-sm knowledge-reply-comment-card">
            <div class="row">
              <q-item-section side class="q-pr-sm" style="justify-content: unset;">
                <Avatar class="cursor-pointer" size="custom-32" :picture="'https://cdn.quasar.dev/img/boy-avatar.png'" name="Rahmad Reza"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-black-text">
                  Rahmad Reza <span class="kmp-time q-ml-sm">10:01</span>
                </q-item-label>
              </q-item-section>
              <q-space/>
            </div>
            <div class="row q-mt-sm">
              <q-item-section side class="q-pr-sm" style="justify-content: unset;">
                <q-item-label class="kmp-md-text kmp-normal-text kmp-black-text">
                  <p class="kmp-line-130">
                    Gini ya kawan,
                  </p>

                  <p class="kmp-line-130">
                    Salam hangat dan terima kasih!
                  </p>
                </q-item-label>
                <div>
                  <span class="cursor-pointer link-underscore kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text">2 Likes</span>
                </div>
              </q-item-section>
              <q-space/>
            </div>
          </q-card>
          <div class="q-pa-none q-mt-sm"  style="background: transparent;width: 90%;">
              <q-btn dense class="kmp-bold-text kmp-line-130 kmp-sm-text" no-caps style="padding: 8px;border-radius: 6px;" flat label="Tampilkan balasan lain" />
          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <div class="row">
          <q-card class="q-pa-md knowledge-comment-card">
            <div class="row">
              <q-item-section side class="q-pr-sm" style="justify-content: unset;">
                <Avatar class="cursor-pointer" size="custom-32" :picture="'https://cdn.quasar.dev/img/boy-avatar.png'" name="Rahmad Reza"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-black-text">
                  Rahmad Reza <span class="kmp-time q-ml-sm">10:01</span>
                </q-item-label>
              </q-item-section>
              <q-space/>
            </div>
            <div class="row q-mt-sm">
              <q-item-section side class="q-pr-sm" style="justify-content: unset;">
                <q-item-label class="kmp-md-text kmp-normal-text kmp-black-text">
                  <p class="kmp-line-130">
                    This is the first paragraph. It can contain multiple lines of text and is styled based on the default typography settings.
                  </p>

                  <p class="kmp-line-130">
                    This is the second paragraph. You can customize the content, add links, or include any other HTML elements within the paragraph.
                  </p>
                </q-item-label>
                <div class="items-center">
                  <!-- <span class="cursor-pointer link-underscore kmp-line-130 kmp-blue-text kmp-sm-text kmp-bold-text">
                    <q-img src="../../../assets/images/v2/fb-static-like.png" class="kmp-img-like"/>58 Likes</span>
                  <span class="kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text" style="margin: 0px 8px 0px 8px !important">•</span>
                  <span class="cursor-pointer link-underscore kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text">8 Reply</span> -->
                  <div class="custom-container-training-gadget kmp-gray-text kmp-sm-text kmp-bold-text">
                      <span></span><div class="custom-icon-post-gadget">
                        <q-img src="../../../assets/images/v2/fb-static-like.png" class="kmp-img-like"/>
                      </div>58 Likes
                      <span class="kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text" style="margin: 0px 8px 0px 8px !important">•</span>
                      <span class="cursor-pointer link-underscore kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text">1 Reply</span>
                    </div>
                </div>
              </q-item-section>
            </div>
          </q-card>
        </div>
        <div class="row justify-end">
          <q-card class="q-pa-md q-mt-sm knowledge-my-comment-card">
            <div class="row">
              <q-item-section side class="q-pr-sm" style="justify-content: unset;">
                <Avatar class="cursor-pointer" size="custom-32" :picture="'https://cdn.quasar.dev/img/boy-avatar.png'" name="Rahmad Reza"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-black-text">
                  Dandi Darojat <span class="kmp-time q-ml-sm">10:01</span>
                </q-item-label>
              </q-item-section>
              <q-space/>
            </div>
            <div class="row q-mt-sm">
              <q-item-section side class="q-pr-sm" style="justify-content: unset;">
                <q-item-label class="kmp-md-text kmp-normal-text kmp-black-text">
                  <p class="kmp-line-130">
                    Gini ya kawan,
                  </p>

                  <p class="kmp-line-130">
                    Salam hangat dan terima kasih!
                  </p>
                </q-item-label>
                <div>
                  <span class="cursor-pointer link-underscore kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text">42 Likes</span>
                </div>
              </q-item-section>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Avatar from 'components/common/Avatar';


export default {
  components: { Avatar }
};
</script>

<style>
</style>
