from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def home():
    return{
        'message' : 'welcome to home page. AI Hiring Copilot Backend Running'
    }