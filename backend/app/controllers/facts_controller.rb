class FactsController < ApplicationController
    skip_before_action :verify_authenticity_token

    # Use this function to register and unregister likes
    def like
        # Needs user session
        if session[:user_id]

            # get user to be associated wih like
            user = User.find(session[:user_id])

            # if fact is not registered, add to database
            fact = Fact.find_by(fact_key: params[:fact_key])
            if !fact
                fact = Fact.new(fact_params)
                fact.save
            end

            # if fact is already liked
            like = Like.find_by(user: user, fact: fact)
            if like
                if params[:checked]
                    # if user wants to like it again, do nothing
                    render json: { message: "Already liked" }, status: :ok
                else
                    # else, dislike it (destroy entry)
                    like.destroy
                    render json: { logged_in: true, user: user, likes: user.likes.as_json(include: :fact) }
                end
            else
                if params[:checked]
                    # like the fact (send to database)
                    like = Like.new({ user: user, fact: fact })
                    like.save
                    render json: { logged_in: true, user: user, likes: user.likes.as_json(include: :fact) }
                else
                    # fact is already disliked. do nothing
                    render json: { message: "Already disliked" }, status: :ok
                end
            end
        else
            render json: { message: "Not logged in" }, status: :unauthorized
        end
    end

    # use this function to get current user's likes
    def user_likes
        # Needs user session
        if session[:user_id]
            user = User.find(session[:user_id])
            render json: { likes: user.likes.as_json(include: :fact) }
        else
            render json: { message: "Not logged in" }, status: :unauthorized
        end
    end

    # use this function to get all liked facts, sorted by most popular
    def popular_facts
        # Needs user session
        if session[:user_id]

            facts = Fact.left_joins(:likes).group(:id).order(Arel.sql("COUNT (likes.id) DESC"))
            render json: { facts: facts }, status: :ok

        else
            render json: { message: "Not logged in" }, status: :unauthorized
        end
    end

    private

    # filter fact params
    def fact_params
        params.permit(:fact_key, :fact_text)
    end
end
