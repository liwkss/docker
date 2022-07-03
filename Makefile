rebuild:
	git pull
	docker build sh1 -t sh1
	docker run sh1
	