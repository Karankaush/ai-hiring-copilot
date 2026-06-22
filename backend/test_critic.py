from graph.nodes.critic import (
    critique_candidate
)

result = critique_candidate(
    {
        "role": "AI Engineer"
    },
    {
        "name": "Karan",
        "skills": [
            "Python",
            "LangChain",
            "Docker"
        ]
    },
    {
        "score": 90,
        "strengths": [
            "Strong AI Projects"
        ]
    }
)

print(result)