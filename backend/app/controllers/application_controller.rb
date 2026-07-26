class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  # before_action :authenticate_user
  include ActionController::Cookies

  # private

  # def current_user
  #  @current_user ||= User.find_by_id(session[:user_id])
  # end

  # private

  # def authenticate_user
  #  render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
  # end
end
