# config valid only for current version of Capistrano
lock "3.9.0"

set :application, 'eduwonka-custom-client'
set :repo_url, 'git@gitlab.com:ravensnowbird/eduwonka-custom-client.git'
set :user, 'ubuntu'
set :deploy_to, "/home/ubuntu/apps/#{fetch(:application)}"

set :linked_dirs, %w(public_live)

set :keep_releases, 1

username = ENV['USER'] || ENV['USERNAME']
branch = fetch(:branch)
application = fetch(:application)
stage = fetch(:stage)

set :slack_msg_starting, -> { "#{username} has started deploying branch #{branch} of #{application} to #{stage}." }
set :slack_msg_finished, -> { "#{username} has finished deploying branch #{branch} of #{application} to #{stage}." }
set :slack_msg_failed,   -> { "*ERROR!* #{username} failed to deploy branch #{branch} of #{application} to #{stage}." }
set :bundle_gemfile, -> { release_path.join('Gemfile') }
