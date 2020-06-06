default:build

install:
	./src/tasks/install-prerequisites.sh
	./src/tasks/install.sh
	./src/tasks/update-data.sh

build:
	npm run build

start:
	npm run start

$(V).SILENT:
.PHONY: build