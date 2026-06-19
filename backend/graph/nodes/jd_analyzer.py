from langchain_core.prompts import ChatPromptTemplate

from services.llm import get_llm
from schemas.jd_schema import JobDescription


def analyze_jd(jd_text : str):

    llm = get_llm()

    structured_llm = llm.with_structured_output(JobDescription)
    prompt = ChatPromptTemplate.from_template(
        """
        You are an expert recruiter.

        Analyze the following job description.

        Extract:

        - Role
        - Required Skills
        - Preferred Skills
        - Experience Requirements

        Job Description:

        {jd_text}
        """
    )

    chain = prompt | structured_llm

    return chain.invoke({
        "jd_text": jd_text
    })
