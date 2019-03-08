.PHONY: all deps stop_deps migrate rollback

all:
	./manage.sh start_all

deps:
	./manage.sh start_deps

stop:
	./manage.sh stop

migrate:
	./manage.sh db_migrate

rollback:
	./manage.sh db_rollback
