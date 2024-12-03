<template>
  <div>
      <q-btn-group flat :spread="$q.platform.is.mobile ? false : true" dense>
        <q-btn
          class="expert-insight-button-group"
          no-caps
          size="sm"
          dense
        ><Icon icon="lucide:thumbs-up"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" />
        <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Like</span>
      </q-btn>
        <q-btn
          class="expert-insight-button-group"
          no-caps
          size="sm"
          dense
        ><Icon icon="ant-design:comment-outlined"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" />
        <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Comment</span>
      </q-btn>
        <q-btn
          class="expert-insight-button-group"
          no-caps
          size="sm"
          icon="o_share"
          dense
        >
        <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Share</span></q-btn>
        <q-btn
          class="expert-insight-button-group"
          no-caps
          size="sm"
          icon="bookmark_border"
          dense
          >
        <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Save</span></q-btn>
      </q-btn-group>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  components: { Icon }
};
</script>
