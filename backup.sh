#!/bin/sh

# Function to wait for PostgreSQL to be ready
wait_for_postgres() {
  until pg_isready -h "$PGHOST" -p 5432 -U "$PGUSER" >/dev/null 2>&1; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 5
  done
}

# Function to perform the backup
perform_backup() {
  # Create a timestamp
  TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

  # Define backup file name
  BACKUP_FILE="/backups/backup-$TIMESTAMP.sql"

  # Perform the backup using pg_dumpall
  pg_dumpall -h "$PGHOST" -U "$PGUSER" -f "$BACKUP_FILE"

  # Check if the backup was successful
  if [ $? -eq 0 ]; then
    echo "Backup successfully created at $BACKUP_FILE"
  else
    echo "Backup failed"
    exit 1
  fi
}

# Main script execution
echo "Preparing backup process..."
wait_for_postgres
echo "PostgreSQL is ready. Starting backup..."
perform_backup

