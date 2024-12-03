<template>
  <div>
    <div class="q-pa-lg text-center q-mt-md">
      <div v-if="['Member', 'Admin'].includes(state)"><span class="text-no-post">Add a post to start discussion</span></div>
      <div v-else=""><span class="text-no-post">You need a permission to create a post or start discussion</span></div>
      <div>
        <q-img class="q-mt-xl"
               src="../assets/images/Messaging.svg"
               :ratio="1"
               style="max-width: 377px"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['state'],
  data () {
    return {
    };
  },

  methods: {
    resetFilter () {
      this.filter = '';
      this.$refs.filter.focus();
    }
  }
};
</script>

<style>
.text-no-post{
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #838FA7;
}
</style>
