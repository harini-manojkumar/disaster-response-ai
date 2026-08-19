from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from backend.app.routes.gis import router as gis_router
from backend.app.routes.reports import router as reports_router

app = FastAPI()
app.include_router(gis_router)
app.include_router(reports_router)

@app.get("/")
def root():
    return {"message": "Disaster Response API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    print("WebSocket client connected")

    try:
        while True:
            message = await websocket.receive_text()

            print("Received:", message)

            await websocket.send_json({
                "type": "TEST",
                "message": message
            })

    except WebSocketDisconnect:
        print("WebSocket client disconnected")