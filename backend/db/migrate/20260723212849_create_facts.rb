class CreateFacts < ActiveRecord::Migration[8.1]
  def change
    create_table :facts do |t|
      t.string :fact_key
      t.string :fact_text

      t.timestamps
    end
  end
end
