class Metric < ApplicationRecord
  def self.averages(from:, to:, names: [], bin_size: 60)
    # bin_size needs sanitised
    result = select(
      "datetime((strftime('%s', timestamp)  / #{bin_size}) * #{bin_size}, 'unixepoch') as bin",
      'name',
      'avg(value) as avg'
    )
             .group(:bin, :name)
             .having(name: names)
             .order(:bin, :name)

    ap result

    flat_hashes = result.map do |instance|
      {
        timestamp: instance[:bin],
        name: instance[:name],
        value: instance[:avg]
      }
    end

    grouped_hashes = flat_hashes.group_by do |h|
      h[:timestamp]
    end

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
