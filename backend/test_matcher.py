from graph.nodes.skill_matcher import (
    match_skills
)

result = match_skills(
    [
        "Python",
        "LangChain",
        "FastAPI",
        "Docker"
    ],
    [
        "Python",
        "LangChain",
        "Docker"
    ]
)

print(result)