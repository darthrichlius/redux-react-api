.PHONY: start

start:
	# ------- Dependency checking
	@echo "Checking for SQLite..."
	which sqlite3 >/dev/null || { echo "Error: SQLite is required" && exit 1; }
	@echo "Checking npx..."
	which npx >/dev/null || { echo "Error: npx is required" && exit 1; }

	# ------- Cleaning the environment
	@echo " Cleaning the environment..."
	# This will remove an existing `prismaClient`
	cd server && test -d node_modules && rm -rf node_modules &
	cd server && test -d data && rm -rf data && mkdir -p data && touch data/dev.db &
	cd server && test -d prisma/migrations && rm -rf prisma/migrations &
	cd server && npm install

	# ------- Database
	@echo "Setting up the database..."
	cd server && npx prisma migrate dev && npx prisma generate

	# ------- Server
	@echo "Starting server..."
	cd server && npm run dev &

	# ------- Client
	@echo "Starting client..."
	cd client && npm install && npm run dev