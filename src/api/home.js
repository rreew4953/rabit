import { request } from '@/utils/request';

//  获取数据  品牌
export const findBrand = limit => {
  return request('/home/brand', 'get', { limit });
};
