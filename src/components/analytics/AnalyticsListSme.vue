<template>
  <div>
<!--    my-sticky-header-table-->
    <q-table
      class=" fa-1x"
      :data="data"
      :columns="columns"
      row-key="name"
      flat
      :pagination="{rowsPerPage:50}"
    >
      <template v-slot:body-cell-user_name="props">
        <q-td :props="props">
          <div>
            <Avatar class="q-mr-sm" size="xl" :picture="props.row.profile_picture ? `./api${props.row.profile_picture}` : ''" :name="props.row.user_name"/>
            {{props.row.user_name}}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-knowledge="props">
        <q-td :props="props">
          <q-badge
            v-for="(item, index) in props.row.knowledge.split('|')" :key="index"
            color="blue-2" text-color="blue-8" class="q-mr-xs" :label="item"/>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>

import Avatar from 'components/common/Avatar';

export default {
  name: 'AnalyticsListSme',
  components: { Avatar },
  props: ['modelValue', 'data'],
  emits: ['update:modelValue'],
  computed: {
    dialog_model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  data() {
    return {
      columns: [
        // { name: 'no', label: 'No', field: 'no', align: 'left' },
        { name: 'user_name', label: 'Member', field: 'user_name', align: 'left' },
        { name: 'knowledge', label: 'Knowledge', field: 'knowledge', align: 'left', style: 'min-width: 300px; white-space: normal' },
        { name: 'unit_kerja', label: 'Unit Kerja', field: 'unit_kerja', align: 'left', style: 'font-size: 0.85em' }
        // { name: 'directorate', label: 'Directorate', field: 'directorate', align: 'left' }
      ]
      // data: [
      //   {
      //     no: 1,
      //     title: 'Dika',
      //     knowledge: 'Pengetahuan terkait Tupoksi KPK',
      //     unit_kerja: 'Peran Serta Masyarakat',
      //     directorate: 'ACLC',
      //     picture: ''
      //   },
      //   {
      //     no: 2,
      //     title: 'Bella Nadiem',
      //     knowledge: 'Pengetahuan terkait Tupoksi KPK',
      //     unit_kerja: 'Peran Serta Masyarakat',
      //     directorate: 'ACLC',
      //     picture: ''
      //   },
      //   {
      //     no: 3,
      //     title: 'Clarissa Margaretha',
      //     knowledge: 'Pengetahuan terkait Tupoksi KPK',
      //     unit_kerja: 'Peran Serta Masyarakat',
      //     directorate: 'ACLC',
      //     picture: ''
      //   }
      // ]
    };
  }
};
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #ffffff

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */

  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
