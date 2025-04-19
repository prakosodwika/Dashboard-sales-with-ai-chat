from repositories.sales_repository import SalesRepository
from fastapi import HTTPException
from third_parties.gemini import GeminiAI

class SalesService: 
  def __init__(
      self, 
      repository: SalesRepository,
      ai: GeminiAI
    ):
    self.repository = repository
    self.ai = ai

  def pagination(
      self,
      search: str = None,
      filter_by: str = None,
      page: int = 1,
      page_size: int = 10
  ) -> dict:
    try:
      data = self.repository.pagination(
        search=search, 
        filter_by=filter_by, 
        page=page, 
        page_size=page_size
      )

      return data
    except HTTPException as e:
      raise e
    except Exception as e:
      print(f"err s: {str(e)}")
      raise Exception("Internal Server Error")
    
  def ai_question(self, question: str) -> dict:
    try:
      data = self.repository.get_all()
      context = f"""
      Below is the information about the sales representatives:
      {data}

      Please answer the following question:
      {question}
      """
      result = self.ai.ask(context)
      return result
    except HTTPException as e:
      raise e
    except Exception as e:
      print(f"err s: {str(e)}")
      raise Exception("Internal Server Error")