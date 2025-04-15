from fastapi import APIRouter, HTTPException, Query
from helpers.responses import failed, success
from repositories.sales_repository import SalesRepository
from services.sales_service import SalesService

sales_router = APIRouter()
respository = SalesRepository()
service = SalesService(respository)

@sales_router.get("/sales-reps", response_model=dict)
def get_sales_reps(
  search: str = Query(None, min_length=1, max_length=50),
  filter_by: str = Query(None, min_length=1, max_length=50),
  page: int = Query(1, ge=1),
  page_size: int = Query(10, le=100),
):
  try:
    data = service.pagination(
      search=search, 
      filter_by=filter_by, 
      page=page, 
      page_size=page_size
    )

    return success(data)
  except HTTPException as e:
    print(f"err ru {str(e)}")
    return failed(e.status_code, e.detail)
  except Exception as e:
    print(f"err ru {str(e)}")
    return failed()