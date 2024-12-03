<template>
  <q-avatar
    :size="avatar_property.size"
    :color="(avatar_property.picture === '')?'primary':''"
    text-color="white"
    class="cursor-pointer"
    @click="onClick"
  >
    <span v-if="avatar_property.picture === ''" style="font-size: 0.95em!important;">{{avatar_property.initial}}</span>
    <img v-if="avatar_property.picture !== ''" :src="avatar_property.picture" :alt="avatar_property.initial" />
    <q-badge v-if="avatar_property.is_show_badge" v-bind:class="avatar_property.is_online?'kmp-badge-1 kmp-badge-green':'kmp-badge-1 kmp-badge-grey'" rounded floating transparent style="padding: 2px 5px; min-height: 10px;" />
    <q-tooltip>
      <div class="text-capitalize">{{ (''+name).toLowerCase() }}</div>
    </q-tooltip>
  </q-avatar>
</template>

<script>

export default {
  props: ['size', 'name', 'picture', 'online'],
  data() {
    return {
      avatar_property: {
        size: '20px',
        initial: '',
        picture: '',
        is_online: false,
        is_show_badge: false
      }
    };
  },
  methods: {
    onClick() {
      this.$emit('click', {});
    },
    init() {
      // .match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
      this.avatar_property = {
        ...this.avatar_property
      };
    }
  },
  watch: {
    picture: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.avatar_property = {
            ...this.avatar_property,
            picture: value
          };
        }
      }
    },
    name: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined && value !== '' && value !== null) {
          this.avatar_property = {
            ...this.avatar_property,
            initial: value.match(/(\b\S)?/g).join('').match(/(^\S|\S$)?/g).join('')
              .toUpperCase()
          };
        }
      }
    },
    online: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.avatar_property = {
            ...this.avatar_property,
            is_online: value,
            is_show_badge: true
          };
        } else {
          this.avatar_property = {
            ...this.avatar_property,
            is_online: false,
            is_show_badge: false
          };
        }
      }
    },
    size: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          let size_value = '20px';
          switch (value.toLowerCase()) {
            case 'sm': size_value = '20px'; break;
            case 'md': size_value = '25px'; break;
            case 'lg': size_value = '30px'; break;
            case 'xl': size_value = '35px'; break;
            case 'xxl': size_value = '40px'; break;
            case 'xxxl': size_value = '56px'; break;
            case 'custom-32': size_value = '32px'; break;
            case '4em': size_value = '4em'; break;
            default: size_value = '20px'; break;
          }
          this.avatar_property = {
            ...this.avatar_property, size: size_value
          };
        }
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
