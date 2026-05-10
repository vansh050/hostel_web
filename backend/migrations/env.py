import os
import sys
from pathlib import Path
from logging.config import fileConfig

from sqlalchemy import create_engine, pool
from dotenv import load_dotenv

from alembic import context

# env.py runs from backend/migrations/ — add backend/ to sys.path so we can
# import the app's own modules (db, models).
BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

# Load .env so DATABASE_URL is available before we read it.
load_dotenv(BACKEND_DIR / ".env")

# Importing models is what registers tables in Base.metadata (side effect of
# class definition). Without this line, autogenerate sees zero tables and
# proposes dropping everything.
from db import Base
import models  # noqa: F401

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

# Read DATABASE_URL directly — bypassing alembic.ini avoids configparser's
# %-interpolation gotcha when the URL contains percent-encoded characters
# (e.g. %40 for @ in the password).
DATABASE_URL = os.environ["DATABASE_URL"]

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode (emits SQL strings, no DB connection)."""
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode (live connection to the DB)."""
    connectable = create_engine(DATABASE_URL, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
