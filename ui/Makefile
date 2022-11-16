.PHONY: build
build:
	docker build -t airtis .
	docker tag airtis:latest 191213556404.dkr.ecr.us-east-1.amazonaws.com/airtis:latest

.PHONY: push
push: build
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 191213556404.dkr.ecr.us-east-1.amazonaws.com
	docker push 191213556404.dkr.ecr.us-east-1.amazonaws.com/airtis:latest
