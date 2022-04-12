run_options := $(filter-out $@,$(MAKECMDGOALS))

all:
	chromium && firefox

chromium:
	./utilities/make-chromium.sh
firefox:
	./utilities/make-firefox.sh

