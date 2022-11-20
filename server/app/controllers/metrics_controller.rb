class MetricsController < ApplicationController
  before_action :validate_search_params, only: :averages

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

  def validate_search_params
    params.require(%i[from to names bin_size])
    validate_dates
  end

  def validate_dates
    validate_dates_format
    validate_dates_diff
  end

  def validate_dates_format
    begin
      DateTime.parse params[:from]
    rescue StandardError
      raise ActionController::BadRequest.new, 'param is not well formed: from'
    end

    begin
      DateTime.parse params[:to]
    rescue StandardError
      raise ActionController::BadRequest, 'param is not well formed: to'
    end
  end

  def validate_dates_diff
    return unless params[:to] < params[:from]

    raise ActionController::BadRequest, 'to should represent a date greater or equal than from'
  end
end
