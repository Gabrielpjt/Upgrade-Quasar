<!-- eslint-disable no-unused-expressions -->
<template>
    <div>
    <fixed-modal
      :show="modal_excel"
      title="Preview Directorate Report"
      :fullscreen="true"
      @on-close="modal_excel = false">
            <q-card-section style="height: 75vh; max-height: 100%;width: 75vw; max-width: 100%">
                    <hot-table :settings="hotSetting" ref="hotTable" :colHeaders="true" :rowHeaders="true"></hot-table>
            </q-card-section>
    </fixed-modal>
    </div>
</template>

<script>


// eslint-disable-next-line no-unused-vars, import/order
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable';
import FixedModal from 'components/common/FixedModal';
import moment from 'moment';

import {
  PreviewDirectorateReport
} from '../../../lib/api';
// eslint-disable-next-line no-unused-vars, import/order
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

registerAllModules();


export default {
  components: { HotTable, FixedModal },
  props: {
  },
  data() {
    return {
      directorate_name: '',
      modal_excel: false,
      hotInstance: null,
      hotSetting: {
        width: '100%',
        height: 'auto',
        stretch: 'all',
        data: [],
        mergeCells: [],
        // mergeCells: [
        //   { row: 0, col: 0, rowspan: 3, colspan: 3 },
        //   { row: 3, col: 4, rowspan: 2, colspan: 2 }
        // ],
        colWidths: [50, 150, 350, 150, 150, 150, 150, 350, 100, 100, 200],
        autoColumnSize: true,
        manualRowResize: true,
        cells: (row, col, prop) => {
          const cellProperties = {};
          // Define custom styles for specific cells
          cellProperties.renderer = this.customRenderer;
          return cellProperties;
        }
      }
    };
  },
  methods: {
    async open(data) {
      this.hotSetting.data = [];
      const dateStart = data.date_start;
      const dateEnd = data.date_end;
      const id = data.row_id;
      await PreviewDirectorateReport(
        id,
        {
          date_start: dateStart,
          date_end: dateEnd
        }).then(response => {
        this.directorate_name = response.data.directorate.name;
        this.hotSetting.data = [
          [response.data.directorate.name, '', '', '', '', '', '', '', '', '', '']
        ];
        const newRowData0 = ['', '', '', '', '', '', '', '', '', '', ''];
        const newRowData1 = ['NO', 'NIP', 'NAMA PEGAWAI', 'JENIS KELAMIN', 'JABATAN', 'KEDEPUTIAN', 'DIREKTORAT/BIRO/BAGIAN', 'NAMA PELATIHAN', 'JUMLAH JP', 'TOTAL JP', 'BULAN'];
        this.hotSetting.data.push(newRowData0, newRowData1);
        const merge = [];
        let row = 3;
        let tempCount = 0;
        let count = 0;
        response.data.data_participant.forEach((item, index) => {
          let name = '';
          let jum_jp = 0;
          let nip = '';
          let gender = '';
          let jabatan = '';

          // let count = 0;
          if (item.user) {
            nip = item.user.nip;
            name = item.user.name;
            jabatan = '';
            if (item.jabatan_id) {
              jabatan = item.jabatan ? item.jabatan.name : '';
            }
            gender = item.user.gender;
            const data_employee = response.data.data_participant.filter(e => e.users_id === item.users_id);
            count = data_employee.length;
            data_employee.forEach(f => {
              jum_jp += f.training.jam_pelatihan;
            });
          } else {
            nip = '';
            name = item.non_employee.name;
            const data_non_employee = response.data.data_participant.filter(g => g.employee_id === item.employee_id);
            count = data_non_employee.length;
            data_non_employee.forEach(h => {
              jum_jp += h.training.jam_pelatihan;
            });
            jabatan = '';
            gender = '';
          }
          // data deputi
          let deputi = '';
          if (item.organization) {
            if (item.organization.level === 2) {
              deputi = item.organization;
            } else if (item.organization.level === 1) {
              deputi = '';
            } else {
              const dep1 = response.data.all_organization.filter(e => e.id === item.organization.parent);
              if (dep1) {
                if (dep1[0].level === 2) {
                  // eslint-disable-next-line prefer-destructuring
                  deputi = dep1[0];
                } else if (dep1[0].level === 3) {
                  const dep2 = response.data.all_organization.filter(e => e.id === dep1[0].parent);
                  if (dep2.level === 2) {
                    // eslint-disable-next-line prefer-destructuring
                    deputi = dep2[0];
                  } else {
                    deputi = '';
                  }
                } else {
                  deputi = '';
                }
              }
            }
          }
          const date = moment(item.created_at).format('MMMM');
          this.hotSetting.data.push([
            [index + 1], [nip], [name], [gender], [jabatan], [deputi ? deputi.name : ''], [item.organization ? item.organization.name : ''], [item.training.name], [item.training.jam_pelatihan], [jum_jp], [date]
          ]);
          if (item.user) {
            if (tempCount !== item.user.name) {
              merge.push({
                row,
                col: 4,
                rowspan: count,
                colspan: 1
              });
              row += count;
              tempCount = item.user.name;
            }
          }
          if (item.non_employee) {
            if (tempCount !== item.non_employee.name) {
              merge.push({
                row,
                col: 4,
                rowspan: count,
                colspan: 1
              });
              row += count;
              tempCount = item.non_employee.name;
            }
          }
        });
        this.hotSetting.mergeCells = merge;
      });
      this.modal_excel = true;
    },
    customRenderer(instance, td, row, col, prop, value, cellProperties) {
      // eslint-disable-next-line prefer-rest-params
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      // Apply custom styles to the specific cell
      if (value === 'NO' || value === 'NIP' || value === 'NAMA PEGAWAI' || value === 'JENIS KELAMIN' || value === 'JABATAN' || value === 'KEDEPUTIAN' || value === 'DIREKTORAT/BIRO/BAGIAN' || value === 'NAMA PELATIHAN' || value === 'JUMLAH JP' || value === 'TOTAL JP' || value === 'BULAN') {
        td.style.backgroundColor = '#f5f5f5';
        td.style.fontWeight = 'bold';
        td.style.textAlign = 'center';
      } else if (value === this.directorate_name) {
        td.style.fontWeight = 'bold';
      }
    }
  }
};


</script>
<style>
/* Additional styles if needed */
.hot-table td {
  font-weight: normal; /* Reset font weight for all cells */
}

.hot-table td.bold-text {
  font-weight: bold; /* Apply bold font to specific cells */
}
.ht-con {
    width: 100% !important;
    overflow-x: auto !important;
    white-space: nowrap !important;
}
.ht_master, .ht_clone_inline_start, .ht_clone_top, .ht_clone_bottom {
    overflow: inherit;
}
.handsontable {
    overflow: inherit !important;
}
</style>
