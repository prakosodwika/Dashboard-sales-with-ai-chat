from repositories.sales_repository import SalesRepository
from fastapi import APIRouter, HTTPException, Query
from services.sales_service import SalesService
from helpers.responses import failed, success
from third_parties.gemini import GeminiAI
from dto import Question

sales_router = APIRouter()
respository = SalesRepository()
ai = GeminiAI()
service = SalesService(respository, ai)

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
  
@sales_router.post("/ai", response_model=dict)
def ai_question(body: Question):
  try:
    question = body.question.strip()

    if len(question) < 5 or not any(char.isalpha() for char in question):
      return success("Could you please rephrase your question?")

    data = service.ai_question(question)
    return success(data)
  except HTTPException as e:
    print(f"err ru {str(e)}")
    return failed(e.status_code, e.detail)
  except Exception as e:
    print(f"err ru {str(e)}")
    return failed()