# FastAPI

## Features

- FastAPI for backend API
- Auto-reload during development
- Uses `.env` file for configuration
- Modular structure (router, config, repository)
- Dummy data loaded from a JSON file

## Project Structure

```
├── config/              
│   └── __init__.py
├── enum/                
│   └── __init__.py
├── helpers/             
│   └── __init__.py
├── middlewares/         
│   └── __init__.py
├── models/              
│   └── __init__.py
├── repositories/        
├── routers/             
├── services/            
├── main.py              
├── .env.example         
├── dummyData.json       
├── requirements.txt     
```

## Setup Instructions

1. **Create and activate the virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate      # Linux/Mac
    venv\Scripts\activate         # Windows

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt

3. **Copy file environment file**:
    ```bash
    cp .env.example .env

4. **Obtain the API Key**:
    - Go to: https://makersuite.google.com/app

    - Log in with your Google account.

    - Get your API key from: https://aistudio.google.com/app/apikey

5. **Run the FastAPI server**:
    ```bash
    uvicorn main:app --reload
    
    #or

    python main.py