class Fact < ApplicationRecord
    has_many :likes

    validates :fact_key, presence: true
    validates :fact_text, presence: true
end
