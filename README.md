UGC VLOG Generator V4 — AI Powered (Prompt Only)

Setup (computer / hosting server)


Install Python 3.10+ and run pip install -r requirements.txt.

Set OPENAI_API_KEY in your server environment. Never put it into HTML, JavaScript, GitHub, or public files. Use .env.example only as a reference; this app does not automatically load .env.

Optionally set APP_PASSWORD to restrict who can spend your API credits. Set this before exposing the server publicly.

Run waitress-serve --listen=127.0.0.1:5000 server:app.

Open http://127.0.0.1:5000 on the same computer.


Example on macOS/Linux:


export OPENAI_API_KEY='your_key_here'
export APP_PASSWORD='your_private_password_here'
waitress-serve --listen=127.0.0.1:5000 server:app

On Windows PowerShell:


$env:OPENAI_API_KEY='your_key_here'
$env:APP_PASSWORD='your_private_password_here'
waitress-serve --listen=127.0.0.1:5000 server:app

For Android access, deploy to a Python-capable HTTPS host with environment secrets; use a proper user login, rate limits, monitoring and budget caps for any publicly accessible deployment. Do not upload only index.html to GitHub Pages or Netlify static hosting and expect AI calls to work: the Python backend must be running. Configure reverse proxy TLS and authentication. The included password is basic protection, not a production-grade account system.


Behavior


Original V3 template buttons remain available.

New 'Generate with OpenAI' uses your existing controls and optional character/outfit/product photos.

Photos are compressed in the browser and sent to your backend, then to OpenAI for analysis; they are not saved to disk by this app. OpenAI processes inputs according to its API data policies.

Output is text prompts only, not rendered images/videos. Google Flow remains separate.

Default model gpt-4.1-mini can be changed via OPENAI_MODEL if your account supports a suitable vision-capable model.

A simple in-memory 20-requests/hour per-IP limiter is included. This resets on restart and is not sufficient for public deployments.

API use incurs OpenAI API charges. This sample was syntax-checked but not live-tested against your account.


