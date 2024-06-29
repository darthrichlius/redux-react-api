.PHONY: start

start:
	@echo "Starting server..."
	cd server && npm run dev &
	@echo "Starting client..."
	cd client && npm run dev