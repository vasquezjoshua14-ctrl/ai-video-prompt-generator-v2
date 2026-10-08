HYUNA AI generator upgrade

Copy app/page.tsx, app/api/generate/route.ts, and prompts/hyuna-master.txt into the ROOT of your existing Next.js repository. Keep the folder paths exactly as shown.


Install the OpenAI package (npm install openai) if it is not already installed. Configure OPENAI_API_KEY as a SERVER environment variable in your hosting provider (e.g. Vercel Settings > Environment Variables), not in client code. Redeploy.


The 23-page master prompt is stored as a text file and read by the server at runtime. Do not put it in public/ or in page.tsx.


Product images are sent to the AI API; users should upload only images they are authorized to process. Images are limited to 3 JPG/PNG/WebP files of 4 MB each. API usage incurs provider charges. Outputs are prompts, not actual generated videos. Product consistency is an instruction, not a technical guarantee.


The interface offers an IMAGE PROMPT and a VIDEO PROMPT with 10-second parts. Custom instructions and uploaded images are passed to the backend. Dialogue is off by default; the PDF's default language is English.

# ai-video-prompt-generator-v2
