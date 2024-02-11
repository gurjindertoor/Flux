import OpenAIConnector from '@/lib/llm/OpenAIConnector';
import { NextRequest, NextResponse } from 'next/server';

const openAI = new OpenAIConnector();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    if (!openAI.connect()) {
        throw Error("Error trying to connect to LLM.");
    }
    return NextResponse.json({
        message: "Ok"
    }, {
        status: 200
    })
  } catch(e: any) {
    return NextResponse.json({
        error: e.message
    },
    {
        status: 500,
    })
  }
}
