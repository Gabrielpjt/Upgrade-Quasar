<template>
  <q-page>
    <ChannelBar/>
    <div class="row  q-pa-md">
      <div class="col-8">
        <PostCreate/>
        <div class="row q-mt-md flex">
            <div class="col-1">
                <span style="color: #C1C7D3;">
                    TODAY
                </span>
            </div>
            <div class="col-11">
                <q-separator class="" style="margin-top:10px;margin-left:-10px;margin-right:15px"/>
            </div>
        </div>
        <Post/>
      </div>
      <div class="col-4">
        <RightBar/>
      </div>
    </div>
  </q-page>
</template>

<script>
import ChannelBar from 'components/ChannelBar';
import PostCreate from 'components/PostCreate';
import Post from 'components/Post';
import RightBar from 'components/RightBar';

export default {
  components: { ChannelBar, PostCreate, Post, RightBar },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.my-card{
  width: 100%;
  height: 100%;
}
.text-neutral{
  color: #65738F;
}
</style>
