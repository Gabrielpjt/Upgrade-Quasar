<template>
  <div class="relative-position">
    <q-select
      clearable
      map-options
      emit-value
      :value="value"
      @input="$emit('input', $event)"
      @filter="handleFilter"
      :options="filteredOptions"
      v-bind="{ ...$attrs, ...filterProps }"
      v-on="listeners"
      :loading="isLoading"
      :hide-selected="isLoading"
    >
      <!-- Pass on all named slots -->
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />

      <!-- Pass on all scoped slots -->
      <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </q-select>
    <q-btn label="Retry" @click="doFetch" v-if="error" />
    <q-inner-loading :showing="isLoading">
      <q-spinner-bars size="12px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
export default {
  props: {
    fetch: Function,
    transformFunction: Function,
    autoload: Boolean,
    value: null,
    transformValueKey: {
      type: String,
      default: 'id'
    },
    transformLabelKey: {
      type: String,
      default: 'name'
    },
    enableFilter: Boolean,
    fetchLimit: {
      type: Number,
      default: 99999
    },
    staticOptions: Array
  },
  data() {
    return {
      isLoading: false,
      filteredOptions: [],
      options: [],
      error: false
    };
  },
  created() {
    if (this.autoload) {
      this.doFetch();
    }
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners; // eslint-disable-line no-unused-vars
      return listeners;
    },
    filterProps() {
      return {
        inputDebounce: 0,
        useInput: this.enableFilter
      };
    }
  },
  watch: {
    staticOptions: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          const result = this.transformToOptions(newValue);

          this.options = result;
          this.filteredOptions = result;
        }
      }
    }
  },
  methods: {
    doFetch() {
      if (this.staticOptions) {
        return;
      }

      const instance = this;
      instance.isLoading = true;

      instance
        .fetch({ limit: this.fetchLimit })
        .then(result => {
          instance.isLoading = false;
          if (!result.errors) {
            instance.$emit('loadingEnded', {
              success: true,
              data: result.data
            });

            instance.options = instance.transformToOptions(result.data);
            instance.filteredOptions = instance.options;
            instance.error = false;
          } else {
            instance.$emit('loadingEnded', {
              success: false,
              message: result.message
            });
            instance.error = true;
          }
        })
        .catch(error => {
          instance.isLoading = false;

          instance.$emit('loadingEnded', {
            success: false,
            message: instance.errorMessage,
            error
          });
          instance.error = true;
        });
    },
    transformToOptions(items) {
      if (this.transformFunction) {
        return this.transformFunction(items);
      }

      // Default item to options mapping
      // Use transformValueKey and transformLabelKey props
      const { transformValueKey, transformLabelKey } = this.$props;

      return items.map(i => {
        return {
          label: i[transformLabelKey],
          value: i[transformValueKey]
        };
      });
    },
    handleFilter(keyword, doneFn, abortFn) {
      if (this.enableFilter) {
        const needle = keyword ? keyword.toLowerCase() : '';
        const result = this.options.filter(
          option => `${option.label}`.toLowerCase().indexOf(needle) > -1
        );

        const instance = this;

        doneFn(() => {
          instance.filteredOptions = result;
        });
      } else {
        doneFn(() => {});
      }
    }
  }
};
</script>

<style>
</style>
