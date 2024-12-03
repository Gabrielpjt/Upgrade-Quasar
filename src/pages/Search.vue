<template>
  <q-page>
    <LeftBar/>
    <SearchBar/>
    <div class="row q-px-lg q-py-sm">
      <div class="col-12">
        <SearchResults />
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import SearchBar from 'components/search/SearchBar';
import SearchResults from 'components/search/SearchResults';

export default {
  components: { SearchResults, LeftBar, SearchBar },
  // Leaderboard,
  // Quiz,
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 100%
  border-radius: 8px
.text-neutral
  color: #65738F
</style>
