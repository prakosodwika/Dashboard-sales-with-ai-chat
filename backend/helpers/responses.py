from typing import Any
from fastapi.responses import JSONResponse

_STATUS_TEXTS = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
}

def success(data:Any = None, code=200, message=None):
  if hasattr(data, "dict"):
    data = data.dict()
  elif isinstance(data, list) and all(hasattr(item, "dict") for item in data):
    data = [item.dict() for item in data]

  return JSONResponse(
    content={
      'status': 'success',
      'code': code,
      'message': message or _STATUS_TEXTS.get(code, "Success"),
      'data': data
    }, 
    status_code=code
  )

def failed(code=500, message=None):
  message = "Internal Server Error" if code == 500 else message or _STATUS_TEXTS.get(code, "Error")
  return JSONResponse(
    content={
      'status': 'failed',
      'code': code,
      'message': message
    }, 
    status_code=code
  )