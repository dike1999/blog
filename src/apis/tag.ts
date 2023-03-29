import request from '@/utils/request';

function getTagList(params) {
  const url = '/tag/list';
  return request.get(url, { params });
}

export default { getTagList };
