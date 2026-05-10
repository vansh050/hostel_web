from sqlalchemy import select
from db import SessionLocal
from models import Hostel

HOSTELS = [
    {"name": "Muskan Girls Hostel", "slug": "muskan"},
    {"name": "Sanskriti Girls Hostel", "slug": "sanskriti"},
    {"name": "Sankalp Boys Hostel", "slug": "sankalp"},


]

def main() -> None:
    with SessionLocal() as session:
        for h in HOSTELS:
            existing = session.scalar(select(Hostel).where(Hostel.name== h["name"]))
            if existing:
                print(f"skip: {h['name']} alaready exists (id={existing.id})")
                continue
            session.add(Hostel(name=h["name"], slug=h["slug"]))
            print(f"add: {h['name']}")
        session.commit()

    with SessionLocal() as session:
        rows= session.scalars(select(Hostel).order_by(Hostel.id)).all()
        print("\nFinal state:")
        for r in rows:
            print(f" {r.id}: {r.name} ({r.slug})")

if __name__ == "__main__":
    main()
