#!/bin/bash

function hasCommand() {
  command -v "$1" >/dev/null 2>&1
}

function buildAll {
    docker-compose build
}

function stopAll {
    docker-compose down
}

function startDatabase {
    echo "Starting the database server..."
    docker-compose up -d database

    if hasCommand mysqladmin; then
        echo 'MySQL admin tool found. Waiting to boot: '
        while ! mysqladmin ping -h'127.0.0.1' -u'root' -p'secret' --silent  > /dev/null 2>&1; do
            printf "."
            sleep 1
        done
        echo ""
    else
        echo 'Your system does have mysql admin tool. Sleeping 30 seconds...'
        sleep 30
    fi

}

function startCache {
    echo "Starting the cache server..."
    docker-compose up -d cache
}

function startApps {
    echo "Starting api & ui..."
    docker-compose up api ui
}

function buildAndStartAll {
    stopAll
    buildAll
    startDatabase
    startCache
    startApps
    stopAll
}

function buildAndStartDeps {
    stopAll
    startDatabase
    startCache
}

case "$1" in
"start_all")
    buildAndStartAll
;;
"start_deps")
    buildAndStartDeps
;;
"stop")
    stopAll
;;
"db_migrate")
    docker exec -it project-api yarn db:migrate
;;
"db_rollback")
    docker exec -it project-api yarn db:rollback
;;
*)
    echo "Usage: ./manage.sh start_all | start_deps"
    exit 1
;;
esac
