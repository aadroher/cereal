require 'test_helper'

class MetricsControllerTest < ActionDispatch::IntegrationTest
  test 'fails creating new metric with a ParameterMissing with missing metric param' do
    timestamp = DateTime.now

    error = assert_raises(ActionController::ParameterMissing) do
      post metrics_url, params: {
        timestamp: timestamp,
        name: 'some-label',
        value: 42
      }
    end

    assert_equal 'param is missing or the value is empty: metric', error.message
  end

  test 'fails creating new metric if timestamp is missing' do
    assert_raises(ActiveRecord::RecordInvalid) do
      post metrics_url, params: {
        metric: {
          name: 'some-label',
          value: 42
        }
      }
    end
  end

  test 'fails creating new metric if timestamp is a number' do
    assert_raises(ActiveRecord::RecordInvalid) do
      post metrics_url, params: {
        metric: {
          timestamp: 1989,
          name: 'some-label',
          value: 42
        }
      }
    end
  end

  test 'can create a new metric when all required params are present' do
    timestamp = DateTime.now
    post metrics_url, params: {
      metric: {
        timestamp: timestamp,
        name: 'some-label',
        value: 42
      }
    }

    assert_response :success

    stored_metric = Metric.find JSON.parse(response.body)['id']

    assert_in_delta timestamp.utc, stored_metric.timestamp, 1
    assert_equal 'some-label', stored_metric.name
    assert_equal 42, stored_metric.value
  end

  test 'fails fetching averages with a ParameterMissing with no url params' do
    error = assert_raises(ActionController::ParameterMissing) do
      get metrics_averages_url
    end

    assert_equal 'param is missing or the value is empty: from', error.message
  end

  test 'fails fetching averages a ParameterMissing with only one missing param' do
    error = assert_raises(ActionController::ParameterMissing) do
      get metrics_averages_url, params: {
        from: DateTime.now, to: DateTime.now, names: ['some_label']
      }
    end

    assert_equal 'param is missing or the value is empty: bin_size', error.message
  end

  test 'serves successful response with correct params' do
    get metrics_averages_url, params: {
      from: DateTime.now,
      to: DateTime.now,
      names: ['some_label'],
      bin_size: 180
    }

    assert_response :success
  end
end
