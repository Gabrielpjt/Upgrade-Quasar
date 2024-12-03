<template>
  <div>

    <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm">
      <q-item-section class="kmp-line-130 kmp-md-text kmp-bold-text active">Filter</q-item-section>
      <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><u>Clear Filter</u></q-item-section>
    </q-item>
    <q-card class="q-mb-md kmp-new-font">
      <q-card-section>
        <q-item-label class="q-my-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Categories</q-item-label>
        <q-list class="text-primary">
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm bg-blue-1">
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">All</q-item-section>
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">42</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">Knowledges</q-item-section>
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">7</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">Posts</q-item-section>
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">7</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">KMAPs</q-item-section>
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">7</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">Channels</q-item-section>
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">7</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">Members</q-item-section>
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">7</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text">Trainings</q-item-section>
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm">7</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md kmp-new-font">
      <q-card-section>
        <q-item-label class="q-my-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Knowledge Type</q-item-label>
        <q-list class="text-primary">
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm bg-blue-1">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge" checked></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">All</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge2"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Knowledges 1</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge3"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Knowledges 2</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge4"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Knowledges 3</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md kmp-new-font">
      <q-card-section>
        <q-item-label class="q-my-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">KMAP Tree</q-item-label>
        <q-list class="text-primary">
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm bg-blue-1">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge" checked></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">All</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge2"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Priavate 1</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge3"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Private 2</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge4"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Private 3</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md kmp-new-font">
      <q-card-section>
        <q-item-label class="q-my-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Channel Type</q-item-label>
        <q-list class="text-primary">
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm bg-blue-1">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge" checked></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">All</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge2"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Public</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge3"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Private</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md kmp-new-font">
      <q-card-section>
        <q-item-label class="q-my-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Verified Status</q-item-label>
        <q-list class="text-primary">
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm bg-blue-1">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge" checked></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">All</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge2"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Verified</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge3"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Not Verified</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md kmp-new-font">
      <q-card-section>
        <q-item-label class="q-my-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Bookmarked</q-item-label>
        <q-list class="text-primary">
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm bg-blue-1">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge" checked></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">All</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge2"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Yes</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge3"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">No</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md kmp-new-font">
      <q-card-section>
        <q-item-label class="q-my-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Exclude My Status</q-item-label>
        <q-list class="text-primary">
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm bg-blue-1">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge" checked></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">All</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge2"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">Yes</q-item-section>
          </q-item>
          <q-item clickable dense style="border-radius: 4px;" v-ripple :active="active" active-class="text-primary" class="q-mb-sm text-black">
            <q-item-section avatar style="min-width: 10px" class="q-pr-sm"><input type="radio" name="knwoledge3"></q-item-section>
            <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text active">No</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  components: { },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      active: false,
      slide: 'style',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  }
};
</script>
