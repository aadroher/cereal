class CreateMetrics < ActiveRecord::Migration[7.0]
  def change
    create_table :metrics do |t|
      t.datetime :timestamp
      t.string :name
      t.decimal :value

      t.timestamps
    end
  end
end
