from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()

class GeminiAI:
  def __init__(self, api_key: str = None, model_name: str = "gemini-2.0-flash"):
    try:
      self.api_key = api_key or os.getenv("GEMINI_API_KEY")
      if not self.api_key:
        raise ValueError("API key is required")

      genai.configure(api_key=self.api_key)
      self.model = genai.GenerativeModel(model_name)
    except Exception as e:
      print(f"err GeminiAI: {str(e)}")
      raise Exception("Failed to configure Gemini AI")

  def ask(self, question: str) -> dict:
    try:
      response = self.model.generate_content(question)
      return response.text
    except Exception as e:
      print(f"err AI: {str(e)}")
      raise Exception("Internal Server Error")