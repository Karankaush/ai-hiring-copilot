from pydantic import BaseModel, Field

class Resume(BaseModel):
    name: str = ""
    skills: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)