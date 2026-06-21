from langgraph.graph import StateGraph, START, END

from graph.state import HiringState
from graph.nodes.jd_analyzer import analyze_jd
from graph.nodes.resume_parser import parse_resume
from graph.nodes.skill_matcher import match_skills






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

        parsed_resumes.append(result.model_dump())

    return {
        "resumes" : parsed_resumes
    }



def skill_matcher_node(state: HiringState):

    jd_skills = state["jd_data"]["required_skills"]

    matches = []

    for resume in state["resumes"]:

        result = match_skills(
            jd_skills,
            resume["skills"]
        )

        matches.append(
            {
                "candidate": resume["name"],
                **result
            }
        )

    return {
        "matches": matches
    }





graph_builder = StateGraph(HiringState)

graph_builder.add_node("jd_analyzer", jd_node)
graph_builder.add_node("resume_parser", resume_node)
graph_builder.add_node("skill_matcher", skill_matcher_node)


graph_builder.add_edge(START, "jd_analyzer")
graph_builder.add_edge("jd_analyzer", "resume_parser")
graph_builder.add_edge("resume_parser", "skill_matcher")
graph_builder.add_edge("skill_matcher", END)

workflow = graph_builder.compile()

