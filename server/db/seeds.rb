# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Faker::Config.random = Random.new(1984)

NUM_RECORDS_PER_NAME = 5_000
NAMES = %w[temperature pressure insolation].freeze
INITIAL_DATETIME = DateTime.now

NAMES.each do |name|
  metrics_data = (0...NUM_RECORDS_PER_NAME).map do |i|
    step_in_seconds = 60 * 2
    time_noise_seconds = Faker::Number.within range: (0..5)
    timestamp = INITIAL_DATETIME - (i * step_in_seconds + time_noise_seconds).seconds
    {
      timestamp: timestamp,
      name: name,
      value: Faker::Number.between(from: 0, to: 100.0)
    }
  end
  Metric.create! metrics_data
end
