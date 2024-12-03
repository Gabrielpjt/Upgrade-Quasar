import { point } from 'src/lib/point';
import { get, put, post } from 'src/lib/HttpHelper';
import { routerInstance } from 'boot/router';

export const getRequestJabatan = async params => {
  return get({ path: 'api/profile/request/jabatan/list', params })
    .then(res => {
      return res.data.map(x => {
        return {
          id: x.id,
          title: x.user.name,
          subTitle: `Request for unit kerja: ${x.unit_kerja ? x.unit_kerja.name.toUpperCase() : '-'}, jabatan: ${x.jabatan ? x.jabatan.name.toUpperCase() : '-'}, golongan: ${x.golongan ? x.golongan.name.toUpperCase() : '-'}`,
          extra: x
        };
      });
    });
};

export const requestJabatanOnApprove = data => {
  put({
    path: `api/profile/request/jabatan/confirm/${data.jabatan_id}`,
    params: { status: 1 }
  }).then(res => { });
};

export const requestJabatanOnReject = data => {
  put({
    path: `api/profile/request/jabatan/confirm/${data.jabatan_id}`,
    params: { status: 2 }
  }).then(res => { });
};

export const requestJabatanOnGoTo = data => {
  console.log(data);
  routerInstance.push({
    name: 'profile-detail',
    params: {
      id: data.extra.users_id
    }
  });
};

export const requestJabatanOnApproveAll = data => {
  data.forEach(async x => {
    await put({
      path: `api/profile/request/jabatan/confirm/${x.id}`,
      params: { status: 1 }
    }).then(res => { });
  });
};

export const getRequestProfile = async params => {
  return get({ path: 'api/action/list-profile-request', params })
    .then(res => {
      return res.data.map(x => {
        let profile_type = null;
        let profile_picture = null;
        let user_id = null;
        let subTitle = null;
        let title = null;
        let event_id = null;
        let certificate_id = null;
        let jabatan_id = null;
        let name = null;
        if (x.event_expertise) {
          profile_type = 'speaker';
          profile_picture = x.event_expertise[0].user.profile_picture;
          user_id = x.event_expertise[0].user_id;
          subTitle = `Be a Speaker in ${x.name}`;
          title = x.event_expertise[0].name;
          event_id = x.id;
          name = x.name;
        } else if (x.unit_kerja) {
          profile_picture = x.user.profile_picture;
          profile_type = 'position';
          subTitle = `Request for unit kerja: ${x.unit_kerja ? x.unit_kerja.name.toUpperCase() : '-'}, jabatan: ${x.jabatan ? x.jabatan.name.toUpperCase() : '-'}, golongan: ${x.golongan ? x.golongan.name.toUpperCase() : '-'}`;
          title = x.user.name;
          jabatan_id = x.id;
        } else {
          profile_type = 'training_external';
          profile_picture = x.pp;
          user_id = x.users_id;
          subTitle = `Be a Participant in ${x.name}`;
          title = x.u_name;
          certificate_id = x.id;
          name = x.name;
        }
        return {
          profile_type,
          id: x.id,
          name,
          event_id,
          certificate_id,
          jabatan_id,
          subTitle,
          title,
          user_id,
          profile_picture,
          extra: x
        };
      });
    });
};
export const goToProfile = data => {
  routerInstance.push({
    name: 'profile-detail',
    params: {
      id: data.users_id
    }
  });
};
export const speakerOnApprove = data => {
  put({
    path: `api/event/verify/${data.event_id}`,
    params: {
      status: 'Approved',
      reason: '',
      enabled: true,
      user_id: data.user_id,
      type: 'Speaker'
    }
  }).then(res => {
    point('add', { tag: 'profile_speaker', event_id: data.event_id, account_id: data.user_id });
  });
};
export const speakerOnApproveAll = data => {
  data.forEach(async x => {
    await put({
      path: `api/event/verify/${x.event_id}`,
      params: {
        status: 'Approved',
        reason: '',
        enabled: true,
        user_id: x.user_id,
        type: 'Speaker'
      }
    }).then(res => {
      point('add', { tag: 'profile_speaker', event_id: x.event_id, account_id: x.user_id });
    });
  });
};
// export const SpeakerOnApproveAll = async data => {
//   const data_approve = [];
//   for (let index = 0; index < data.length; index++) {
//     // eslint-disable-next-line no-await-in-loop
//     const dt = await put({
//       path: `api/event/verify/${data[index].event_id}`,
//       params: {
//        status: 'Approved',
//        reason: '',
//        enabled: true,
//        user_id: data[index].user_id,
//        type: 'Speaker'
//       }
//     });
//     data_approve.push(
//       dt
//     );
//     point('add', { tag: 'profile_speaker', event_id: data[index].event_id, account_id: data[index].user_id });
//   }
//   return data_approve;
// };

export const externalTrainingOnApprove = data => {
  post({
    path: `api/certificate/approval/${data.certificate_id}`,
    params: {
      status: 'approved',
      reason: ''
    }
  }).then(res => { point('add', { tag: 'profile_certificate', certificate_id: data.certificate_id, account_id: data.user_id }); });
};
export const externalTrainingOnApproveAll = data => {
  data.forEach(async x => {
    await post({
      path: `api/certificate/approval/${x.certificate_id}`,
      params: {
        status: 'approved',
        reason: ''
      }
    }).then(res => {
      point('add', { tag: 'profile_certificate', certificate_id: x.certificate_id, account_id: x.user_id });
    });
  });
};

// export const externalTrainingOnApproveAll = async data => {
//   const data_approve = [];
//   for (let index = 0; index < data.length; index++) {
//     // eslint-disable-next-line no-await-in-loop
//     const dt = await post({
//       path: `api/certificate/approval/${data[index].certificate_id}`,
//       params: {
//         status: 'approved',
//         reason: ''
//       }
//     });
//     data_approve.push(
//       dt
//     );
//     point('add', { tag: 'profile_certificate', certificate_id: data[index].certificate_id, account_id: data[index].user_id });
//   }
//   return data_approve;
// };
