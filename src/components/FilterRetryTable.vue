<template>
  <div class="relative-position">
    <q-table
      v-bind="$attrs"
      ref="table"
      :data="serverData"
      row-key="id"
      :pagination.sync="serverPagination"
      :loading="loading"
      @request="request"
      :rows-per-page-options="[3, 5, 7, 10, 15, 20, 25, 50, 100]"
    >
      <template slot="top-left" slot-scope="props" v-if="failed">
        <q-btn label="Retry" color="red-9" icon="refresh" @click="retry"></q-btn>
      </template>
      <template slot="top-right" slot-scope="props" v-if="enableSearch">
        <q-input v-model="filter" outlined dense clearable label="Pencarian">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!-- Pass on all named slots -->
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />

      <!-- Pass on all scoped slots -->
      <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </q-table>
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary"></q-spinner-bars>
    </q-inner-loading>
  </div>
</template>

<script>
import { debounce } from 'quasar';

export default {
  props: {
    fetch: Function,
    initialSortColumn: String,
    initialSortDescending: Boolean,
    enableSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      failed: false,
      filter: '',
      customFilter: null,
      serverPagination: {
        page: 1,
        rowsNumber: 0, // specifying this determines pagination is server-side
        rowsPerPage: 10,
        sortBy: this.initialSortColumn,
        descending: this.initialSortDescending
      },
      serverData: []
    };
  },
  computed: {
    isEmpty() {
      if (
        !this.isLoading &&
        this.lastPageIndexSuccess > -1 &&
        this.items.length < 1
      ) {
        return true;
      }

      return false;
    }
  },
  created() {
    this.debouncedReset = debounce(this.reset, 500);
  },
  mounted() {
    this.reset();
  },
  watch: {
    filter(value) {
      this.debouncedReset();
    },
    customFilter(value) {
      this.debouncedReset();
    },
    initialSortColumn(value) {
      this.debouncedReset();
    }
  },
  methods: {
    reset() {
      this.serverPagination = {
        page: 1,
        rowsNumber: 0, // specifying this determines pagination is server-side
        rowsPerPage: 10,
        sortBy: this.serverPagination.sortBy,
        descending: this.serverPagination.descending
      };
      this.request({ pagination: this.serverPagination });
    },
    request({ pagination }) {
      this.loading = true;
      this.failed = false;

      const offset = (pagination.page - 1) * pagination.rowsPerPage;
      const params = {
        limit: pagination.rowsPerPage,
        offset,
        keyword: this.filter,
        customFilter: this.customFilter,
        order_by: pagination.sortBy,
        order_direction: pagination.descending ? 'desc' : 'asc'
      };

      const context = this;
      this.fetch(params)
        .then(payload => {
          if (!payload.errors) {
            context.serverPagination = pagination;
            context.serverPagination.rowsNumber = payload.meta.total_result;

            context.serverData = payload.data;
            context.failed = false;
            context.$emit('success', payload);
          } else {
            this.failed = true;
          }
          context.loading = false;
        })
        .catch(error => {
          context.loading = false;
          context.failed = true;
        });
    },
    retry() {
      this.request({ pagination: this.serverPagination });
    }
  }
};
</script>

<style lang="css">
</style>
