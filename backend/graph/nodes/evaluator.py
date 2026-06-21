import json

from langchain_core.prompts import ChatPromptTemplate

from services.llm import get_llm


def evaluate_candidate(jd_data,resume, match_result):

    llm = get_llm()

    prompt = ChatPromptTemplate.from_template(
        """
        You are a senior AI recruiter.

        Job Description:
        {jd_data}

        Resume:
        {resume}

        Match Result:
        {match_result}

        Evaluate the candidate.

        Return ONLY valid JSON.

        {{
            "score": 0,
            "strengths": [
                "strength 1",
                "strength 2"
            ],
            "reasoning": "short explanation"
        }}
        """
    )

    chain = prompt | llm

    response = chain.invoke(
        {
            "jd_data": jd_data,
            "resume": resume,
            "match_result": match_result
        }
    )

    content = response.content.strip()

    # remove markdown fences if model returns them
    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)