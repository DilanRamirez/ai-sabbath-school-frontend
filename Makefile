run-gha:
	act
	
develop:
	npm run dev

format:
	npx prettier . --write --ignore-path .gitignore

check-format:
	npx prettier . --check --ignore-path .gitignore

lint:
	npx eslint . --ext .js,.jsx,.ts,.tsx

types:
	npx tsc --noEmit

test-all: format check-format lint types

# Build Docker image for dev (macOS/arm64 platform)
IMAGE_NAME=ai-sabbath-school-frontend
build-dev:
	docker build --platform linux/arm64/v8 \
		-t $(IMAGE_NAME):dev .