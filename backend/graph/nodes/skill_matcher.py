def match_skills(
    jd_skills: list[str],
    resume_skills: list[str]
):

    matched_skills = []
    missing_skills = []

    for jd_skill in jd_skills:

        found = False

        for resume_skill in resume_skills:

            if (
                jd_skill.lower().strip()
                ==
                resume_skill.lower().strip()
            ):

                found = True
                break

        if found:

            matched_skills.append(
                jd_skill
            )

        else:

            missing_skills.append(
                jd_skill
            )

    match_score = round(
        (
            len(matched_skills)
            /
            len(jd_skills)
        ) * 100,
        2
    )

    return {
        "match_score": match_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }


























# from sklearn.metrics.pairwise import cosine_similarity

# from services.embeddings import get_embedding


# def calculate_similarity(
#     skill_a: str,
#     skill_b: str
# ):

#     try:

#         emb_a = get_embedding(skill_a)
#         emb_b = get_embedding(skill_b)

#         score = cosine_similarity(
#             [emb_a],
#             [emb_b]
#         )[0][0]

#         return float(score)

#     except Exception as e:

#         print(
#             f"Similarity Error: {str(e)}"
#         )

#         return 0.0


# def match_skills(
#     jd_skills: list[str],
#     resume_skills: list[str]
# ):

#     # Prevent crash if JD contains no skills

#     if not jd_skills:

#         return {
#             "match_score": 0,
#             "matched_skills": [],
#             "missing_skills": [],
#             "error": (
#                 "No skills found in Job Description"
#             )
#         }

#     matched_skills = []
#     missing_skills = []

#     matched_count = 0

#     for jd_skill in jd_skills:

#         best_score = 0

#         for resume_skill in resume_skills:

#             # Exact Match

#             if (
#                 jd_skill.lower().strip()
#                 ==
#                 resume_skill.lower().strip()
#             ):

#                 best_score = 1.0
#                 break

#             try:

#                 score = calculate_similarity(
#                     jd_skill,
#                     resume_skill
#                 )

#                 if score > best_score:
#                     best_score = score

#             except Exception as e:

#                 print(
#                     f"Matching Error: {str(e)}"
#                 )

#         if best_score >= 0.70:

#             matched_skills.append(
#                 jd_skill
#             )

#             matched_count += 1

#         else:

#             missing_skills.append(
#                 jd_skill
#             )

#     match_score = round(
#         (
#             matched_count /
#             len(jd_skills)
#         ) * 100,
#         2
#     )

#     return {
#         "match_score": match_score,
#         "matched_skills": matched_skills,
#         "missing_skills": missing_skills
#     }