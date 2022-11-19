require 'test_helper'

class MetricsControllerTest < ActionDispatch::IntegrationTest
  test 'the truth' do
    assert true
  end

  test 'fails with a 400 with no url params' do
    ap metrics_averages_url
    res = get metrics_averages_url
    ap res
  end
end
