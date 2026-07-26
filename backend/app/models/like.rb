class Like < ApplicationRecord
    belongs_to :user
    belongs_to :fact

    validates :user, presence: true
    validates :fact, presence: true
end
