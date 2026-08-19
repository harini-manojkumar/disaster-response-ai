from fastapi import FastAPI

from backend.app.routes.incidents import router as incidents_router
from backend.app.routes.reports import router as reports_router
from backend.app.routes.resources import router as resources_router


app = FastAPI(
    title="Disaster Response AI",
    description="AI-powered disaster response backend",
    version="1.0.0"
)


@app.get("/")
def root():

    return {
        "message": "Disaster Response AI Backend",
        "status": "online"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


app.include_router(
    incidents_router
)

app.include_router(
    reports_router
)

app.include_router(
    resources_router
)