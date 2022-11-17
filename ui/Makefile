.PHONY: build
build:
	docker build --platform linux/amd64 -t airtis .
	docker tag airtis:latest 191213556404.dkr.ecr.us-east-1.amazonaws.com/airtis:latest

.PHONY: push
push: build
	docker push 191213556404.dkr.ecr.us-east-1.amazonaws.com/airtis:latest

deploy: push
	kdev rollout restart deployment/airtis
