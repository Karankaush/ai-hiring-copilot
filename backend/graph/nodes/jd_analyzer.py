import json

from langchain_core.prompts import ChatPromptTemplate

from services.llm import get_llm
from schemas.jd_schema import JobDescription


def analyze_jd(jd_text: str):

    llm = get_llm()

    prompt = ChatPromptTemplate.from_template(
        """
        You are an expert recruiter.

        Analyze the following job description.

        Extract:

        - Role
        - Required Skills
        - Preferred Skills
        - Experience Requirements

        Return ONLY valid JSON.

        {{
            "role": "",
            "required_skills": [],
            "preferred_skills": [],
            "experience": ""
        }}

        Job Description:

        {jd_text}
        """
    )

    chain = prompt | llm

    response = chain.invoke(
        {
            "jd_text": jd_text
        }
    )

    content = response.content.strip()

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    data = json.loads(content)

    return JobDescription(**data)


























# from langchain_core.prompts import ChatPromptTemplate

# from services.llm import get_llm
# from schemas.jd_schema import JobDescription


# def analyze_jd(jd_text : str):

#     llm = get_llm()

#     structured_llm = llm.with_structured_output(JobDescription)
#     prompt = ChatPromptTemplate.from_template(
#         """
#         You are an expert recruiter.

#         Analyze the following job description.

#         Extract:

#         - Role
#         - Required Skills
#         - Preferred Skills
#         - Experience Requirements

#         Job Description:

#         {jd_text}
#         """
#     )

#     chain = prompt | structured_llm

#     return chain.invoke({
#         "jd_text": jd_text
#     })
