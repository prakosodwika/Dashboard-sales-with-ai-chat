from routers.sales_router import sales_router
from helpers import setup_exception_handlers
from middlewares.cors import setup_cors
from fastapi import FastAPI
from dotenv import load_dotenv
import uvicorn
import json
import os 

app = FastAPI()

load_dotenv()
setup_cors(app)
setup_exception_handlers(app)

app.include_router(sales_router, prefix="/api")

# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@app.get("/api/data")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host= "0.0.0.0", 
        port= int(os.getenv("PORT", 8000)), 
        reload= True
    )
