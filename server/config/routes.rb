Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope path: '/api' do
    scope path: 'v0' do
      post '/metrics', to: 'metrics#create'
      get '/metrics/averages', to: 'metrics#averages'
    end
  end
end
