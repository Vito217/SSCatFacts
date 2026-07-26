require "test_helper"

class FactTest < ActiveSupport::TestCase
  test "can not save fact without key and text" do
    fact = Fact.new({})
    assert_not fact.save, "Tried to save fact without parameters"
  end

  test "saving new fact" do
    fact = Fact.new({ fact_key: "0-1", fact_text: "Cats can be pets" })
    assert fact.save, "Fact saved successfully"
  end
end
