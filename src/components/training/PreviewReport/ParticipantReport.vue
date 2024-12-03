<!-- eslint-disable no-unused-expressions -->
<template>
    <div>
    <fixed-modal
    :show="modal_excel"
    title="Preview Participant Report"
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
  PreviewParticipantReport
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
      user_name: '',
      modal_excel: false,
      hotInstance: null,
      hotSetting: {
        width: '100%',
        height: 'auto',
        stretch: 'all',
        data: [],
        colWidths: [200, 350, 150, 150, 150, 200, 100],
        autoColumnSize: true,
        manualRowResize: true,
        cells: (row, col, prop) => {
          const cellProperties = {};
          // Define custom styles for specific cells
          cellProperties.renderer = this.customRenderer;
          return cellProperties;
        }
        // style: {
        //   z-index: 999,
        //   position: 'absolute'
        // }
      }
    };
  },
  methods: {
    async open(data) {
      this.hotSetting.data = [];
      await PreviewParticipantReport(data).then(response => {
        this.user_name = response.data.user.name;
        this.hotSetting.data = [
          ['NIP', response.data.employee === true ? response.data.user.nip : '', '', '', '', '', ''],
          ['Nama', response.data.user.name, '', '', '', '', ''],
          ['Jenis kelamin', response.data.employee === true ? response.data.user.gender : '', '', '', '', '', ''],
          ['Jabatan', response.data.employee === true ? response.data.jabatan.name : '', '', '', '', '', ''],
          ['Pangkat', response.data.employee === true ? response.data.pangkat.name : '', '', '', '', '', ''],
          ['Direktorat/Biro/Bagian', response.data.unit_kerja && response.data.user.unit_kerja_id >= 32 ? response.data.unit_kerja.name : '', '', '', '', '', ''],
          ['Pendidikan', response.data.employee === true ? response.data.user.jenjang_pendidikan : '', '', '', '', '', ''],
          ['Email', response.data.user.email, '', '', '', '', '']
        ];
        const newRowData0 = ['', '', '', '', '', '', ''];
        const newRowData1 = ['Training Internal', '', '', '', '', '', ''];
        const newRowData2 = ['NO', 'KEGIATAN', 'JENIS DIKLAT', 'KATEGORI PELATIHAN', 'PENYELENGGARA', 'TANGGAL', 'JUMLAH JP'];
        this.hotSetting.data.push(newRowData0, newRowData1, newRowData2);
        response.data.data_training.forEach((item, index) => {
          const count = item.training.schedule.length;
          const dateStart = item.training.schedule[0].date_start;
          const dateEnd = item.training.schedule[count - 1].date_start;
          this.hotSetting.data.push([
            [index + 1], [item.training.name], [item.training.training_category], [item.training.training_type], [item.training.provider], [`${dateStart} - ${dateEnd}`], [item.training.jam_pelatihan]
          ]);
        });
        const newRowData3 = ['', '', '', '', '', '', ''];
        const newRowData4 = ['Training Mandiri', '', '', '', '', '', ''];
        const newRowData5 = ['NO', 'KEGIATAN', 'ORGANISASI', 'TANGGAL', 'JUMLAH JP', '', ''];
        this.hotSetting.data.push(newRowData3, newRowData4, newRowData5);
        response.data.data_training_eksternal.forEach((item, index) => {
          const date = moment(item.issuing_date).format('YYYY-MM-DD');
          this.hotSetting.data.push([
            [index + 1], [item.name], [item.issuing_organization], [date], [item.duration], [], [], []
          ]);
        });
      });
      this.modal_excel = true;
    },
    customRenderer(instance, td, row, col, prop, value, cellProperties) {
      // eslint-disable-next-line prefer-rest-params
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      // Apply custom styles to the specific cell
      if (col < 7 && (value === 'NO' || value === 'KEGIATAN' || value === 'ORGANISASI' || value === 'TANGGAL' || value === 'JUMLAH JP' || value === 'JENIS DIKLAT' || value === 'KATEGORI PELATIHAN' || value === 'PENYELENGGARA')) {
        td.style.backgroundColor = '#f5f5f5';
        td.style.fontWeight = 'bold';
        td.style.textAlign = 'center';
      } else if ((row < 8 && col === 0) || (row === 9 && col === 0) || value === 'Training Mandiri') {
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
