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

  def averages
    clean_params = params
    ap clean_params[:from]
    averages = Metric.averages(
      from: params[:from],
      to: params[:to],
      names: params[:names],
      bin_size: params[:bin_size]
    )
    render json: averages
  end

  def create; end
end
