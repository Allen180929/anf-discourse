import DiscourseRoute from 'discourse/routes/discourse';
import { ajax } from 'discourse/lib/ajax';
import { withPluginApi } from 'discourse/lib/plugin-api';

export default DiscourseRoute.extend({
  activate() {
    this._super(...arguments);
    // 通知系统该路由已激活
    withPluginApi('0.8.31', api => {
      api.onPageChange(() => {
        console.log('ANF Discourse 页面已加载');
      });
    });
  },
  
  model() {
    return ajax('/anf-discourse.json')
      .catch(error => {
        console.error('加载 ANF Discourse 数据失败', error);
        return {
          error: '数据加载失败',
          currentUser: null,
          serverTime: new Date().toString()
        };
      });
  },
  
  setupController(controller, model) {
    controller.setProperties({
      currentUser: model.current_user,
      serverTime: model.server_time,
      stats: model.stats
    });
  }
}); 