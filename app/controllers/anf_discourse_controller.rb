module ::AnfDiscourse
  class AnfDiscourseController < ::ApplicationController
    skip_before_action :check_xhr
    
    def index
      # 如果是 API 请求则返回 JSON
      if request.format.json?
        render json: {
          current_user: current_user ? current_user.username : nil,
          server_time: Time.now.strftime("%Y-%m-%d %H:%M:%S")
        }
      else
        # 使用 Discourse 的标准布局渲染方法
        render 'default/empty'
      end
    end
  end
end 