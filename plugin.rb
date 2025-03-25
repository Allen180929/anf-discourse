# name: anf-discourse
# about: 显示当前登录用户和服务器时间的插件
# version: 0.1
# authors: Your Name
# url: https://github.com/yourusername/anf-discourse

# 确保所有静态资源都被显式注册
register_asset "javascripts/discourse/templates/anf-discourse.hbs"
register_asset "javascripts/discourse/controllers/anf-discourse.js.es6"
register_asset "javascripts/discourse/routes/anf-discourse.js.es6"
register_asset "javascripts/discourse/anf-discourse-route-map.js.es6"
register_asset "stylesheets/anf-discourse.scss"

# 使用正确的初始化方法
after_initialize do
  module ::AnfDiscourse
    class Engine < ::Rails::Engine
      engine_name "anf_discourse"
      isolate_namespace AnfDiscourse
    end
  end

  require_dependency 'application_controller'
  require_dependency File.expand_path('../app/controllers/anf_discourse_controller.rb', __FILE__)

  # 使用静态 JSON 数据
  ::AnfDiscourse::DATA = {
    stats: {
      daily_visits: 128,
      total_users: 1024,
      online_users: 42,
      new_messages: 7
    }
  }

  # 路由添加更多格式支持
  Discourse::Application.routes.append do
    get '/anf-discourse' => 'anf_discourse/anf_discourse#index', constraints: { format: /(json|html)/ }, as: :anf_discourse
  end
end 