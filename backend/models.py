from datetime import datetime, timezone
from sqlalchemy import String, Integer, ForeignKey, Boolean, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db import Base


class Hostel(Base):
    __tablename__ = "hostels"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    leads: Mapped[list["Lead"]] = relationship(
        back_populates="hostel",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Hostel id={self.id} name={self.name!r}>"


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    hostel_id: Mapped[int] = mapped_column(
        ForeignKey("hostels.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    action: Mapped[str] = mapped_column(String(20), nullable=False)
    actioned: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    remarks: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    hostel: Mapped["Hostel"] = relationship(back_populates="leads")

    def __repr__(self) -> str:
        return f"<Lead id={self.id} name={self.name!r} hostel_id={self.hostel_id}>"
