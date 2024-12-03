<!-- eslint-disable no-unused-expressions -->
<template>
    <div>
    <fixed-modal
    :show="modal_excel"
    title="Preview Feedback Report"
    :fullscreen="true"
      @on-close="modal_excel = false">
      <q-card-section style="height: 75vh; max-height: 100%;width: 75vw; max-width: 100%">
          <div class="text-md q-py-md text-bold">Materi Pelatihan</div>
          <hot-table :settings="hotSettingPage1" ref="hotTable" :colHeaders="true" :rowHeaders="true" class=""></hot-table>
          <div class="text-md q-py-md text-bold">Pengajar atau Narasumber</div>
          <hot-table :settings="hotSettingPage2" ref="hotTable" :colHeaders="true" :rowHeaders="true"></hot-table>
          <div class="text-md q-py-md text-bold">Penyelenggara</div>
          <hot-table :settings="hotSettingPage3" ref="hotTable" :colHeaders="true" :rowHeaders="true"></hot-table>
          <div class="text-md q-py-md text-bold">Self Assessment</div>
          <hot-table :settings="hotSettingPage4" ref="hotTable" :colHeaders="true" :rowHeaders="true"></hot-table>
        </q-card-section>
        <!-- <template #footer>
          <q-separator />
          <q-card-actions align="right" class="text-primary">
            <q-btn class="" outline unelevated @click="modal_add_external = false">Cancel</q-btn>
            <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated/>
          </q-card-actions>
        </template> -->
    </fixed-modal>
    </div>
</template>

<script>


// eslint-disable-next-line no-unused-vars, import/order
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable';
import FixedModal from 'components/common/FixedModal';
// import moment from 'moment';

import {
  PreviewFeedbackReport
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
      hotSettingPage1: {
        width: '100%',
        height: 'auto',
        stretch: 'all',
        data: [],
        colWidths: [250, 250, 250, 250, 250, 250, 250, 100],
        manualColumnResize: true,
        manualRowResize: true,
        mergeCells: [],
        cells: (row, col, prop) => {
          const cellProperties = {};
          // Define custom styles for specific cells
          cellProperties.renderer = this.customRenderer;
          return cellProperties;
        }
      },
      hotSettingPage2: {
        width: '100%',
        height: 'auto',
        stretch: 'all',
        data: [],
        colWidths: [250, 250, 250, 250, 250, 250, 250, 250, 250, 100],
        manualColumnResize: true,
        manualRowResize: true,
        mergeCells: [],
        cells: (row, col, prop) => {
          const cellProperties = {};
          // Define custom styles for specific cells
          cellProperties.renderer = this.customRenderer;
          return cellProperties;
        }
      },
      hotSettingPage3: {
        width: '100%',
        height: 'auto',
        stretch: 'all',
        data: [],
        colWidths: [250, 250, 250, 250, 250, 250, 250, 250, 100],
        manualColumnResize: true,
        manualRowResize: true,
        mergeCells: [],
        cells: (row, col, prop) => {
          const cellProperties = {};
          // Define custom styles for specific cells
          cellProperties.renderer = this.customRenderer;
          return cellProperties;
        }
      },
      hotSettingPage4: {
        width: '100%',
        height: 'auto',
        stretch: 'all',
        data: [],
        colWidths: [250, 250, 250, 250, 250, 250, 250, 100],
        manualColumnResize: true,
        manualRowResize: true,
        mergeCells: [],
        cells: (row, col, prop) => {
          const cellProperties = {};
          // Define custom styles for specific cells
          cellProperties.renderer = this.customRenderer;
          return cellProperties;
        }
      },
      page1: [],
      page2: [],
      page3: [],
      page4: []
    };
  },
  methods: {
    async open(data) {
      this.hotSettingPage1.data = [];
      this.hotSettingPage2.data = [];
      this.hotSettingPage3.data = [];
      this.hotSettingPage4.data = [];
      this.page1 = [];
      this.page2 = [];
      this.page3 = [];
      this.page4 = [];
      await PreviewFeedbackReport(data).then(response => {
        this.page1 = response.data.feedbacks.filter(e => e.page === '1');
        this.show_page1();
        this.page2 = response.data.feedbacks.filter(e => e.page === '2');
        this.show_page2();
        this.page3 = response.data.feedbacks.filter(e => e.page === '3');
        this.show_page3();
        this.page4 = response.data.feedbacks.filter(e => e.page === '4');
        this.show_page4();
      });
      this.modal_excel = true;
    },
    show_page1() {
      const newRowData1 = [
        'Nama Peserta',
        'Kesesuaian Materi Pembelajaran dengan topik pelatihan',
        'Materi yang diberikan mudah dipahami',
        'Materi pelatihan sesuai kebutuhan pekerjaan saya',
        'Metode Pembelajaran menarik',
        'Kesesuaian metode Pembelajaran dengan materi Pembelajaran',
        'Saran',
        'Rata-rata'
      ];
      this.hotSettingPage1.data.push(newRowData1);
      const merge = [];
      let jumlah_rata = 0;
      let count = 0;
      this.page1.forEach((item, index) => {
        let jumlah = 0;
        let value_materi = 0;
        let col1 = 0;
        let col2 = 0;
        let col3 = 0;
        let col4 = 0;
        let col5 = 0;
        // console.log(item_f.rating_star);
        item.rating_star.forEach((item_m, index_m) => {
          if (item_m.value) {
            if (item_m.value === 1) {
              value_materi = 20;
            } else if (item_m.value === 2) {
              value_materi = 40;
            } else if (item_m.value === 3) {
              value_materi = 60;
            } else if (item_m.value === 4) {
              value_materi = 80;
            } else if (item_m.value === 5) {
              value_materi = 100;
            } else if (!item_m.value) {
              value_materi = 0;
            }
            if (index_m === 0) {
              col1 = value_materi;
            } else if (index_m === 1) {
              col2 = value_materi;
            } else if (index_m === 2) {
              col3 = value_materi;
            } else if (index_m === 3) {
              col4 = value_materi;
            } else if (index_m === 4) {
              col5 = value_materi;
            }
            jumlah += value_materi;
          }
        });
        let rata = 0;
        let hasil_rata1 = 0;
        if (jumlah) {
          rata = jumlah / 5;
        }
        if (rata) {
          jumlah_rata += rata;
          hasil_rata1 = rata.toFixed(1);
        }
        this.hotSettingPage1.data.push([
          [item.user.name], [col1], [col2], [col3], [col4], [col5], [item.suggestions], [hasil_rata1]
        ]);
      });
      let rata2 = 0;
      count = this.page1.length;
      let hasil_rata2 = 0;
      if (jumlah_rata) {
        rata2 = jumlah_rata / count;
        hasil_rata2 = rata2.toFixed(1);
      }
      const newRowData2 = [
        'Rata-rata',
        '',
        '',
        '',
        '',
        '',
        '',
        hasil_rata2
      ];
      this.hotSettingPage1.data.push(newRowData2);
      const row = this.page1.length + 1;
      merge.push({
        row,
        rowspan: 1,
        col: 0,
        colspan: 7
      });
      this.hotSettingPage1.mergeCells = merge;
    },
    show_page2() {
      const newRowData1 = [
        'Nama Peserta',
        'Materi',
        'Nama Narasumber',
        'Ketepatan waktu',
        'Sikap dan perilaku',
        'Penguasaan Materi',
        'Cara Penyampaian',
        'Metode Pembelajaran',
        'Saran',
        'Rata-rata'
      ];
      const merge = [];
      const merge2 = [];
      let jumlah_rata = 0;
      let count = 0;
      let row = 1;
      let hitung = 0;
      this.hotSettingPage2.data.push(newRowData1);
      this.page2.forEach((item, index) => {
        let col1 = 0;
        let col2 = 0;
        let col3 = 0;
        let col4 = 0;
        let col5 = 0;
        let tempCount = 0;
        let count1 = 0;
        item.rating_star.forEach((item_m, index_m) => {
          if (item.user.name) {
            count1 = item.rating_star.length;
          }
          let jumlah = 0;
          let value = 0;
          item_m.rating.forEach((item_r, index_r) => {
            if (item_r.value) {
              if (item_r.value === 1) {
                value = 20;
              } else if (item_r.value === 2) {
                value = 40;
              } else if (item_r.value === 3) {
                value = 60;
              } else if (item_r.value === 4) {
                value = 80;
              } else if (item_r.value === 5) {
                value = 100;
              } else if (!item_r.value) {
                value = 0;
              }
              if (index_r === 0) {
                col1 = value;
              } else if (index_r === 1) {
                col2 = value;
              } else if (index_r === 2) {
                col3 = value;
              } else if (index_r === 3) {
                col4 = value;
              } else if (index_r === 4) {
                col5 = value;
              }
              jumlah += value;
            }
          });
          let rata = 0;
          let hasil_rata1 = 0;
          if (jumlah) {
            rata = jumlah / 5;
          }
          if (rata) {
            jumlah_rata += rata;
            hasil_rata1 = rata.toFixed(1);
          }
          this.hotSettingPage2.data.push([
            [item.user.name], [item_m.topic], [item_m.expert_name], [col1], [col2], [col3], [col4], [col5], [item.suggestions], [hasil_rata1]
          ]);
          if (tempCount !== item.user.name) {
            merge.push({
              row,
              col: 0,
              rowspan: count1,
              colspan: 1
            });
            row += count1;
            tempCount = item.user.name;
          }
          // this.hotSettingPage2.mergeCells = merge;
          hitung = item.rating_star.length;
        });
        count = this.page2.length * hitung;
      });
      let rata2 = 0;
      let hasil_rata2 = 0;
      if (jumlah_rata) {
        rata2 = jumlah_rata / count;
        hasil_rata2 = rata2.toFixed(1);
      }
      const newRowData2 = [
        'Rata-rata',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        hasil_rata2
      ];
      this.hotSettingPage2.data.push(newRowData2);
      const row2 = count + 1;
      merge2.push({
        row: row2,
        rowspan: 1,
        col: 0,
        colspan: 9
      });
      const merge_array = merge.concat(merge2);
      this.hotSettingPage2.mergeCells = merge_array;
    },
    show_page3() {
      const newRowData1 = [
        'Nama Peserta',
        'Fasilitas Pelatihan',
        'Kebersihan Fasilitas',
        'Konsumsi selama pelatihan',
        'Kesigapan Panitia Pelatihan',
        'Keramahan Panitia Pelatihan',
        'Lembaga Penyelenggara',
        'Saran',
        'Rata-rata'
      ];
      this.hotSettingPage3.data.push(newRowData1);
      const merge = [];
      let jumlah_rata = 0;
      let count = 0;
      this.page3.forEach((item, index) => {
        let jumlah = 0;
        let value_penyelenggara = 0;
        let col1 = 0;
        let col2 = 0;
        let col3 = 0;
        let col4 = 0;
        let col5 = 0;
        // console.log(item_f.rating_star);
        item.rating_star.forEach((item_m, index_m) => {
          if (item_m.value) {
            if (item_m.value === 1) {
              value_penyelenggara = 20;
            } else if (item_m.value === 2) {
              value_penyelenggara = 40;
            } else if (item_m.value === 3) {
              value_penyelenggara = 60;
            } else if (item_m.value === 4) {
              value_penyelenggara = 80;
            } else if (item_m.value === 5) {
              value_penyelenggara = 100;
            } else if (!item_m.value) {
              value_penyelenggara = 0;
            }
            if (index_m === 0) {
              col1 = value_penyelenggara;
            } else if (index_m === 1) {
              col2 = value_penyelenggara;
            } else if (index_m === 2) {
              col3 = value_penyelenggara;
            } else if (index_m === 3) {
              col4 = value_penyelenggara;
            } else if (index_m === 4) {
              col5 = value_penyelenggara;
            }
            jumlah += value_penyelenggara;
          }
        });
        let rata = 0;
        let hasil_rata1 = 0;
        if (jumlah) {
          rata = jumlah / 5;
        }
        if (rata) {
          jumlah_rata += rata;
          hasil_rata1 = rata.toFixed(1);
        }
        this.hotSettingPage3.data.push([
          [item.user.name], [col1], [col2], [col3], [col4], [col5], [item.lembaga_penyelenggara], [item.suggestions], [hasil_rata1]
        ]);
      });
      let rata2 = 0;
      count = this.page3.length;
      let hasil_rata2 = 0;
      if (jumlah_rata) {
        rata2 = jumlah_rata / count;
        hasil_rata2 = rata2.toFixed(1);
      }
      const newRowData2 = [
        'Rata-rata',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        hasil_rata2
      ];
      this.hotSettingPage3.data.push(newRowData2);
      const row = this.page3.length + 1;
      merge.push({
        row,
        rowspan: 1,
        col: 0,
        colspan: 8
      });
      this.hotSettingPage3.mergeCells = merge;
    },
    show_page4() {
      const newRowData1 = [
        'Nama Peserta',
        'Saya mengetahui tujuan pelatihan ini',
        'Pelatihan ini penting untuk menunjang pekerjaan saya',
        'Saya merasa membutuhkan pelatihan ini',
        'Pengetahuan dan pemahaman sebelum mengikuti pelatihan',
        'Pengetahuan dan Pemahaman sesudah mengikuti pelatihan',
        'Saran',
        'Rata-rata'
      ];
      this.hotSettingPage4.data.push(newRowData1);
      const merge = [];
      let jumlah_rata = 0;
      let count = 0;
      this.page4.forEach((item, index) => {
        let jumlah = 0;
        let col1 = 0;
        let col2 = 0;
        let col3 = 0;
        let col4 = 0;
        let col5 = 0;
        // console.log(item_f.rating_star);
        item.rating_star.forEach((item_m, index_m) => {
          if (item_m.value) {
            if (index_m === 0) {
              col1 = item_m.value;
            } else if (index_m === 1) {
              col2 = item_m.value;
            } else if (index_m === 2) {
              col3 = item_m.value;
            } else if (index_m === 3) {
              col4 = item_m.value;
            } else if (index_m === 4) {
              col5 = item_m.value;
            }
            jumlah += item_m.value;
          }
        });
        let rata = 0;
        let hasil_rata1 = 0;
        if (jumlah) {
          rata = jumlah / 5;
        }
        if (rata) {
          jumlah_rata += rata;
          hasil_rata1 = rata.toFixed(1);
        }
        this.hotSettingPage4.data.push([
          [item.user.name], [col1], [col2], [col3], [col4], [col5], [item.suggestions], [hasil_rata1]
        ]);
      });
      let rata2 = 0;
      count = this.page4.length;
      let hasil_rata2 = 0;
      if (jumlah_rata) {
        rata2 = jumlah_rata / count;
        hasil_rata2 = rata2.toFixed(1);
      }
      const newRowData2 = [
        'Rata-rata',
        '',
        '',
        '',
        '',
        '',
        '',
        hasil_rata2
      ];
      this.hotSettingPage4.data.push(newRowData2);
      const row = this.page4.length + 1;
      merge.push({
        row,
        rowspan: 1,
        col: 0,
        colspan: 7
      });
      this.hotSettingPage4.mergeCells = merge;
    },
    customRenderer(instance, td, row, col, prop, value, cellProperties) {
      // eslint-disable-next-line prefer-rest-params
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      // Apply custom styles to the specific cell
      if (row === 0 && col < 12) {
        td.style.backgroundColor = '#f5f5f5';
        td.style.fontWeight = 'bold';
        td.style.textAlign = 'center';
      } else if (value === 'Rata-rata') {
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
