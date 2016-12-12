Rails.application.routes.draw do
  scope "(:locale)", locale: /en|vn/ do
    namespace :admin do
      root "users#index"
      resources :users
      resources :words
      resources :categories
    end
    get "/help", to: "static_pages#help"
    get "/about", to: "static_pages#about"
    get "signup", to: "users#new"
    get "/login", to: "sessions#new"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    root "static_pages#home"
    resources :users, :categories
    resources :account_activations, only: [:edit]
    resources :password_resets, only: [:new, :create, :edit, :update]
  end
end
