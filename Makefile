RUNNER := npm run env npm run

start:
	$(RUNNER) start

docker/up:
	docker-compose up -d

docker/down:
	docker-compose down

docker/drop:
	docker-compose down --volumes

migration/up:
	$(RUNNER) node-pg-migrate up

migration/down:
	$(RUNNER) node-pg-migrate down

migration/redo:
	$(RUNNER) node-pg-migrate redo

migration/create:
	$(RUNNER) node-pg-migrate create -j=sql
