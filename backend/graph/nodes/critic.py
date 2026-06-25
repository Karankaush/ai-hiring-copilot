import json

from langchain_core.prompts import ChatPromptTemplate

from services.llm import get_llm


def critique_candidate(
    jd_data,
    resume,
    evaluation
):

    llm = get_llm()

    prompt = ChatPromptTemplate.from_template(
    """
    You are a senior hiring manager.

    Job Description:
    {jd_data}

    Resume:
    {resume}

    Evaluation:
    {evaluation}

    Critically analyze the candidate ONLY with respect to the given Job Description.

    Your goal is to identify realistic hiring risks based on what the employer is looking for.

    Consider:

    - Missing required skills mentioned in the Job Description.
    - Missing experience required for this specific role.
    - Weaknesses that directly affect success in this job.
    - Missing certifications, tools, domain knowledge, or qualifications ONLY IF they are relevant to the Job Description.
    - Potential hiring risks supported by the resume.

    IMPORTANT RULES:

    - Do NOT assume this is a software engineering role.
    - Do NOT mention cloud, DevOps, production systems, scalability, Docker, Kubernetes, CI/CD, AWS, Azure, or similar technologies unless they are explicitly required or strongly implied by the Job Description.
    - Do NOT invent missing skills that are not part of the Job Description.
    - Keep your criticism role-specific and evidence-based.
    - If the candidate is a strong match, return only minor concerns.

    Return ONLY valid JSON.

    {{
        "adjusted_score": 0,
        "concerns": [],
        "reasoning": ""
    }}
    """
    )

    chain = prompt | llm

    response = chain.invoke(
        {
            "jd_data": jd_data,
            "resume": resume,
            "evaluation": evaluation
        }
    )

    content = response.content.strip()

    content = content.replace(
        "```json",
        ""
    )

    content = content.replace(
        "```",
        ""
    )

    return json.loads(
        content.strip()
    )