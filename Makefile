install: install-deps
	npx simple-git-hooks

gendiff:
	bin/gendiff.js

install-deps:
	npm ci

test:
	npx jest

test-coverage:
	npx jest --coverage

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
