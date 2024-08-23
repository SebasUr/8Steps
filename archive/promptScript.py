from groq import Groq

client = Groq(
    api_key=""
)

completion = client.chat.completions.create(
    model="llama3-70b-8192",
    messages=[
        {
            "role": "user",
            "content": "Quiero trabajar en como Ingeniero de Boston Dinamics, dame una trayectoria laboral de 8 pasos que permita llegar hasta allí."
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=True,
    stop=None,
)

for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")
