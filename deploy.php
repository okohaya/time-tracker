<?php
namespace Deployer;

require 'recipe/laravel.php';

$host = getenv('DEPLOY_HOST');
if (!$host) {
    fwrite(STDERR, "error: need to set env DEPLOY_HOST\n");
    exit(1);
}

// Project name
set('application', 'time-tracker');

// Project repository
set('repository', 'x');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server 
set('http_group', 'www-data');
set('writable_mode', 'chgrp');
set('writable_use_sudo', true);
add('writable_dirs', []);

set('allow_anonymous_stats', false);

// Hosts
host($host)
    ->set('deploy_path', '~/deploy/{{application}}');

// Tasks
task('build', function () {
    run('composer install --no-dev');
    cd('client');
    run('yarn');
    run('yarn webpack -p --mode production');
    run('rm -r node_modules');
})->local();

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// deploy

task('upload', function () {
    upload(__DIR__.'/', '{{release_path}}');
});

task('deploy', [
//  'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',

//  'deploy:update_code',
    'upload',

    'deploy:shared',
//  'deploy:vendors',
    'deploy:writable',

//  'artisan:storage:link',
//  'artisan:view:clear',
//  'artisan:cache:clear',
//  'artisan:config:cache',
//  'artisan:optimize',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
]);
after('deploy', 'success');

// Migrate database before symlink new release.
//before('deploy:symlink', 'artisan:migrate');
