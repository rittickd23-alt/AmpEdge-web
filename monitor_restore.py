import urllib.request
import time

for i in range(12):
    time.sleep(15)
    try:
        res = urllib.request.urlopen('https://rittickd23-alt.github.io/AmpEdge-web/index.html')
        print(f"Poll {i+1}: Succeeded! Length: {len(res.read())}")
        break
    except Exception as e:
        print(f"Poll {i+1}: {e}")
