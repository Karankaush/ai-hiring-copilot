def rank_candidates(judgments):

    sorted_candidates = sorted(
        judgments,
        key=lambda x: x["final_score"],
        reverse=True
    )

    rankings = []

    for idx, candidate in enumerate(
        sorted_candidates,
        start=1
    ):

        rankings.append(
            {
                "rank": idx,
                "candidate": candidate["candidate"],
                "score": candidate["final_score"],
                "recommendation": candidate["recommendation"]
            }
        )

    return rankings