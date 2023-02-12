filename := mayibrowse

.PHONY: build
build: build-gui
	@mkdir -p dist
	@rm -rf dist/$(filename)
	@go build -o ./dist/$(filename) .

.PHONY: build-all
build-all: build-gui
	@mkdir -p dist
	@rm -rf dist/*
	GOOS=linux go build -o ./dist/$(filename)_linux .
	GOOS=windows go build -o ./dist/$(filename)_windows.exe .
	GOOS=darwin go build -o ./dist/$(filename)_darwin.exe .
	@cd dist; zip release.zip *

.PHONY: build-gui
build-gui:
	@cd gui; \
		npm install; \
		npm run build

.PHONY: clean
clean:
	@rm -rf gui/dist dist

