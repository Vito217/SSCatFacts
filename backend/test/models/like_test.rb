require "test_helper"

class LikeTest < ActiveSupport::TestCase
  test "can not save without user and fact" do
    like = Like.new({})
    assert_not like.save, "Tried to save like without user and fact"
  end

  test "saving new like" do
    user = User.find_by(username: "username")
    fact = Fact.find_by(fact_key: "0-0", fact_text: "Cats are animals")
    like = Like.new({ user: user, fact: fact })
    assert like.save, "Like saved successfully"
  end
end
