<template>
  <div>
<!--    my-sticky-header-table-->
    <q-table
      class="fa-1x"
      :data="data"
      :columns="columns"
      row-key="name"
      flat
      :pagination="{rowsPerPage:50}"
    >
      <template v-slot:body-cell-title="props">
        <q-td :props="props" style="width: 200px !important;max-width: 200px !important;">
          <div class="row">
            <div class="col" style="max-width: 20px; width: 20px; margin-top: 5px">
              <q-icon :name="props.row.icon" :color="props.row.color" class="q-mr-sm" size="20px" />
            </div>
            <div class="col q-ml-sm my-table-details">
              {{ props.row.title }}
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>

export default {
  name: 'AnalyticsListKnowledge',
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
        { name: 'title', label: 'Title Document', field: 'title', align: 'left' },
        { name: 'jenis', label: 'Jenis Knowledge', field: 'jenis', align: 'left', style: 'font-size: 0.85em' },
        { name: 'unit_kerja', label: 'Unit Kerja', field: 'unit_kerja', align: 'left', style: 'font-size: 0.85em' },
        { name: 'date', label: 'Date', field: 'date', align: 'left', style: 'font-size: 0.85em' }
      ]
      // data: [
      //   {
      //     no: 1,
      //     title: 'Sosialiasi Antikorupsi 2022.pdf',
      //     jenis: 'Core',
      //     unit_kerja: 'ACLC',
      //     date: '1 Jan 2022',
      //     icon: 'fas fa-file-pdf',
      //     color: 'red'
      //   },
      //   {
      //     no: 2,
      //     title: 'Matrix Kesuksesan Kampanye Antikorupsi.xlsx',
      //     jenis: 'Basic',
      //     unit_kerja: 'ACLC',
      //     date: '1 Jan 2022',
      //     icon: 'fas fa-file-excel',
      //     color: 'green'
      //   },
      //   {
      //     no: 3,
      //     title: 'Draft - Juknis Audit Keuangan Anggaran.docx',
      //     jenis: 'Basic',
      //     unit_kerja: 'ACLC',
      //     date: '1 Jan 2022',
      //     icon: 'fas fa-file-word',
      //     color: 'blue'
      //   }
      // ]
    };
  }
};
</script>

<style lang="sass">
.my-table-details
  font-size: 0.85em
  font-style: italic
  max-width: 200px
  white-space: normal
  color: #555
  margin-top: 4px

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
