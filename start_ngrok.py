from pyngrok import ngrok
import time
import sys

# Conectar al puerto 8000
url = ngrok.connect(8000).public_url

# Escribir la URL a un archivo para que Antigravity la lea
with open("ngrok_url.txt", "w") as f:
    f.write(url)

print(f"URL: {url}")
sys.stdout.flush()

try:
    # Mantener el proceso vivo para que el túnel no se caiga
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    ngrok.kill()
