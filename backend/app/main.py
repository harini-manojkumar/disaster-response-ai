from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()


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