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

    Review both perspectives carefully.

    Rules:

    1. Calculate a fair final score between 0 and 100.

    2. Recommendation MUST be exactly one of:

       - Strong Hire
       - Hire
       - Consider
       - Reject

    3. Use these guidelines:

       - 85+  → Strong Hire
       - 70-84 → Hire
       - 50-69 → Consider
       - Below 50 → Reject

    4. Keep recommendation short.
       Do NOT write explanations inside recommendation.

    5. Put all detailed explanation inside reasoning.

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