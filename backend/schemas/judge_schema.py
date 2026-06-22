from pydantic import BaseModel


class JudgeResult(BaseModel):

    final_score: int

    recommendation: str

    reasoning: str