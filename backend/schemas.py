from typing import Literal, Optional
from pydantic import BaseModel, ConfigDict, Field

HostelName = Literal[
    "Muskan Girls Hostel",
    "Sanskriti Girls Hostel",
    "Sankalp Boys Hostel",
]


class LeadIn(BaseModel):
    """Validated input for POST /lead."""

    hostel: HostelName
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    action: Literal["call", "whatsapp"]


class LoginIn(BaseModel):
    """Validated input for POST /login."""

    model_config = ConfigDict(extra="forbid")

    username: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=1, max_length=200)


class LeadUpdate(BaseModel):
    """Validated input for PATCH /admin/leads/<id>. Both fields optional - partial update."""

    model_config = ConfigDict(extra="forbid")

    actioned: Optional[bool] = None
    remarks: Optional[str] = Field(default=None, max_length=1000)
