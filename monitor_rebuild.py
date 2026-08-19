import urllib.request
import json
import time

print("Waiting for Pages build to trigger...")
for i in range(12):
    time.sleep(10)
    req = urllib.request.Request('https://api.github.com/repos/rittickd23-alt/AmpEdge-web/actions/runs?per_page=3', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        res = urllib.request.urlopen(req)
        data = json.loads(res.read().decode('utf-8'))
        runs = data.get('workflow_runs', [])
        if len(runs) > 0:
            latest_run = runs[0]
            run_id = latest_run.get('id')
            status = latest_run.get('status')
            conclusion = latest_run.get('conclusion')
            name = latest_run.get('name')
            print(f"Poll {i+1}: Run ID {run_id} ({name}) is {status} ({conclusion})")
            if run_id != 28644243034:
                if status == 'completed':
                    print(f"Build completed with conclusion: {conclusion}")
                    break
    except Exception as e:
        print("Error checking status:", e)
