
#!/bin/bash

# Wait for the PostgreSQL server to be ready
until pg_isready -h postgres -p 5432 -U "$PGUSER"; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 5
done

echo "PostgreSQL is ready. Starting backup..."

# Create a timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Define backup file name
BACKUP_FILE="/backups/backup-$TIMESTAMP.sql"

# Perform the backup using pg_dumpall
pg_dumpall -h postgres -U "$PGUSER" -f "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Backup successfully created at $BACKUP_FILE"
else
  echo "Backup failed"
  exit 1
fi
