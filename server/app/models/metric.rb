class Metric < ApplicationRecord
  validates_presence_of :timestamp, :name, :value

  def self.averages(from:, to:, names:, bin_size:)
    # TODO: bin_size needs sanitised?
    result = select(
      "datetime((strftime('%s', timestamp)  / #{bin_size}) * #{bin_size}, 'unixepoch') as bin",
      'name',
      'avg(value) as avg'
    )
             .group(:bin, :name)
             .having(name: names)
             .having(timestamp: (from..to))
             .order(:bin, :name)

    # TODO: Function composition, maybe?
    aggregate_hashes(
      group_hashes(
        flat_hashes(result)
      )
    )
  end

  # TODO: Should we use a more specific name instead of the
  # generic "hashes" or "h"?
  def self.flat_hashes(result)
    result.map do |instance|
      {
        timestamp: DateTime.parse(instance[:bin]),
        name: instance[:name],
        value: instance[:avg]
      }
    end
  end

  def self.group_hashes(flattened_hashes)
    flattened_hashes.group_by do |h|
      h[:timestamp]
    end
  end

  def self.aggregate_hashes(grouped_hashes)
    grouped_hashes.map do |k, v|
      {
        timestamp: k,
        values: v.reduce({}) do |values, data_point|
                  values.merge({ data_point[:name].to_sym => data_point[:value] })
                end
      }
    end
  end
end
