from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime

from datetime import datetime

from .database import Base


class Report(Base):

    __tablename__ = "reports"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    description = Column(
        String,
        nullable=False
    )


    emergency_type = Column(
        String,
        nullable=False
    )


    latitude = Column(
        Float,
        nullable=True
    )


    longitude = Column(
        Float,
        nullable=True
    )


    people_affected = Column(
        Integer,
        default=1
    )


    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )


    status = Column(
        String,
        default="NEW"
    )


    urgency = Column(
        Float,
        default=0
    )


    severity = Column(
        Float,
        default=0
    )


    confidence = Column(
        Float,
        default=0
    )


    risk_score = Column(
        Float,
        default=0
    )


    priority = Column(
        String,
        default="MEDIUM"
    )


    hotspot_id = Column(
        String,
        nullable=True
    )


    predicted_risk = Column(
        Float,
        default=0
    )