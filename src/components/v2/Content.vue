<template>
  <div class="q-mb-lg kmp-new-font">
    <Search
        />
    <TabContent
    />
  </div>
</template>

<script>
import Search from 'components/v2/Search';
import TabContent from 'components/v2/TabContent';

export default {
  components: { Search, TabContent },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      tab: 'knowledge',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  }
};
</script>
