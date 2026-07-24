class RenameLikesColumnUser < ActiveRecord::Migration[8.1]
  def change
    change_table :likes do |t|
      t.rename :username, :user_id
    end
  end
end
