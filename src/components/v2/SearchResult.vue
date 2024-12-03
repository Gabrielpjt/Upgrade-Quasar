<template>
  <div class="q-mb-lg kmp-new-font">
    <q-list separator class="bg-white kmp-new-font q-mb-md" style="border-radius: 8px;">
      <q-item clickable v-ripple class="q-px-md kmp-y-padding search-list-1">
        <!-- <q-item-section avatar style="padding-right: 0px !important">
          <q-icon size="16px" class="kmp-black-text" name="search" />
        </q-item-section>
        <q-item-section class="kmp-md-text kmp-normal-text kmp-line-125">Search anything here using advanced search</q-item-section> -->
        <div class="q-mr-sm">
          <Icon icon="lets-icons:search-alt" color="#363638" width="16" />
        </div>
        <div class="kmp-md-text kmp-bold-text kmp-line-125 ">
          "event"
        </div>
      </q-item>
    </q-list>
    <div class="q-mt-md q-mb-md">
      <q-badge class="kmp-line-125 kmp-md-text kmp-normal-text q-mr-sm" style="background-color:white;color:black;padding:5px 15px" rounded> <i class="fa fa-minus-square"></i>&nbsp;Date&nbsp;  <i class="fa fa-angle-down"></i></q-badge>
      <q-badge class="kmp-line-125 kmp-md-text kmp-normal-text q-mr-sm" style="background-color:white;color:black;padding:5px 15px" rounded> <i class="fa fa-minus-square"></i>&nbsp;From&nbsp;  <i class="fa fa-angle-down"></i></q-badge>
      <q-badge class="kmp-line-125 kmp-md-text kmp-normal-text q-mr-sm" style="background-color:white;color:black;padding:5px 15px" rounded> <i class="fa fa-minus-square"></i>&nbsp;In Channel&nbsp;  <i class="fa fa-angle-down"></i></q-badge>
      <q-badge class="kmp-line-125 kmp-md-text kmp-normal-text q-mr-sm" style="background-color:white;color:black;padding:5px 15px" rounded> <i class="fa fa-minus-square"></i>&nbsp;With&nbsp;  <i class="fa fa-angle-down"></i></q-badge>
      <q-badge class="kmp-line-125 kmp-md-text kmp-normal-text q-mr-sm" style="background-color:white;color:black;padding:5px 15px" rounded> <i class="fa fa-minus-square"></i>&nbsp;Exclude My Post&nbsp;  <i class="fa fa-angle-down"></i></q-badge>
    </div>
    <div>
      <q-item clickable dense style="border-radius: 4px;"  active-class="text-primary" class="q-mb-sm">
        <div class="kmp-md-text kmp-normal-text q-mr-sm">
          Sort by :
        </div>
        <div class="kmp-md-text kmp-bold-text">
            Most Relevant <i class="fa fa-angle-down"></i>
        </div>
      </q-item>
    </div>
    <div>
        <q-card class="knowledge-content cursor-pointer q-mb-md">
          <q-card-section class="q-pa-lg">
            <div>
                <q-card-section class="q-pa-none">
                  <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text q-mb-md">
                    Posted by
                    <span class="kmp-bold-text">Reza Rahardian</span>
                    at
                    <!-- <span class="kmp-bold-text">kpk_general</span>
                    <span class="kmp-bold-text kmp-gray-text q-mx-sm"> • </span> -->
                    <span class="kmp-gray-1-text kmp-bold-text link-underscore"> <i class="fa fa-building"></i> kpk_general</span>
                  </q-item-label>
                    <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                      Event Menulis
                    </div>
                    <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                      Event Menulis Komunitas Menulis Yuk Batch 199.
                    </div>
                    <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md link-underscore">
                      Read more
                    </div>
                </q-card-section>
              </div>
          </q-card-section>
        </q-card>
        <q-card class="knowledge-content cursor-pointer q-mb-md">
          <q-card-section class="q-pa-lg">
            <div>
                <q-card-section class="q-pa-none">
                  <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text q-mb-md">
                     <i class="fa fa-minus-square"></i> Knowledge on
                    <span class="kmp-bold-text">Insert KMAP Tree as Long as Possible</span>
                  </q-item-label>
                    <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                      Event Menulis
                    </div>
                    <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                      Event Menulis Komunitas Menulis Yuk Batch 199.
                    </div>
                    <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md link-underscore">
                      Read more
                    </div>
                </q-card-section>
              </div>
          </q-card-section>
        </q-card>
        <q-card class="knowledge-content cursor-pointer q-mb-md">
          <q-card-section class="q-pa-lg">
            <div>
                <q-card-section class="q-pa-none">
                  <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text q-mb-md">
                    Posted by
                    <span class="kmp-bold-text">Reza Rahardian</span>
                    at
                    <!-- <span class="kmp-bold-text">kpk_general</span>
                    <span class="kmp-bold-text kmp-gray-text q-mx-sm"> • </span> -->
                    <span class="kmp-gray-1-text kmp-bold-text link-underscore"> <i class="fa fa-building"></i> kpk_general</span>
                  </q-item-label>
                    <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                      How do we implement internal DevOps?
                    </div>
                    <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                      With DevOps having become standard event practice in the software industru, what processes amd tooling can we use to release code into production for out public site? Do our DevOps pratices differ base..
                    </div>
                    <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md link-underscore">
                      Read more
                    </div>
                </q-card-section>
              </div>
          </q-card-section>
        </q-card>
        <q-card class="knowledge-content cursor-pointer q-mb-md">
          <q-card-section class="q-pa-lg">
            <div>
                <q-card-section class="q-pa-none">
                  <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text q-mb-md">
                    Posted by
                    <span class="kmp-bold-text">Reza Rahardian</span>
                    at
                    <span class="kmp-gray-1-text kmp-bold-text link-underscore"> <i class="fa fa-building"></i> kpk_general</span>
                  </q-item-label>
                    <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                      How do we implement internal DevOps?
                    </div>
                    <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                      With DevOps having become standard event practice in the software industru, what processes amd tooling can we use to release code into production for out public site? Do our DevOps pratices differ base..
                    </div>
                    <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md link-underscore">
                      Read more
                    </div>
                </q-card-section>
              </div>
          </q-card-section>
        </q-card>
        <q-card class="knowledge-content cursor-pointer q-mb-md">
          <q-card-section class="q-pa-lg">
            <div>
                <q-card-section class="q-pa-none">
                  <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text q-mb-md">
                    Posted by
                    <span class="kmp-bold-text">Reza Rahardian</span>
                    at
                    <span class="kmp-gray-1-text kmp-bold-text link-underscore"> <i class="fa fa-building"></i> kpk_general</span>
                  </q-item-label>
                    <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                      How do we implement internal DevOps?
                    </div>
                    <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                      With DevOps having become standard event practice in the software industru, what processes amd tooling can we use to release code into production for out public site? Do our DevOps pratices differ base..
                    </div>
                    <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md link-underscore">
                      Read more
                    </div>
                </q-card-section>
              </div>
          </q-card-section>
        </q-card>
        <q-card class="knowledge-content cursor-pointer q-mb-md">
          <q-card-section class="q-pa-lg">
            <div>
                <q-card-section class="q-pa-none">
                  <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text q-mb-md">
                    Posted by
                    <span class="kmp-bold-text">Reza Rahardian</span>
                    at
                    <span class="kmp-gray-1-text kmp-bold-text link-underscore"> <i class="fa fa-building"></i> kpk_general</span>
                  </q-item-label>
                    <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                      How do we implement internal DevOps?
                    </div>
                    <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                      With DevOps having become standard event practice in the software industru, what processes amd tooling can we use to release code into production for out public site? Do our DevOps pratices differ base..
                    </div>
                    <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md link-underscore">
                      Read more
                    </div>
                </q-card-section>
              </div>
          </q-card-section>
        </q-card>
        <q-card class="knowledge-content cursor-pointer q-mb-md">
          <q-card-section class="q-pa-lg">
            <div>
                <q-card-section class="q-pa-none">
                  <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text q-mb-md">
                    Posted by
                    <span class="kmp-bold-text">Reza Rahardian</span>
                    at
                    <span class="kmp-gray-1-text kmp-bold-text link-underscore"> <i class="fa fa-building"></i> kpk_general</span>
                  </q-item-label>
                    <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                      How do we implement internal DevOps?
                    </div>
                    <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                      With DevOps having become standard event practice in the software industru, what processes amd tooling can we use to release code into production for out public site? Do our DevOps pratices differ base..
                    </div>
                    <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md link-underscore">
                      Read more
                    </div>
                </q-card-section>
              </div>
          </q-card-section>
        </q-card>
        <q-card class="knowledge-content cursor-pointer q-mb-md">
          <q-card-section class="q-pa-lg">
            <div>
                <q-card-section class="q-pa-none">
                  <q-item-label class="kmp-line-130 kmp-sm-text kmp-black-text kmp-normal-text q-mb-md">
                    Posted by
                    <span class="kmp-bold-text">Reza Rahardian</span>
                    at
                    <span class="kmp-gray-1-text kmp-bold-text link-underscore"> <i class="fa fa-building"></i> kpk_general</span>
                  </q-item-label>
                    <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                      How do we implement internal DevOps?
                    </div>
                    <div class="kmp-line-125 kmp-md-text kmp-normal-text q-mt-md">
                      With DevOps having become standard event practice in the software industru, what processes amd tooling can we use to release code into production for out public site? Do our DevOps pratices differ base..
                    </div>
                    <div class="kmp-line-130 kmp-sm-text kmp-bold-text q-mt-md link-underscore">
                      Read more
                    </div>
                </q-card-section>
              </div>
          </q-card-section>
        </q-card>
    </div>
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
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  }
};
</script>
