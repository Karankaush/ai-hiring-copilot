from langchain_core.prompts import ChatPromptTemplate
from services.llm import get_llm
from schemas.resume_schema import Resume

def parse_resume(resume_text : str):
    llm = get_llm()
   


    structured_llm = llm.with_structured_output(Resume)
    prompt = ChatPromptTemplate.from_template(
        """
        You are an expert resume parser.

        Extract:

        - Candidate Name
        - Skills
        - Projects

        Resume:

        {resume_text}
        """
    )

    chain = prompt | structured_llm

    result = chain.invoke(
        {
        "resume_text" : resume_text
        }
    )
    return result
