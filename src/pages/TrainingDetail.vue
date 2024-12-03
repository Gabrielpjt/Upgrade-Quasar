<template>
    <q-page>
    <LeftBar/>
    <TrainingBar/>
    <div class="row q-pa-none kmp-content">
      <div class="col-12">
        <TrainingDetail />
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import TrainingBar from 'components/training/TrainingBar';
import TrainingDetail from 'components/training/TrainingDetail';

export default {
  components: { LeftBar, TrainingBar, TrainingDetail }
};
</script>

