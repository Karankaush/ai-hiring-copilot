from pydantic import BaseModel
from typing import List


class CriticResult(BaseModel):

    adjusted_score: int

    concerns: List[str]

    reasoning: str