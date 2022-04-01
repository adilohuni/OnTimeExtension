run_options := $(filter-out $@,$(MAKECMDGOALS))
.PHONY:
	chromium firefox

all:
	chromium firefox

chromium:
	./utilities/make-chromium.sh
firefox:
	./utilities/make-firefox.sh

