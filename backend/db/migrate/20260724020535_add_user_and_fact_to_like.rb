class AddUserAndFactToLike < ActiveRecord::Migration[8.1]
  def change
    remove_column :likes, :user_id
    remove_column :likes, :fact_key
    add_reference :likes, :user, null: false, foreign_key: true
    add_reference :likes, :fact, null: false, foreign_key: true
  end
end
