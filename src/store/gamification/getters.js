export function config(state) {
  return state.config;
}

export function activity(state) {
  return state.activity;
}

export function activityByTag(state, getters) {
  if (!getters.activity) {
    return () => null;
  }

  return tag => {
    return getters.activity.find(x => x.tag === tag);
  };
}

export function configByName(state, getters) {
  if (!getters.config) {
    return () => null;
  }

  return level_name => {
    return getters.config.find(x => x.level_name === level_name);
  };
}
