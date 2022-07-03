target = sh4

rebuild:
	git pull
	docker build $(target) -t $(target)
	docker run -p 8080:8080 $(target)
	