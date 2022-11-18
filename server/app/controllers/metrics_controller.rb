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
    ap params
    metrics = Metric
              .all
              .where(timestamp: (params[:from]..params[:to]))
              .where(name: params[:names])
              .order(:timestamp)

    render json: metrics
  end

  def create; end

  private

  def metric_averages_params
    params.require(:from, :to).permit(:names, :bin_size)
  end
end
