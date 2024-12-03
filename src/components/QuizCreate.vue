<template>
  <div class="q-py-md q-pr-md items-start">
    <q-card class="card-quiz-create">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add Pop-Quiz</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-md column">
          <q-input dense outlined v-model="question" name="question" @change="handleChange($event, 'question')" placeholder="Question" />
          <label for="" class="label-form">Options</label>
          <div class="row" v-for="(item, index) in items" :key="index">
            <div class="col-1">
              <q-icon name="drag_indicator" style="margin-top:0.4rem;font-size: 1.5rem;" />
            </div>
            <div class="col-8">
              <q-input dense outlined v-model="item.value" @change="handleChange($event, item.class)" :placeholder="item.placeholder" />
            </div>
            <div class="col-3">
              <q-checkbox v-model="item.correct" v-on:click.native="handleChange($event, item.name)" label="Correct" />
            </div>
          </div>
          <div class="row" @click="addList">
              <q-icon name="add_circle_outline" color="primary" style="margin-top:0.2rem;margin-right:0.2rem"/>
              <label for="" class="text-primary">Add more choice</label>
          </div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-actions align="right" style="padding: 16px">
        <q-btn color="primary" outline label="Cancel" />
        <q-btn color="primary" label="Save" @click="handleSave"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Notify } from 'quasar';

export default {
  data () {
    return {
      question: '',
      items: [
        { value: '', class: 'answer', name: 'answer1', placeholder: 'Question 1', correct: false },
        { value: '', class: 'answer', name: 'answer2', placeholder: 'Question 2', correct: false }
      ]
    };
  },
  methods: {
    addList() {
      const id = this.items.length + 1;
      this.items.push(
        { value: '', class: 'answer', name: `answer${id}`, placeholder: `Question ${id}`, correct: false }
      );
    },
    handleChange(e, field) {
      if (field === 'question') {
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
        message: 'Save Quiz!',
        timeout: 1000,
        type: 'positive',
        color: 'positive',
        icon: 'check'
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.card-quiz-create
  width: 100%
  max-width: 400px
  border-radius: 7px

</style>
