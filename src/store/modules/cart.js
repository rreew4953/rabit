//  购物车模块
export default {
  namespaced: true,
  state() {
    return {
      //  购物车商品内容
      list: [],
    };
  },
  mutation:{

  }
  // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
  // 线上：比上面多 isCollect 有用 discount 无用 两项项信息

};
