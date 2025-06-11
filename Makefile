run-gha:
	act
	
develop:
	npm run dev

format:
	npx prettier . --write --ignore-path .gitignore

check-format:
	npx prettier . --check --ignore-path .gitignore

.PHONY: test-lint
test-lint: node_modules/eslint
	npm run test:lint

types:
	npx tsc --noEmit

test-all: format check-format types