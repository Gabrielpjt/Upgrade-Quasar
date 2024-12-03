<template>
  <div>
    <q-card-section class="q-pa-none">
      <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text">
       Asked by
       <span class="kmp-bold-text">Reza Rahardian</span>
       On Topic
       <span class="kmp-bold-text">DevOps</span>
       <span class="kmp-bold-text kmp-gray-text q-mx-sm"> • </span>
       <span class="kmp-blue-text kmp-bold-text link-underscore">Follow topic <q-icon name="add_circle" class="q-ml-xs" size="16px"/></span>
      </q-item-label>
      <div style="border: 1px solid var(--neutral-300, #D3D3D3);border-radius: 8px;" class="text-left q-pa-sm q-mt-md">
          <div class="q-pa-md">
              <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                How do we implement internal DevOps?
              </div>
              <!-- 150 -->
              <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                With DevOps having become standard engineering practice in the software industry, what processes and tooling can we use to release code into productio...
              </div>
              <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md  link-underscore">
                Go To Question
              </div>
          </div>
      </div>
      <div class="q-mt-md kmp-line-125 kmp-xs-text kmp-normal-text q-mt-md kmp-gray-text">
        Answered by
      </div>
      <div class="row q-mt-md">
        <q-item-section side class="q-pr-sm">
          <Avatar class="cursor-pointer" size="xxl" :picture="'https://cdn.quasar.dev/img/boy-avatar.png'" name="Rahmad Reza"/>
        </q-item-section>
        <q-item-section class="q-pa-none">
          <div class="kmp-sm-text kmp-bold-text kmp-black-text">
            <span class="kmp-line-130 cursor-pointer link-underscore">Rahmad Reza</span>
          </div>
          <div class="kmp-xs-text kmp-normal-text kmp-gray-text">
            <span class="kmp-line-125">Smart Worker IV</span> • <span>Expert at DevOps SME Group</span>
          </div>
        </q-item-section>
      </div>
      <div class="row q-mt-sm q-mb-md">
        <q-item-section side class="q-pr-sm" style="justify-content: unset;">
          <q-item-label class="kmp-md-text kmp-normal-text kmp-black-text">
            <p class="kmp-line-130">
              Okay, here’s the thing.
            </p>
            <!-- 190 -->
            <p class="kmp-line-130">
              Process and tools are just theoretically, not practical. In fact, based on my experience, it all depends on how DevOps environment. See below illustration for example. ...
            </p>
          </q-item-label>
          <div class="link-underscore cursor-pointer kmp-sm-text kmp-bold-text kmp-line-130 kmp-blue-text" >
            Read more context
          </div>
        </q-item-section>
      </div>
      <ExpertInsightContentReaction/>
    </q-card-section>
  </div>
</template>

<script>
import ExpertInsightContentReaction from 'components/v2/expert-insight-component/ExpertInsightContentReaction';
import Avatar from 'components/common/Avatar';

export default {
  components: { Avatar, ExpertInsightContentReaction }
};
</script>
