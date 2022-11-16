server '13.212.128.19', user: 'ubuntu', roles: %w(web app db resque_worker resque_scheduler), port: 22

set :branch, 'master'

# set :whenever_environment, proc { fetch :stage }
# set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }
set :deploy_to, "/home/ubuntu/apps/#{fetch(:application)}"

namespace :deploy do
  after 'deploy:check', 'deploy:setup_nginx'
#  after 'deploy', 'whenever:update_crontab'
  after 'deploy', 'deploy:build'

  task :build do
    on roles(:app) do
      execute "cd #{current_path} && npm install"
      execute "cd #{current_path} && npm run build:staging"
      execute "cd #{current_path} && rm -rf public_live"
      execute "cd #{current_path} && mv dist public_live"
      execute "cd #{current_path} && find public_live \\( -name '*.html' -o -name '*.css' -o -name '*.js' \\) -print0 | xargs -0 gzip -9 -kv"
    end
  end
  task :setup_nginx do
    on roles(:app) do
      execute " sudo ln -nfs #{current_path}/config/nginx-staging.conf /etc/nginx/sites-enabled/#{fetch(:application)}"
    end
  end
end