import { get } from 'src/lib/HttpHelper';

export const searchBar = async params => {
  return get({
    path: 'api/search/top-bar',
    params
  })
    .then(res => {
      return res.data;
    });
};
