class MetricsController < ApplicationController
  def index
    metrics = [
      {
        timestamp: DateTime.now,
        name: 'temp',
        value: 23
      }
    ]

    render json: metrics
  end

  def create; end
end
