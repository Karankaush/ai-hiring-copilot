from graph.nodes.skill_matcher import calculate_similarity

pairs = [
    ("Python", "Python"),
    ("LangChain", "LangChain"),
    ("Docker", "Docker"),
    ("FastAPI", "Python"),
    ("LangChain", "RAG"),
    ("LangGraph", "Agentic AI"),
]

for a, b in pairs:
    score = calculate_similarity(a, b)
    print(f"{a} <-> {b} = {score}")