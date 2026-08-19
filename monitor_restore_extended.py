import urllib.request
import time

print("Extended monitoring of live index.html...")
for i in range(20):
    time.sleep(15)
    try:
        res = urllib.request.urlopen('https://rittickd23-alt.github.io/AmpEdge-web/index.html')
        code = res.getcode()
        length = len(res.read())
        print(f"Poll {i+1}: Success! Code: {code}, Length: {length}")
        if code == 200:
            break
    except Exception as e:
        print(f"Poll {i+1}: Failed ({e})")
