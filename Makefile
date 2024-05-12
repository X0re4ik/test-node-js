


dev-services:
	docker-compose -f ./docker/environment/docker-compose.yml --env-file=./docker/environment/docker-compose.env up -d --build

deploy-prod-version:
	docker-compose -f ./docker-compose.prod.yml --env-file=./docker-compose.prod.env up -d --build