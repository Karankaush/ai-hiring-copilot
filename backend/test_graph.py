from graph.workflow import workflow

result = workflow.invoke(
    {
        "jd_text": """
        Looking for AI Engineer with
        Python,
        LangChain,
        FastAPI
        """,

        "resume_texts": [
            """
            Karan

            Skills:
            Python
            LangChain
            Docker

            Projects:
            AI Hiring Copilot
            """
        ]
    }
)

print(result)