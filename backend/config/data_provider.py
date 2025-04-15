import json
import os
from pathlib import Path
from typing import Dict
from fastapi import HTTPException


class DataProvider:
  def __init__(self, data_path: str):
    self.data_path = Path(data_path)

  def load_data(self) -> Dict:
    try:
      if not os.path.exists(self.data_path):
        raise HTTPException(500, detail=f"Data file not found at {self.data_path}")

      with open(self.data_path, "r") as f:
        return json.load(f)
    except HTTPException as e:
      print(f"err d: {str(e)}")
      raise HTTPException(500, detail="Failed to decode JSON data. Please check the file format.")
    except Exception as e:
      print(f"err d: {str(e)}")
      raise Exception("Internal server error")
