import json

from langchain_core.prompts import ChatPromptTemplate

from services.llm import get_llm
def judge_candidate(
    jd_data,
    resume,
    evaluation,
    critique
):

    llm = get_llm()

    prompt = ChatPromptTemplate.from_template(
        """
        You are the final hiring decision maker.

        Job Description:
        {jd_data}

        Resume:
        {resume}

        Evaluator Opinion:
        {evaluation}

        Critic Opinion:
        {critique}

        Review both perspectives.

        Return ONLY valid JSON.

        {{
            "final_score": 0,
            "recommendation": "",
            "reasoning": ""
        }}
        """
    )

    chain = prompt | llm

    response = chain.invoke(
        {
            "jd_data": jd_data,
            "resume": resume,
            "evaluation": evaluation,
            "critique": critique
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