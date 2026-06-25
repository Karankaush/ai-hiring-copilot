from langgraph.graph import StateGraph, START, END

from graph.state import HiringState
from graph.nodes.jd_analyzer import analyze_jd
from graph.nodes.resume_parser import parse_resume
from graph.nodes.skill_matcher import match_skills
from graph.nodes.evaluator import (evaluate_candidate)
from graph.nodes.critic import critique_candidate
from graph.nodes.judge import judge_candidate
from graph.nodes.ranking import rank_candidates
from utils.parallel import run_parallel




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


def critic_node(state: HiringState):

    def critique_resume(data):

        resume, evaluation = data

        critique = critique_candidate(
            state["jd_data"],
            resume,
            evaluation
        )

        return {
            "candidate": resume["name"],
            **critique
        }

    critique_data = list(
        zip(
            state["resumes"],
            state["evaluations"]
        )
    )

    critiques = run_parallel(
        critique_resume,
        critique_data
    )

    return {
        "critiques": critiques
    }


def evaluator_node(state : HiringState):
    def evaluate_resume(data):
        resume, match_result = data

        evaluation = evaluate_candidate(state["jd_data"], resume, match_result)

        final_score = round(
            (match_result["match_score"] * 0.7) + (evaluation["score"] * 0.3), 2
        )

        if final_score >= 85:
            recommendation = "Strong Hire"

        elif final_score >= 70:
            recommendation = "Hire"

        elif final_score >= 50:
            recommendation = "Consider"

        else:
            recommendation = "Reject"

        return {

            "candidate": resume["name"],

            "match_score":
            match_result["match_score"],

            "evaluator_score":
            evaluation["score"],

            "final_score":
            final_score,

            "recommendation":
            recommendation,

            "strengths":
            evaluation["strengths"],

            "reasoning":
            evaluation["reasoning"]
        }

    resume_data = list(zip(state["resumes"], state["matches"]))

    evaluations = run_parallel(evaluate_resume, resume_data)
    return{
        "evaluations" : evaluations
    }





    critiques = []

    for resume, evaluation in zip(
        state["resumes"],
        state["evaluations"]
    ):

        critique = critique_candidate(
            state["jd_data"],
            resume,
            evaluation
        )

        critiques.append(
            {
                "candidate": resume["name"],
                **critique
            }
        )

    return {
        "critiques": critiques
    }


    judgments = []

    for resume, evaluation, critique in zip(
        state["resumes"],
        state["evaluations"],
        state["critiques"]
    ):

        judgment = judge_candidate(
            state["jd_data"],
            resume,
            evaluation,
            critique
        )

        judgments.append(
            {
                "candidate": resume["name"],
                **judgment
            }
        )

    return {
        "judgments": judgments
    }


def judge_node(state: HiringState):

    def judge_resume(data):

        resume, evaluation, critique = data

        judgment = judge_candidate(
            state["jd_data"],
            resume,
            evaluation,
            critique
        )

        return {
            "candidate": resume["name"],
            **judgment
        }

    judgment_data = list(
        zip(
            state["resumes"],
            state["evaluations"],
            state["critiques"]
        )
    )

    judgments = run_parallel(
        judge_resume,
        judgment_data
    )

    return {
        "judgments": judgments
    }



def ranking_node(state: HiringState):

    rankings = rank_candidates(
        state["judgments"]
    )

    return {
        "rankings": rankings
    }



graph_builder = StateGraph(HiringState)

graph_builder.add_node("jd_analyzer", jd_node)
graph_builder.add_node("resume_parser", resume_node)
graph_builder.add_node("skill_matcher", skill_matcher_node)
graph_builder.add_node("evaluator",evaluator_node)
graph_builder.add_node("critic",critic_node)
graph_builder.add_node("judge",judge_node)
graph_builder.add_node("ranking",ranking_node)









graph_builder.add_edge(START, "jd_analyzer")
graph_builder.add_edge("jd_analyzer", "resume_parser")
graph_builder.add_edge("resume_parser", "skill_matcher")
graph_builder.add_edge("skill_matcher","evaluator")
graph_builder.add_edge("evaluator","critic")
graph_builder.add_edge("critic","judge")
graph_builder.add_edge("judge","ranking")
graph_builder.add_edge("ranking",END)


workflow = graph_builder.compile()

