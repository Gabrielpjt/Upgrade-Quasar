import { get, post } from 'src/lib/HttpHelper';
import { routerInstance } from 'boot/router';

export const trainingGetParticipant = async params => {
  return get({ path: 'api/action/list-participant-request', params })
    .then(res => {
      return res.data.map(x => {
        return {
          id: x.id_participant,
          training_id: x.training_id,
          name: x.name,
          title: x.user_name,
          subTitle: `Be a participant in ${x.name}`,
          extra: x
        };
      });
    });
};

export const trainingOnGoTo = data => {
  routerInstance.push({
    name: 'training-detail',
    params: {
      id: data.training_id
    }
  });
};

export const trainingOnApproveAll = async data => {
  console.log(data);
  const data_approve = [];
  for (let index = 0; index < data.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    const dt = await post({
      path: `api/training/approval/${data[index].id}`,
      params: {
        participant_type: 'registered',
        link_detail: `${window.location.origin}/training/detail/${data[index].training_id}`,
        keterangan_atasan: ['a', 'b', 'c'],
        alasan_ditolak: null
      }
    });
    data_approve.push(
      dt
    );
  }
  return data_approve;
};
