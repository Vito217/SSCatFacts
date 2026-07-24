class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: { logged_in: true, user: user, likes: user.likes.as_json(include: :fact) }
        else
            render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
    end

    def is_logged_in?
        if session[:user_id]
            user = User.find(session[:user_id])
            render json: { logged_in: true, user: user, likes: user.likes.as_json(include: :fact) }
        else
            render json: { logged_in: false }
    end

  end

    def destroy
        session.delete(:user_id)
        head :no_content
    end
    
end
