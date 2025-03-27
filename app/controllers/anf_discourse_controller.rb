module ::AnfDiscourse
  class AnfDiscourseController < ::ApplicationController
    requires_plugin "anf-discourse"
    skip_before_action :check_xhr

    def index
      respond_to do |format|
        format.html do
          # 显式告诉 Discourse 这是一个 Ember 应用路由
          @body_classes = "anf-discourse-page"
          render "layouts/application"
        end

        format.json do
          render json: {
                   current_user: current_user ? current_user.username : nil,
                   server_time: Time.now.strftime("%Y-%m-%d %H:%M:%S"),
                   stats: ::AnfDiscourse::DATA[:stats],
                 }
        end
      end
    rescue => e
      # 添加错误日志便于调试
      Rails.logger.error("ANF Discourse 错误: #{e.message}\n#{e.backtrace.join("\n")}")
      render plain: "加载插件时发生错误: #{e.message}", status: 500
    end
  end
end
