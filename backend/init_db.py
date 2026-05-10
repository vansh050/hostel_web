from db import engine, Base
import models #noqa: F401 -import registers Hostel & lead with Base.metadata

Base.metadata.create_all(engine)
print("Tables created:", list(Base.metadata.tables.keys()))
