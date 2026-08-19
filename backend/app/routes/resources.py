from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .incidents import incidents


router = APIRouter(
    prefix="/api",
    tags=["Resources"]
)


# ============================================================
# RESOURCE STATE
# ============================================================

resources = {
    "ambulance": 10,
    "rescue": 10,
    "fire": 5
}


archive = []


# ============================================================
# MODELS
# ============================================================

class ResourceUpdate(BaseModel):

    ambulance: int
    rescue: int
    fire: int


class AllocationRequest(BaseModel):

    ambulance: int = 0
    rescue: int = 0
    fire: int = 0


# ============================================================
# GET RESOURCES
# ============================================================

@router.get("/resources")
def get_resources():

    return resources


# ============================================================
# UPDATE TOTAL RESOURCES
# ============================================================

@router.put("/resources")
def update_resources(data: ResourceUpdate):

    if data.ambulance < 0:
        raise HTTPException(
            status_code=400,
            detail="Ambulance count cannot be negative"
        )

    if data.rescue < 0:
        raise HTTPException(
            status_code=400,
            detail="Rescue count cannot be negative"
        )

    if data.fire < 0:
        raise HTTPException(
            status_code=400,
            detail="Fire count cannot be negative"
        )

    resources["ambulance"] = data.ambulance
    resources["rescue"] = data.rescue
    resources["fire"] = data.fire

    return {
        "message": "Resources updated",
        "resources": resources
    }


# ============================================================
# ALLOCATE RESOURCES
# ============================================================

@router.post("/incidents/{incident_id}/allocate")
def allocate_resources(
    incident_id: str,
    data: AllocationRequest
):

    incident = next(
        (
            x
            for x in incidents
            if x.get("id") == incident_id
        ),
        None
    )

    if incident is None:

        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )


    if data.ambulance < 0:
        raise HTTPException(
            status_code=400,
            detail="Invalid ambulance allocation"
        )

    if data.rescue < 0:
        raise HTTPException(
            status_code=400,
            detail="Invalid rescue allocation"
        )

    if data.fire < 0:
        raise HTTPException(
            status_code=400,
            detail="Invalid fire allocation"
        )


    if data.ambulance > resources["ambulance"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough ambulances available"
        )


    if data.rescue > resources["rescue"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough rescue teams available"
        )


    if data.fire > resources["fire"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough fire teams available"
        )


    resources["ambulance"] -= data.ambulance
    resources["rescue"] -= data.rescue
    resources["fire"] -= data.fire


    incident["status"] = "ALLOCATED"

    incident["allocated"] = {
        "ambulance": data.ambulance,
        "rescue": data.rescue,
        "fire": data.fire
    }


    return {
        "message": "Resources allocated",
        "incident": incident,
        "resources": resources
    }


# ============================================================
# COMPLETE INCIDENT
# ============================================================

@router.post("/incidents/{incident_id}/complete")
def complete_incident(
    incident_id: str
):

    incident = next(
        (
            x
            for x in incidents
            if x.get("id") == incident_id
        ),
        None
    )

    if incident is None:

        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )


    allocated = incident.get(
        "allocated",
        {}
    )


    # Return resources

    resources["ambulance"] += allocated.get(
        "ambulance",
        0
    )

    resources["rescue"] += allocated.get(
        "rescue",
        0
    )

    resources["fire"] += allocated.get(
        "fire",
        0
    )


    incident["status"] = "COMPLETED"


    archive.append(
        incident.copy()
    )


    incidents.remove(
        incident
    )


    return {
        "message": "Incident completed",
        "incident": incident,
        "resources": resources
    }


# ============================================================
# ARCHIVE
# ============================================================

@router.get("/incidents/archive")
def get_archive():

    return archive