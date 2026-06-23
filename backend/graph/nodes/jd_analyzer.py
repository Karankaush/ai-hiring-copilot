import json

from langchain_core.prompts import ChatPromptTemplate

from services.llm import get_llm
from schemas.jd_schema import JobDescription


def analyze_jd(jd_text: str):

    # Validate empty JD

    if not jd_text.strip():

        raise ValueError(
            "Job Description cannot be empty"
        )

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

    try:

        response = chain.invoke(
            {
                "jd_text": jd_text
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

        content = content.strip()

        data = json.loads(content)

        jd_data = JobDescription(
            **data
        )

        # Validate extracted skills

        if (
            len(
                jd_data.required_skills
            ) == 0
        ):

            raise ValueError(
                "No required skills found in Job Description"
            )

        return jd_data

    except json.JSONDecodeError:

        raise ValueError(
            "LLM returned invalid JSON for JD analysis"
        )

    except Exception as e:

        raise ValueError(
            f"JD Analysis Failed: {str(e)}"
        )