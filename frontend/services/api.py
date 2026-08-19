import requests


BACKEND_URL = "http://127.0.0.1:8000"


def get_incidents():
    try:
        response = requests.get(
            f"{BACKEND_URL}/api/incidents",
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print("Backend error:", e)
        return None


def submit_incident(incident):
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/reports",
            json=incident,
            timeout=10
        )

        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print("Backend error:", e)
        return None


def get_resources():
    try:
        response = requests.get(
            f"{BACKEND_URL}/api/resources",
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print("Resource API error:", e)
        return None


def update_resources(
    ambulance,
    rescue,
    fire
):
    try:
        response = requests.put(
            f"{BACKEND_URL}/api/resources",
            json={
                "ambulance": ambulance,
                "rescue": rescue,
                "fire": fire
            },
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print("Resource update error:", e)
        return None


def allocate_resources(
    incident_id,
    ambulance,
    rescue,
    fire
):
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/incidents/{incident_id}/allocate",
            json={
                "ambulance": ambulance,
                "rescue": rescue,
                "fire": fire
            },
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print("Allocation error:", e)
        return None


def complete_incident(incident_id):
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/incidents/{incident_id}/complete",
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print("Completion error:", e)
        return None


def get_archive():
    try:
        response = requests.get(
            f"{BACKEND_URL}/api/incidents/archive",
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print("Archive error:", e)
        return None