from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/incidents",
    tags=["Incidents"]
)


# =========================================================
# ACTIVE INCIDENTS
# =========================================================

incidents = []


# =========================================================
# COMPLETED INCIDENT ARCHIVE
# =========================================================

completed_incidents = []


# =========================================================
# RESOURCE STATE
# =========================================================

resources = {
    "ambulance": 10,
    "rescue": 10,
    "fire": 5
}


# =========================================================
# RESOURCE ALLOCATION REQUEST
# =========================================================

class AllocationRequest(BaseModel):

    ambulance: int = 0
    rescue: int = 0
    fire: int = 0


# =========================================================
# GET ACTIVE INCIDENTS
# =========================================================

@router.get("")
def get_incidents():

    return incidents


# =========================================================
# GET COMPLETED INCIDENTS
# =========================================================

@router.get("/archive")
def get_completed_incidents():

    return completed_incidents


# =========================================================
# ALLOCATE RESOURCES TO INCIDENT
# =========================================================

@router.post("/{incident_id}/allocate")
def allocate_resources(
    incident_id: str,
    allocation: AllocationRequest
):

    incident = next(
        (
            item
            for item in incidents
            if item["id"] == incident_id
        ),
        None
    )

    if incident is None:

        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )


    ambulance = allocation.ambulance
    rescue = allocation.rescue
    fire = allocation.fire


    # Prevent negative allocation

    if ambulance < 0 or rescue < 0 or fire < 0:

        raise HTTPException(
            status_code=400,
            detail="Resource allocation cannot be negative"
        )


    # Check availability

    if ambulance > resources["ambulance"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough ambulances available"
        )


    if rescue > resources["rescue"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough rescue teams available"
        )


    if fire > resources["fire"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough fire teams available"
        )


    # Return previously allocated resources
    # before applying new allocation

    old = incident.get(
        "allocated",
        {
            "ambulance": 0,
            "rescue": 0,
            "fire": 0
        }
    )


    resources["ambulance"] += old["ambulance"]
    resources["rescue"] += old["rescue"]
    resources["fire"] += old["fire"]


    # Check again after returning old allocation

    if ambulance > resources["ambulance"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough ambulances available"
        )


    if rescue > resources["rescue"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough rescue teams available"
        )


    if fire > resources["fire"]:

        raise HTTPException(
            status_code=400,
            detail="Not enough fire teams available"
        )


    # Deduct newly allocated resources

    resources["ambulance"] -= ambulance
    resources["rescue"] -= rescue
    resources["fire"] -= fire


    incident["allocated"] = {

        "ambulance": ambulance,

        "rescue": rescue,

        "fire": fire
    }


    incident["status"] = "ALLOCATED"


    return {

        "message": "Resources allocated successfully",

        "incident": incident,

        "resources": resources
    }


# =========================================================
# MARK INCIDENT COMPLETE
# =========================================================

@router.post("/{incident_id}/complete")
def complete_incident(incident_id: str):

    incident = next(
        (
            item
            for item in incidents
            if item["id"] == incident_id
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
        {
            "ambulance": 0,
            "rescue": 0,
            "fire": 0
        }
    )


    # Return resources to available pool

    resources["ambulance"] += allocated["ambulance"]

    resources["rescue"] += allocated["rescue"]

    resources["fire"] += allocated["fire"]


    incident["status"] = "COMPLETED"


    # Move incident to archive

    completed_incidents.append(
        incident.copy()
    )


    incidents.remove(incident)


    return {

        "message": "Incident completed and archived",

        "incident": incident,

        "resources": resources
    }