import { del, get, put } from 'src/lib/HttpHelper';
import { routerInstance } from 'boot/router';

export const kmapGetExpertise = async params => {
  return get({ path: 'api/action/list-expertise-request', params })
    .then(res => {
      return res.data.map(x => {
        return {
          id: x.knowledge_id,
          title: x.user_name,
          subTitle: `Expertise for ${x.knowledge}`,
          extra: x
        };
      });
    });
};
export const kmapGetKnowledge = async params => {
  return get({ path: 'api/action/list-knowledge-request', params })
    .then(res => {
      return res.data.map(x => {
        return {
          id: x.knowledge_id,
          title: x.user_name,
          subTitle: `Knowledge for ${x.knowledge}`,
          extra: x
        };
      });
    });
};
export const kmapOnApproveAll = data => {
  data.list.forEach(y => {
    const knowledgeList = y.extra.knowledge_id.split(',');
    knowledgeList.forEach(async x => {
      await put({
        path: `api/knowledge/${x}`,
        params: { approved: true }
      }).then(res => {
      });
    });
  });
};

export const kmapOnApprove = data => {
  const knowledgeList = data.extra.knowledge_id.split(',');
  knowledgeList.forEach(async x => {
    await put({
      path: `api/knowledge/${x}`,
      params: { approved: true }
    }).then(res => { });
  });
};

export const kmapOnReject = data => {
  const knowledgeList = data.extra.knowledge_id.split(',');
  knowledgeList.forEach(async x => {
    del({
      path: `api/knowledge/${x}`
    }).then(res => {});
  });
};

export const kmapOnGoTo = data => {
  routerInstance.push({
    name: 'knowledge',
    query: {
      id: data.extra.organization_id
    },
    params: {
      knowledge_tree_id: data.extra.knowledge_tree_id,
      knowledge_tree_parent_id: data.extra.strategic_activity_id,
      knowledge_tree_parent_parent_id: data.extra.business_process_id
    }
  });
};
