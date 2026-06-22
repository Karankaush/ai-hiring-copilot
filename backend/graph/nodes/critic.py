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
        You are a strict senior hiring manager.

        Job Description:
        {jd_data}

        Resume:
        {resume}

        Evaluation:
        {evaluation}

        Critically analyze the candidate.

        Focus on:

        - missing skills
        - risks
        - weaknesses
        - lack of production experience
        - lack of cloud/devops knowledge

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