<template>
<q-card-section class="request">
    <span class="text-neutral text-normal">REQUEST</span>
    <div class="row q-mt-md q-mr-sm">
        <div class="col-2 text-center kmp-text-primary" style="margin:auto">
           <q-icon name="login" size="24px"></q-icon>
        </div>
        <div class="col-6">
            <div class="text-nama" style="margin:0px">
                Join Channel Request
            </div>
            <div class="text-desc-request q-mt-xs">
                12 members
            </div>
        </div>
        <div class="col-4">
            <div class="text-more text-right">
                See All
            </div>
        </div>
    </div>
    <!-- <div class="row q-mt-md q-mr-sm">
        <div class="col-2 text-center kmp-text-primary" style="margin:auto">
           <q-icon name="school" size="24px"></q-icon>
        </div>
        <div class="col-6">
            <div class="text-nama" style="margin:0px">
                Expertise Request
            </div>
            <div class="text-desc-request q-mt-xs">
                7 members
            </div>
        </div>
        <div class="col-4">
            <div class="text-more text-right">
                See All
            </div>
        </div>
    </div> -->
</q-card-section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.request{
    background: #FFF7EC;
}
.text-request{
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #65738F;
}
.text-desc-request{
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #65738F;
}
</style>
