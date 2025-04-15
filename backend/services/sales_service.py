from fastapi import Depends, HTTPException
from repositories.sales_repository import SalesRepository

class SalesService: 
  def __init__(self, repository: SalesRepository):
    self.repository = repository

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