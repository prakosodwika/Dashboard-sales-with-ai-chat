from config.data_provider import DataProvider
from fastapi import HTTPException
from dotenv import load_dotenv
from models import Sales
import math
import os

load_dotenv()

app_url = os.getenv("APP_URL")
port = os.getenv("PORT")

class SalesRepository:
  def __init__(
      self, 
      data_path: str = "dummyData.json", 
    ):
    self.data_provider = DataProvider(data_path)
    try:
      self.data = self.data_provider.load_data()
    except HTTPException as e:
      raise e

  def pagination(
      self,
      search: str = None,
      filter_by: str = None,
      page: int = 1,
      page_size: int = 10
  ) -> dict:
    if 'salesReps' not in self.data:
      raise HTTPException(404, detail="'salesReps' data not found")
    
    try:
      sales_reps = self.data['salesReps']
      total = len(sales_reps)

      if filter_by:
        sales_reps = [rep for rep in sales_reps if filter_by.lower() in rep['region'].lower() or filter_by.lower() in rep['role'].lower()]
      
      if search:
        sales_reps = [rep for rep in sales_reps if search.lower() in rep['name'].lower()]

      start = (page - 1) * page_size
      end = start + page_size
      current = page
      last_page = math.ceil(total / page_size)
      from_item = start + 1 if total > 0 else 0
      to_item = min(end, total)
      data = [Sales(**rep).model_dump() for rep in sales_reps[start:end]]

      api_endpoint = f"{app_url}:{port}/api/sales-reps" 

      return {
        "current_page": current,
        "last_page": last_page,
        "data": data,
        "next_page_url": f"{api_endpoint}?per_page={page_size}&page={current + 1}" if current < last_page else None,
        "path": api_endpoint,
        "prev_page_url": f"{api_endpoint}?per_page={page_size}&page={current - 1}" if current > 1 else None,
        "from": from_item,
        "to": to_item,
        "per_page": page_size,
        "total": total
      }

    except KeyError as e:
      print(f"err re: {str(e)}")
      raise HTTPException(500, detail=f"Missing expected key in sales data: {str(e)}")
    except Exception as e:
      print(f"err re: {str(e)}")
      raise Exception("Internal server error")
    
  def get_all(self) -> list:
    if 'salesReps' not in self.data:
      raise HTTPException(404, detail="'salesReps' data not found")
    
    try:
      sales_reps = self.data['salesReps']
      return [Sales(**rep).model_dump() for rep in sales_reps]
    except KeyError as e:
      print(f"err re: {str(e)}")
      raise HTTPException(500, detail=f"Missing expected key in sales data: {str(e)}")
    except Exception as e:
      print(f"err re: {str(e)}")
      raise Exception("Internal server error")