from concurrent.futures import ThreadPoolExecutor

def run_parallel(function, items, max_workers = None):

    if max_workers is None:
        max_workers = min(len(items), 10)

    with ThreadPoolExecutor(max_workers=max_workers) as executer:
        results = list(executer.map(function, items))

        return results