import urllib.request
import json
import time

print("Starting build monitoring...")
for i in range(12):
    time.sleep(10)
    req = urllib.request.Request('https://api.github.com/repos/rittickd23-alt/AmpEdge-web/actions/runs?per_page=1', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        res = urllib.request.urlopen(req)
        data = json.loads(res.read().decode('utf-8'))
        if 'workflow_runs' in data and len(data['workflow_runs']) > 0:
            run = data['workflow_runs'][0]
            status = run.get('status')
            conclusion = run.get('conclusion')
            print(f"Poll {i+1}: Run ID {run.get('id')} is {status} ({conclusion})")
            if status == 'completed':
                if conclusion == 'success':
                    print("Deployment succeeded!")
                    break
                else:
                    print("Deployment failed.")
                    break
    except Exception as e:
        print("Error fetching status:", e)
