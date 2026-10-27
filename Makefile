export PATH := $(PATH):/usr/local/go/bin:$(HOME)/go/bin

.PHONY: dev live/templ live/tailwind live/server templ css css-watch build run clean

dev:
	$(MAKE) -j3 live/templ live/tailwind live/server

live/templ:
	templ generate --watch --proxy="http://localhost:8080" --open-browser=false

live/tailwind:
	npx tailwindcss -i ./styles/globals.css -o ./public/css/styles.css --watch=always

live/server:
	air

templ:
	templ generate

css:
	npx tailwindcss -i ./styles/globals.css -o ./public/css/styles.css --minify

css-watch:
	npx tailwindcss -i ./styles/globals.css -o ./public/css/styles.css --watch=always

build: templ css
	go build -o bin/server ./cmd/server

run: templ css
	go run ./cmd/server

clean:
	rm -rf bin tmp public/css/styles.css *_templ.txt templates/*_templ.txt
