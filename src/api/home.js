//  提供首页相关 API 函数
import { request } from '@/utils/request';

/**
  获取品牌
  * @param {integer} limit - 品牌个数
  * @return Promise
*/
export const findBrand = limit => {
  return request('/home/brand', 'get', { limit });
};

/**
 * 获取广告图
 * @return Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get');
};

/**
 * 获取新鲜好物
 * @return Promise
 */
export const findNew = () => {
  return request('/home/new', 'get');
};

/**
 * 获取热门推荐
 * @return Promise
 */
export const findHot = () => {
  return request('/home/hot', 'get');
};

/**
 * 获取商品
 * @return Promise
 */
export const findGoods = () => {
  return request('home/goods', 'get');
};

/**
 * 获取专题
 * @return Promise
 */
export const findSpecial = () => {
  return request('home/special', 'get');
};
