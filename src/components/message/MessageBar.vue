<template>
  <div>
    <div class="row items-center kmp-header">
      <q-icon name="message" class="q-mr-sm" size="20px" />
      <span>Private Message to {{participant.join(',').toLowerCase()}}</span>
<!--      <q-space />-->
<!--      <q-btn-dropdown dense flat dropdown-icon="more_vert" class="q-mr-md">-->
<!--        <q-item v-if="data_own" clickable v-close-popup @click="modal_reset = true">-->
<!--          <q-item-section>-->
<!--            <q-item-label class="text-primary">Change Password</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->

<!--        <q-item clickable v-close-popup @click="onItemClick">-->
<!--          <q-item-section>-->
<!--            <q-item-label class="text-primary">Logout</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--      </q-btn-dropdown>-->
    </div>

    <q-dialog v-model="modal_reset">
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Change Password</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-y-md column">
            <div class="column text-grey-7">
              <div class="col q-mb-md">
                <label class="label-form">Old Password</label>
                <q-input dense outlined v-model="old_password" type="password" name="name" placeholder="Name" >
                  <template v-slot:append>
                    <q-icon name="remove_red_eye"/>
                  </template>
                </q-input>
              </div>
              <div class="col q-mb-md">
                <label class="label-form">New Password</label>
                <q-input dense outlined v-model="new_password" type="password" name="phone" placeholder="Phone" >
                  <template v-slot:append>
                    <q-icon name="remove_red_eye"/>
                  </template>
                </q-input>
              </div>
              <div class="col q-mb-md">
                <label class="label-form">Retype New Password</label>
                <q-input dense outlined v-model="retype" type="password" name="nip" placeholder="NIP" >
                  <template v-slot:append>
                    <q-icon name="remove_red_eye"/>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" style="padding: 16px">
          <q-btn color="primary" outline label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="handleSave" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Notify } from 'quasar';

export default {
  props: ['data_own', 'participant'],
  data() {
    return {
      modal_reset: false,
      old_password: 'secret',
      new_password: null,
      retype: null
    };
  },
  methods: {
    onItemClick () {
      // console.log('Clicked on an Item')
    },
    handleChange(e, field) {
      if (field === 'old_password') {
        this.question = e.target.value;
      } else if (field === 'answer') {
        this.items.filter(f => {
          return f.name === e.target.name;
        }).value = e.target.value;
      } else {
        const name = field;
        this.items.forEach(f => {
          if (f.name !== name) {
            f.correct = false;
          }
        });
      }
    },
    handleSave() {
      Notify.create({
        message: 'Save New Password!',
        timeout: 1000,
        type: 'positive',
        color: 'positive',
        icon: 'check'
      });
    }
  },
  mounted() {}
};
</script>

<style>
.text-p-color{
  color: #2C8ED3;
}
</style>
