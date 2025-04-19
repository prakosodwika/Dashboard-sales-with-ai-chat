from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app_url_frontend = os.getenv("APP_URL")

def setup_cors(app):
  origins = [
    app_url_frontend,
  ]

  app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
  )