# name: anf-discourse
# about: GitHub Repository Rankings Plugin
# version: 0.1
# authors: Your Name
# url: https://github.com/yourusername/anf-discourse

# 确保所有静态资源都被显式注册
register_asset "stylesheets/ranking-page.scss"

# 加载国际化文件
register_locale_files if respond_to?(:register_locale_files)

# 使用正确的初始化方法
after_initialize do
  module ::AnfDiscourse
    class Engine < ::Rails::Engine
      engine_name "anf_discourse"
      isolate_namespace AnfDiscourse
    end
  end

  require_dependency "application_controller"

  # 创建一个简单的控制器
  class ::AnfDiscourse::AnfDiscourseController < ::ApplicationController
    requires_plugin "anf-discourse"

    def index
      render json: success_json
    end
  end

  # 简化路由定义
  Discourse::Application.routes.append do
    get "/anf-discourse" => "anf_discourse/anf_discourse#index"
  end
end
