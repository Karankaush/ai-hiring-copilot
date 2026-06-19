from langgraph.graph import StateGraph, START, END

from graph.state import HiringState
from graph.nodes.jd_analyzer import analyze_jd
from graph.nodes.resume_parser import parse_resume

def jd_node(state : HiringState):
    jd_text = state['jd_text']
    jd_data = analyze_jd(jd_text)

    return{
        "jd_data" : jd_data.model_dump()
    }


def resume_node(state : HiringState):
    parsed_resumes = []

    for resume_text in state['resume_texts']:

        result = parse_resume(resume_text)

        parsed_resumes.append(result.model_dump)

    return {
        "resumes" : parsed_resumes
    }



graph_builder = StateGraph(HiringState)

graph_builder.add_node("jd_analyzer", jd_node)
graph_builder.add_node("resume_parser", resume_node)

graph_builder.add_edge(START, "jd_analyzer")
graph_builder.add_edge("jd_analyzer", "resume_parser")
graph_builder.add_edge("resume_parser", END)

workflow = graph_builder.compile()