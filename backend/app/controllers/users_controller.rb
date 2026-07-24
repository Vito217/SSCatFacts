class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    # use this function to create a new user
    def create
        existing_user = User.find_by(username: user_params[:username])
        if existing_user
            # the user already exists
            render json: { error: 'User already exists' }, status: :unauthorized
        else
            user = User.new(user_params)
            if user.save
                # send user to database
                render json: user, status: :created
            else
                # error during saving
                render json: { error: 'Could not create user' }, status: :unprocessable_entity
            end
        end
    end

    private
    
    def user_params
        params.permit(:username, :password)
    end

end
