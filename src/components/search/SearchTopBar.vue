<template>
  <div>
    <q-select
      outlined dense options-dense clearable use-input hide-selected fill-input hide-dropdown-icon input-debounce="100"
      :placeholder="$q.platform.is.mobile ? 'Search' : 'Search anything here...'" behavior="menu"
      :class="$q.platform.is.mobile ? 'kmp-search-bar-mobile' : 'kmp-search-bar'" popup-content-class="kmp-rounded-2"
      v-model="selected" :options="searchOption" @filter="onFilter" @input="onInput" @clear="onClear">

      <template v-slot:append v-if="keyword === null">
        <q-icon name="search" @click.stop/>
      </template>

      <template v-slot:option="{opt, itemProps, itemEvents}">

        <q-item
          v-bind="itemProps" v-on="itemEvents" dense class="q-mt-sm desktop-only"
          v-if="['more'].includes(opt.type)">
          <q-item-section>
            <q-separator class="q-mb-md"/>
            <q-item-label caption class="kmp-text-blue text-weight-bold q-mb-md">{{ opt.title }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-bind="itemProps" v-on="itemEvents" dense class="q-mt-sm desktop-only"
          v-if="['group'].includes(opt.type)">
          <q-item-section>
            <q-item-label caption>{{ opt.title }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-bind="itemProps" v-on="itemEvents" class="desktop-only"
          v-if="['post','channel','user','knowledge','training'].includes(opt.type)">
          <q-item-section class="self-start q-mt-xs" avatar style="min-width: 28px!important; padding-right: 8px !important;">

            <Avatar picture="" name="Post"
                    v-if="['post'].includes(opt.type)" size="md"/>

            <Avatar :picture="opt.extra.profile_picture" :name="opt.title" size="md"
                    v-if="['user'].includes(opt.type)"/>

            <q-icon size="20px" :name="opt.extra.icon" class="q-mr-xs"
                    v-if="opt.type === 'channel'"/>

            <q-icon size="12.5px" :name="opt.extra.icon" v-if="opt.type === 'knowledge'"
                    style="color: #45A3E6;border-radius: 60px;background-color: #CDEAFF;box-shadow: 0 0 2px #CDEAFF;padding: 0.5em 0.5em;"/>

            <Avatar picture="" name="Training" v-if="['training'].includes(opt.type)" size="md"/>

          </q-item-section>

          <q-item-section class="self-start q-mt-xs">
            <div>
              <span>{{ capitalize(opt.title.toLowerCase()) }} </span>

              <span class="kmp-italic kmp-font-sm text-grey-6" v-if="['post'].includes(opt.type)">
                oleh {{ capitalize(opt.extra.name.toLowerCase()) }}
              </span>

              <span class="kmp-italic kmp-font-sm text-grey-6" v-if="['channel'].includes(opt.type)">
                <q-icon size="6px" name="brightness_1" class="q-mx-xs"/>
                {{ opt.extra.member }} Member(s)
              </span>

              <span class="kmp-italic kmp-font-sm text-grey-6" v-if="['knowledge'].includes(opt.type)">
                dari Unit Kerja {{ opt.extra.unit_kerja }}
              </span>

              <span class="kmp-italic kmp-font-sm text-grey-6" v-if="['training'].includes(opt.type)">
                oleh {{ opt.extra.provider }}
              </span>

            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { searchBar } from 'components/search/SearchTopBar';
import Avatar from 'components/common/Avatar.vue';
import { capitalize } from 'src/lib/helper';

export default {
  name: 'SearchTopBar',
  components: { Avatar },
  data() {
    return {
      keyword: null,
      selected: null,
      searchOption: []
    };
  },
  methods: {
    capitalize,
    onInput(data) {
      if (data !== null) {
        setTimeout(() => {
          this.selected = null;
        }, 1);

        if (data.type === 'post') {
          this.$router.push({
            name: 'channel-detail-post-detail',
            params: { id: data.extra.channel_id, post_id: data.id }
          }).catch(err => {
          });
        } else if (data.type === 'channel') {
          this.$router
            .push({
              name: 'channel-detail',
              params: { id: data.id }
            }).catch(err => {
            });
        } else if (data.type === 'user') {
          this.$router
            .push({
              name: 'profile-detail',
              params: { id: data.id }
            }).catch(err => {
            });
        } else if (data.type === 'knowledge') {
          this.$router
            .push({
              name: 'knowledge',
              query: {
                id: data.extra.organization_id
              },
              params: {
                knowledge_tree_id: data.id,
                knowledge_tree_parent_id: data.extra.parent_id,
                knowledge_tree_parent_parent_id: data.extra.parent_parent_id
              }
            }).catch(err => {
            });
        } else if (data.type === 'training') {
          this.$router
            .push({
              name: 'training-detail',
              params: { id: data.id }
            }).catch(err => {
            });
        } else if (data.type === 'more') {
          this.$router
            .push({
              name: 'search-result',
              params: { keyword: this.keyword }
            }).catch(err => {
            });
          this.closeDialogSearchMobile();
        }
      }
    },
    onFilter(val, update) {
      if (val === '') {
        update(() => {
          this.searchOption = [];
          this.$emit('dataSearch', { data: [], keyword: null });
        });
        return;
      }

      update(async () => {
        const res = await searchBar({ keyword: val });
        this.keyword = val;
        this.searchOption = res.map(x => {
          return {
            ...x,
            extra: JSON.parse(x.extra)
          };
        });
        this.$emit('dataSearch', { data: this.searchOption, keyword: this.keyword });
      });
    },
    onClear() {
      this.searchOption = [];
    },
    closeDialogSearchMobile() {
      this.$emit('closeDialogSearch');
    }
  }
};
</script>

<style scoped>

</style>
