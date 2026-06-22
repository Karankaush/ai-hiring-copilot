from graph.nodes.judge import (
    judge_candidate
)

result = judge_candidate(
    {
        "role": "AI Engineer"
    },
    {
        "name": "Karan"
    },
    {
        "score": 67,
        "strengths": [
            "Python",
            "LangChain"
        ]
    },
    {
        "adjusted_score": 45,
        "concerns": [
            "Missing FastAPI"
        ]
    }
)

print(result)