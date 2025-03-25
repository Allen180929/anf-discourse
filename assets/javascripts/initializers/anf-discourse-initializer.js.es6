import { withPluginApi } from 'discourse/lib/plugin-api';
import DiscourseRoute from 'discourse/routes/discourse';

export default {
  name: "anf-discourse-initializer",
  initialize() {
    withPluginApi("0.8.31", api => {
      // 添加路由
      api.addDiscoveryQueryParam('anf_discourse', {replace: true});
      
      // 添加路由到菜单
      api.addNavigationBarItem({
        name: 'anf-discourse',
        displayName: I18n.t('anf_discourse.title'),
        href: '/anf-discourse'
      });
    });
  }
}; 