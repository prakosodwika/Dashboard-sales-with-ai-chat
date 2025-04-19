from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import JSONResponse
from fastapi import Request
from helpers import failed

async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code > 200:
        return failed(exc.status_code)
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail},
    )

def setup_exception_handlers(app):
    app.add_exception_handler(StarletteHTTPException, custom_http_exception_handler)
