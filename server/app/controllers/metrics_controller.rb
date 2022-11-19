class MetricsController < ApplicationController
  before_action :check_search_params, only: :averages

  def create
    metric = Metric.new metric_params

    metric.save!

    render json: metric
  end

  def averages
    averages = Metric.averages(
      from: params[:from],
      to: params[:to],
      names: params[:names],
      bin_size: params[:bin_size]
    )
    render json: averages
  end

  private

  def metric_params
    params.require(:metric).permit(:timestamp, :name, :value)
  end

  def check_search_params
    params.require(%i[from to names bin_size])
  end
end
