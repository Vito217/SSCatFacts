class CreateLikes < ActiveRecord::Migration[8.1]
  def change
    create_table :likes do |t|
      t.string :username
      t.string :fact_key

      t.timestamps
    end
  end
end
