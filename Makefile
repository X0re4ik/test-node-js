


dev-services:
	docker-compose -f ./docker/environment/docker-compose.yml --env-file=./docker/environment/docker-compose.env up -d --build