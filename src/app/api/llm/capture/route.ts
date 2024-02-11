import OpenAIConnector from '@/lib/llm/OpenAIConnector';
import { CaptureImage, CaptureType, Chat } from '@/lib/llm/types';
import { NextRequest, NextResponse } from 'next/server';

const openAI = new OpenAIConnector();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const image = body.image as CaptureImage;
    const lang = body.lang;
    const isStream = body.stream || false;
    const captureType : CaptureType = body.type || "objects";

    console.log(image);
    if(!image || !image.data || !image.mime || !lang) return NextResponse.json({error: "Missing image."},{status: 422})

    const prompt = captureType == "objects" ? 
    "From the following picture, analize every distinct object on it. Return ONLY a json object of the format `{vocab: [{name: 'string', translation: 'string'}]}` with translations into " + lang :
    captureType == "story" ?
    `From the following picture, create a fun one-to-two sentence story in ${lang}. Then, give an english explanation on how the systax works and the vocabulary used.` :
    `From the following picture, briefly describe it in ${lang} and give an english explanation on the vocabulary and syntax used.`; // description

    const completionOptions: Chat = {
      maxTokens: captureType == "objects" ? 300 : 600,
      messages: [
        {
          role: "system",
          content: captureType == "objects" ? "You are a helpful language assistant that responds with JSON objects." :
                                  `You are a helpful language assistant to learn ${lang} syntax and vocabulary for english speakers.`
        },
        {
          role: "user",
          content: [
            {
              type: "text", 
              text: prompt
            },
            {
              type: "image_url",
               image_url: {
                url: `data:${image.mime};base64,${image.data}`
               }
            }
          ],
        },
      ]
    }

    if (!isStream) {
      const completion = await openAI.getChatCompletion(completionOptions)

      return NextResponse.json({
          message: "Ok",
          content: completion.choices[0]?.message.content,
        }, {
          status: 200,
        })
    }


    const completionStream = await openAI.getChatCompletionStream(completionOptions);

    return new Response(completionStream.toReadableStream());

  } catch(e: any) {
    console.log(e);
    return NextResponse.json({
        error: e.message
    },
    {
        status: 500,
    })
  }
}
