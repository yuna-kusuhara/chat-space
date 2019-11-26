class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.index  :name, unique: true
      # 一意性制約
      t.timestamps
    end
  end
end
