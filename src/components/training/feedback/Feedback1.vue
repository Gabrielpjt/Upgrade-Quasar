<template>
  <div class="q-gutter-y-xl">
    <div class="row q-gutter-md">
      <div class="col-4">
        <div class="q-gutter-xs">
          <label class="text-subtitle1">Nama Lengkap <label style="color: red">*</label></label>
          <q-input v-model="form.firstname" outlined dense square />
          <div class="instruction">First</div>
        </div>
      </div>
      <div class="col-4">
        <div class="q-gutter-xs">
          <label class="text-subtitle1"></label>
          <q-input v-model="form.lastname" outlined dense square />
          <div class="instruction">Last</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="q-gutter-xs">
          <label class="text-subtitle1">Email <label style="color: red">*</label></label>
          <q-input v-model="form.email" outlined dense square />
          <div class="instruction italic">Contoh : pembelajaraninternal@kpk.go.id</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="q-gutter-xs">
          <label class="text-subtitle1">No. Handphone <label style="color: red">*</label></label>
          <q-input v-model="form.no_hp" outlined dense square />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="q-gutter-xs">
          <label class="text-subtitle1">Nama Pelatihan <label style="color: red">*</label></label>
          <q-input v-model="form.training_name" outlined dense square />
          <div class="instruction italic">Nama pelatihan yang telah di ikuti</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="q-gutter-xs">
          <label class="text-subtitle1">Direktorat <label style="color: red">*</label></label>
          <q-input v-model="form.direktorat_name" outlined dense square />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="q-gutter-xs">
          <label class="text-subtitle1">Unit Kerja/Bidang <label style="color: red">*</label></label>
          <q-input v-model="form.unitkerja_name" outlined dense square />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        no_hp: '',
        training_name: '',
        direktorat_name: '',
        unitkerja_name: ''
      }
    };
  },
  watch: {
    data() {
      this.form = {
        firstname: this.data.firstname,
        lastname: this.data.lastname,
        email: this.data.email,
        no_hp: this.data.no_hp,
        training_name: this.data.training_name,
        direktorat_name: this.data.direktorat_name,
        unitkerja_name: this.data.unitkerja_name
      };
    }
  }
};
</script>
