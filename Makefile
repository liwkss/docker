target = sh3

rebuild:
	git pull
	docker build $(target) -t $(target)
	docker run $(target)
	