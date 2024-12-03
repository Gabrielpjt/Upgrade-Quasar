<!-- eslint-disable no-unused-expressions -->
<template>
    <div>
    <fixed-modal
    :show="modal_excel"
    title="Preview Training Report"
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
  PreviewTrainingReport
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
        colWidths: [50, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
        manualColumnResize: true,
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
      await PreviewTrainingReport(data).then(response => {
        const newRowData1 = ['NO', 'SIFAT KEGIATAN', 'PIC', 'JENIS DIKLAT', 'METODE PELATIHAN', 'KATEGORI PELATIHAN', 'PENYELENGGARA', 'NIP/NRP',
          'NAMA PESERTA', 'JENIS KELAMIN', 'JABATAN', 'KEDEPUTIAN', 'DIREKTORAT/BIRO/BAGIAN', 'KEGIATAN', 'TANGGAL MULAI', 'TANGGAL AKHIR', 'SUMBER DATA', 'LOKASI',
          'JUMLAH JP', 'BULAN', '% PENINGKATAN NILAI PRE-POST TEST DARI JUMLAH PESERTA', '% EVALUASI PROGRAM', 'LAPORAN PELATIHAN', 'SERTIFIKAT PESERTA', 'SERTIFIKAT NARSUM', 'PEMBAYARAN',
          'KETERANGAN', 'HARI PELATIHAN', 'JUMLAH PESERTA'];
        this.hotSetting.data.push(newRowData1);
        let expert = null;
        response.data.data_training.forEach((item, index) => {
          const jsonString = response.data.data_expertise;
          if (jsonString) {
            // const expertArray = JSON.parse(jsonString);
            const expertNames = jsonString.map(ex => {
              return ex.expert_name;
            });
            expert = expertNames.join(', ');
          }
          // hari pelatihan & jumlah peserta
          const hari_pelatihan = item.schedule.length;
          const jumlah_peserta = item.participant.filter(e => e.participant_type === 'registered');
          const jumlah_peserta_reg = jumlah_peserta.length;

          // data tanggal
          const date_end = item.schedule[(item.schedule.length) - 1].date_start;
          const date = moment(date_end).format('MMMM');
          item.participant.forEach((item_p, index_p) => {
            if (item_p.participant_type === 'registered') {
              // data peserta
              let name = '';
              let gender = '';
              let nip = '';
              let jabatan = '';
              if (item_p.employee_type === 'employee') {
                name = item_p.user.name;
                nip = item_p.user.nip;
                jabatan = '';
                if (item_p.jabatan_id) {
                  jabatan = item_p.jabatan ? item_p.jabatan.name : '';
                }
                gender = item_p.user.gender;
              } else {
                name = item_p.non_employee.name;
                nip = '';
                jabatan = '';
                gender = '';
              }
              // data deputi
              let deputi = '';
              if (item_p.organization) {
                if (item_p.organization.level === 2) {
                  deputi = item_p.organization;
                } else if (item_p.organization.level === 1) {
                  deputi = '';
                } else {
                  const dep1 = response.data.all_organization.filter(e => e.id === item_p.organization.parent);
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
              // data nilai
              let sum = 0;
              let count = 0;
              let hasil = 0;
              if (item_p.employee_type === 'employee') {
                const employee = item.participant.filter(e => e.users_id === item_p.users_id);
                employee.forEach((item_p2, index_p2) => {
                  if (item_p2.post_test_score || item_p2.pre_test_score) {
                    if (item_p2.post_test_score !== 0 || item_p2.pre_test_score !== 0) {
                      hasil = ((item_p2.post_test_score - item_p2.pre_test_score) / item_p2.pre_test_score) * 100;
                      sum += hasil;
                      count++;
                    }
                  }
                });
              } else {
                const non_employee = item.participant.filter(e => e.employee_id === item_p.employee_id);
                non_employee.forEach((item_p2, index_p2) => {
                  if (item_p2.post_test_score || item_p2.pre_test_score) {
                    if (item_p2.post_test_score !== 0 || item_p2.pre_test_score !== 0) {
                      hasil = ((item_p2.post_test_score - item_p2.pre_test_score) / item_p2.pre_test_score) * 100;
                      sum += hasil;
                      count++;
                    }
                  }
                });
              }
              let peningkatan = 0;
              if (hasil !== 0) {
                peningkatan = (sum / count).toFixed(1);
              } else {
                peningkatan = 0;
              }
              // data feedback
              let hasil_evaluasi_program = 0;
              let rata_materi = 0;
              let rata_penyelenggara = 0;
              if (item_p.employee_type === 'employee') {
                if (item_p.feedback.length !== 0) {
                  const page1 = item_p.feedback.filter(e => e.users_id === item_p.users_id && e.page === '1');
                  page1.forEach((item_f, index_f) => {
                    let jumlah_materi = 0;
                    let value_materi = 0;
                    item_f.rating_star.forEach((item_m, index_m) => {
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
                      }
                      jumlah_materi += value_materi;
                    });
                    if (jumlah_materi) {
                      rata_materi = jumlah_materi / 5;
                    }
                  });
                }

                if (item_p.feedback.length !== 0) {
                  const page3 = item_p.feedback.filter(e => e.users_id === item_p.users_id && e.page === '3');
                  page3.forEach((item_f, index_f) => {
                    let jumlah_penyelenggara = 0;
                    let value_penyelenggara = 0;
                    item_f.rating_star.forEach((item_rs, index_rs) => {
                      if (item_rs.value) {
                        if (item_rs.value === 1) {
                          value_penyelenggara = 20;
                        } else if (item_rs.value === 2) {
                          value_penyelenggara = 40;
                        } else if (item_rs.value === 3) {
                          value_penyelenggara = 60;
                        } else if (item_rs.value === 4) {
                          value_penyelenggara = 80;
                        } else if (item_rs.value === 5) {
                          value_penyelenggara = 100;
                        } else if (!item_rs.value) {
                          value_penyelenggara = 0;
                        }
                      }
                      jumlah_penyelenggara += value_penyelenggara;
                    });
                    if (jumlah_penyelenggara) {
                      rata_penyelenggara = jumlah_penyelenggara / 5;
                    }
                  });
                }
                const evaluasi_program = (rata_materi + rata_penyelenggara) / 2;
                if (evaluasi_program !== 0) {
                  hasil_evaluasi_program = evaluasi_program.toFixed(1);
                } else {
                  hasil_evaluasi_program = 0;
                }
              } else {
                hasil_evaluasi_program = 0;
              }
              this.hotSetting.data.push([
                [index_p + 1], [], [expert], [item.training_method], [item.training_type], [item.training_category], [item.provider], [nip], [name], [gender], [jabatan], [deputi ? deputi.name : ''], [item_p.organization ? item_p.organization.name : ''], [item.name], [item.schedule[0].date_start], [item.schedule[(item.schedule.length) - 1].date_start], [], [item.locations], [item.jam_pelatihan], [date], [peningkatan], [hasil_evaluasi_program], [], [], [], [], [], [hari_pelatihan], [jumlah_peserta_reg]
              ]);
            }
          });
        });
      });
      this.modal_excel = true;
    },
    customRenderer(instance, td, row, col, prop, value, cellProperties) {
      // eslint-disable-next-line prefer-rest-params
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      // Apply custom styles to the specific cell
      if (row === 0 && col < 29) {
        td.style.textAlign = 'center';
        td.style.backgroundColor = '#f5f5f5';
        td.style.fontWeight = 'bold';
      }
      // else if ((row < 8 && col === 0) || (row === 9 && col === 0) || value === 'Training Mandiri') {
      //   td.style.fontWeight = 'bold';
      // }
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
