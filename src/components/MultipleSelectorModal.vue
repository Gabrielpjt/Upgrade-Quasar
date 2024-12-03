<template>
  <q-dialog ref="modal" minimized>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-card-section>
        <api-loader
          ref="apiLoader"
          :fetch="fetchInitialSelectedItems"
          :autoload="false"
          :initialData="initialSelectedItems"
          @loadingStarted="handleLoadingStarted"
          @loadingEnded="handleLoadingEnded"
        >
          <template v-if="loadedSuccessfully">
            <q-table
              ref="table"
              :data="serverData"
              :columns="columns"
              :row-key="rowKey"
              :pagination.sync="serverPagination"
              :loading="loading"
              @request="request"
              selection="multiple"
              :selected.sync="selectedItems"
              dense
            >
              <template slot="top-left" slot-scope="props" v-if="failed">
                <q-btn label="Retry" icon="refresh" @click="start"></q-btn>
              </template>
              <template slot="top-right" slot-scope="props">
                <q-input
                  v-if="hasSearch"
                  v-model="filter"
                  outlined
                  dense
                  clearable
                  label="Pencarian"
                  testcafe-tag="search-role"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
            </q-table>
          </template>
        </api-loader>
      </q-card-section>

      <q-card-section class="row justify-end">
        <q-btn class="q-mt-md q-mr-sm" label="Batal" @click="cancel"></q-btn>
        <q-btn
          class="q-mt-md"
          color="primary"
          label="Konfirmasi"
          @click="confirm"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import ApiLoader from './ApiLoader';

export default {
  components: { ApiLoader },
  props: {
    fetch: Function,
    title: String,
    columns: Array,
    hasSearch: Boolean,
    initialSelectedItems: Array,
    fetchInitialSelectedItems: {
      type: Function,
      default: () => new Promise((resolve, reject) => resolve([]))
    },
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      loading: false,
      loadedSuccessfully: false,
      serverPagination: {
        page: 1,
        rowsNumber: 0, // specifying this determines pagination is server-side
        rowsPerPage: 10
      },
      selectedItems: [],
      serverData: [],
      failed: false,
      filter: '',
      iSelectedItems: []
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
  watch: {
    filter(value) {
      this.loadItems();
    }
  },
  methods: {
    handleLoadingStarted() {
      this.loadedSuccessfully = false;
      this.iSelectedItems = [];
      this.selectedItems = [];
    },
    handleLoadingEnded({ success, data, message }) {
      if (success) {
        this.loadedSuccessfully = true;
        this.iSelectedItems = data.data;
        this.selectedItems = data.data;
        this.loadItems();
      }
    },
    request({ pagination }) {
      this.loading = true;
      this.failed = false;

      const offset = (pagination.page - 1) * pagination.rowsPerPage;
      const params = {
        limit: pagination.rowsPerPage,
        offset,
        sortBy: pagination.sortBy,
        descending: pagination.descending
      };

      if (this.hasSearch) {
        params.keyword = this.filter;
      }

      const context = this;
      this.fetch(params)
        .then(response => {
          if (!response.errors) {
            context.serverPagination = pagination;
            context.serverPagination.rowsNumber = response.meta.total_result;

            context.serverData = response.data;
            this.failed = false;
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
    confirm() {
      this.$emit('confirm', this.selectedItems);
      this.$refs.modal.hide();
    },
    loadItems() {
      this.serverPagination = {
        page: 1,
        rowsNumber: 0, // specifying this determines pagination is server-side
        rowsPerPage: 10
      };
      this.request({ pagination: this.serverPagination });
    },
    start() {
      this.$refs.modal.show();
      this.$nextTick(() => {
        this.$refs.apiLoader.reload();
      });
    },
    cancel() {
      this.$refs.modal.hide();
    }
  }
};
</script>

<style lang="css">
</style>
