import { createPointHistory } from 'src/lib/api';
import { existingStore as store } from 'src/store';
import bus from 'components/common/EventBus';

export const point = (action, data) => {
  const config_data = store.getters['gamification/activityByTag'](data.tag);
  const new_data = {
    tag: data.tag,
    activity_id: config_data.id || null,
    point: config_data.point || 0,
    post_id: data.post_id || 0,
    channel_id: data.channel_id || 0,
    account_id: data.account_id || 0,
    training_id: data.training_id || 0,
    pop_quiz_id: data.pop_quiz_id || 0,
    knowledge_id: data.knowledge_id || 0,
    certificate_id: data.certificate_id || 0,
    event_id: data.event_id || 0
  };

  setTimeout(() => {
    bus.$emit('onRefreshPoint', {});
  }, 5000);

  if (action === 'add') return createPointHistory(new_data);
  if (action === 'rollback') return createPointHistory({ ...new_data, point: new_data.point * -1 });

  return null;
};
