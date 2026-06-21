from pydantic import BaseModel
from typing import List

class EvaluatorResult(BaseModel):
    score : int
    strengths : List[str]
    reasoning : str