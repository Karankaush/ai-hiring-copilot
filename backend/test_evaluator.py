from graph.nodes.evaluator import (
    evaluate_candidate
)

result = evaluate_candidate(
    {
        "role": "AI Engineer",
        "required_skills": [
            "Python",
            "LangChain",
            "Docker"
        ]
    },
    {
        "name": "Karan",
        "skills": [
            "Python",
            "LangChain",
            "Docker"
        ],
        "projects": [
            "AI Hiring Copilot",
            "RAG Chatbot"
        ]
    },
    {
        "match_score": 100
    }
)

print(result)