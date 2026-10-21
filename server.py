import os, json, time, secrets, urllib.request, urllib.error
from collections import defaultdict
from flask import Flask, request, jsonify, send_from_directory
app=Flask(__name__,static_folder='.')
app.config['MAX_CONTENT_LENGTH']=13*1024*1024
hits=defaultdict(list)
SYSTEM='''You are UGC VLOG V4, a professional Filipino UGC director and Google Flow prompt engineer. Inspect the provided photos carefully and describe only visible details; never invent product specifications, health benefits or claims. Maintain strict character identity, hairstyle, wardrobe, product geometry, logos, compartments and handles, and kitchen/environment continuity. Produce exactly duration/10 clips (duration is 10,20,30 seconds). Each clip exactly 10 seconds, 4-5 feasible shots, max 3 camera angles. Each clip must have an IMAGE PROMPT and a VIDEO PROMPT in concise slash header then Visual, Action, Camera, Dialogue, Audio format. Natural Filipino Metro Manila Taglish 70/30, max 25 spoken words per clip; if dialogue mode no dialogue, use none. No text overlays unless explicitly requested. Image-first workflow: prompts are supplied, but the user should approve each generated image before using its video prompt. All production directions English, spoken dialogue Taglish. For cooking, show believable safe kitchen actions, do not depict touching hot pans or lifting a pan with boiling contents. End final clip with 'checkout mo na' when dialogue is enabled. Return clear readable plain text with headings 'CLIP 1', 'IMAGE PROMPT', 'VIDEO PROMPT', etc. Avoid saying that reference details are guaranteed to survive generation.'''
@app.get('/')
def home(): return send_from_directory('.', 'index.html')
@app.get('/health')
def health(): return jsonify(ok=True,configured=bool(os.getenv('OPENAI_API_KEY')))
@app.post('/api/generate')
def generate():
    password=os.getenv('APP_PASSWORD')
    if password and not secrets.compare_digest(request.headers.get('X-App-Password',''),password):return jsonify(error='Incorrect app password'),401
    ip=request.remote_addr or 'local'; now=time.monotonic(); hits[ip]=[t for t in hits[ip] if now-t<3600]
    if len(hits[ip])>=20:return jsonify(error='Hourly limit reached. Try later.'),429
    hits[ip].append(now)
    key=os.getenv('OPENAI_API_KEY')
    if not key:return jsonify(error='Set OPENAI_API_KEY in server environment.'),503
    body=request.get_json(silent=True) or {}; settings=body.get('settings',{}); images=body.get('images',{})
    if not isinstance(settings,dict) or not isinstance(images,dict):return jsonify(error='Invalid request'),400
    duration=int(settings.get('duration',10)) if str(settings.get('duration',10)) in ('10','20','30') else 10
    settings['duration']=duration
    content=[{'type':'input_text','text':'Generate tailored prompts for these settings: '+json.dumps(settings,ensure_ascii=False)[:9000]}]
    for label in ('character','outfit','product'):
        url=images.get(label)
        if url:
            if not isinstance(url,str) or len(url)>5500000 or not url.startswith(('data:image/jpeg;base64,','data:image/png;base64,','data:image/webp;base64,')):return jsonify(error='Invalid image: '+label),400
            content.extend([{'type':'input_text','text':'REFERENCE PHOTO: '+label},{'type':'input_image','image_url':url,'detail':'high'}])
    payload={'model':os.getenv('OPENAI_MODEL','gpt-4.1-mini'),'instructions':SYSTEM,'input':[{'role':'user','content':content}],'max_output_tokens':3500,'store':False}
    req=urllib.request.Request('https://api.openai.com/v1/responses',data=json.dumps(payload).encode(),headers={'Authorization':'Bearer '+key,'Content-Type':'application/json'},method='POST')
    try:
        with urllib.request.urlopen(req,timeout=110) as res: result=json.load(res)
    except urllib.error.HTTPError as e:
        try: msg=json.load(e).get('error',{}).get('message','API error')
        except Exception: msg='API error'
        return jsonify(error=str(msg)[:350]),502
    except Exception:return jsonify(error='Could not connect to OpenAI. Check network or server logs.'),502
    output='\n'.join(part.get('text','') for item in result.get('output',[]) for part in item.get('content',[]) if part.get('type')=='output_text')
    return jsonify(text=output or 'No text returned. Please retry.')
if __name__=='__main__':app.run(host='127.0.0.1',port=int(os.getenv('PORT','5000')))
