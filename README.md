
# JARVIS GPT LOCAL

This is a local running chatbot using LLM Model and Llama. To this app work, you need a web server using [Llama](https://github.com/abetlen/llama-cpp-python)

Front-End: ![Static Badge](https://img.shields.io/badge/NextJS-000000) ![Static Badge](https://img.shields.io/badge/MongoDB-00F35F) ![Static Badge](https://img.shields.io/badge/Pusher-300D4F) ![Static Badge](https://img.shields.io/badge/TailwindCSS-0EA5E9) ![Static Badge](https://img.shields.io/badge/Shadcn%20UI-09090B) ![Static Badge](https://img.shields.io/badge/Typescript-3178C6)

## Prerequisite

- LLM Model: You can get from any source. I recommend from [https://huggingface.co/](https://huggingface.co/)
- Llama Installed: You can follow the instruction from [here](https://github.com/abetlen/llama-cpp-python)
- Python

## Installation

- Pulling this code
- Run npm command for building a project is `npm run build`
- Run the server using `npm run dev`
- This app also using MongoDB API, Pusher, so you need to setup `.env` file

```javascript
MONGODB_API  = {MONGODB_API_ENDPOINT}
MONGDODB_API_KEY  = {MONGDODB_API_KEY}
LOCAL_ENDPOINT  = {LOCAL_ENDPOINT_Llama_Server}
PUSHER_APP_ID  = {PUSHER_APP_ID}
NEXT_PUBLIC_PUSHER_APP_KEY  = {NEXT_PUBLIC_PUSHER_APP_KEY}
PUSHER_APP_SECRET  = {PUSHER_APP_SECRET}
```

- Remember Run Llama server. For example:

```sh
python -m llama_cpp.server --model "./model/mistral-7b-openorca.Q4_0.gguf" --chat_format chatml --n_gpu_layers 1
```

## Chatbot

- You can create new chat, select old chat, continue old chat.
- All data will be saved to mongoDB.
- ![image](https://github.com/knight1972001/Jarvis_GPT_Local/assets/60019805/5d508f00-a09b-4706-ac09-7a6367c69f26)

