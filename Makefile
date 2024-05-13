


dev-services:
	docker-compose -f ./docker/environment/docker-compose.yml --env-file=./docker/environment/docker-compose.env up -d --build

deploy-prod-version:
	docker-compose -f ./docker-compose.prod.yml --env-file=./docker-compose.prod.env up -d --build


deploy-dev-local-version:
	docker-compose -f ./docker-compose.dev.local.yml --env-file=./docker-compose.dev.local.env up -d --build