target = sh4

rebuild:
	git pull
	docker build $(target) -t $(target)
	docker run -d -p 8080:8080 $(target)
	