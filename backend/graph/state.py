from typing import TypedDict

class HiringState(TypedDict):
    jd_text : str
    resume_texts : list[str]
    jd_data : dict
    resumes : list[dict]
    matches: list[dict]
    evaluations: list[dict]
    critiques: list[dict]
    judgments: list[dict]