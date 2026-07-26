require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "save user with unique username and password" do
    user = User.new({ username: "juan", password: "contrasena" })
    assert user.save, "User saved correctly"
  end

  test "save user with not unique username and password" do
    user = User.new({ username: "username", password: "password" })
    assert_not user.save, "User already exists"
  end

  test "save user with no username and password" do
    user = User.new({})
    assert_not user.save, "User has no parameters"
  end
end
