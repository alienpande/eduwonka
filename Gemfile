source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


#Deployments
gem 'capistrano', '3.9'
# gem 'capistrano-npm'
# # gem 'capistrano-pm2'
gem 'capistrano-bundler', '~> 1.3'
gem 'net-ssh', '>= 6.0.2'
gem 'ed25519', '>= 1.2', '< 2.0'
gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'
gem 'capistrano-rvm'
