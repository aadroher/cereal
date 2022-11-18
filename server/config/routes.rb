Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope path: '/api' do
    scope path: 'v0' do
      get '/metrics', to: 'metrics#index'
      get '/metrics/averages', to: 'metrics#averages'
      post '/metrics', to: 'metrics#create'
    end
  end
end
