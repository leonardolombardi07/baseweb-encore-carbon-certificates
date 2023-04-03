import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { NextRequest, NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: NextRequest) {
  if (!configuration.apiKey) {
    return ServerError({
      message: "OpenAI API key not configured on server",
    });
  }

  try {
    let { messages } = await request.json();
    if (!messages) {
      return BadRequest({
        message: "Body must have valid 'messages' property",
      });
    }

    const response = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages,
        stream: true,
      },
      {
        responseType: "stream",
      }
    );

    const iterator = streamChatCompletion(
      response.data as unknown as AsyncIterable<Buffer>
    );
    const stream = iteratorToStream(iterator);
    return new Response(stream);
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data;
    return NextResponse.json(
      {
        error: {
          message:
            data?.statusMessage || "An error ocurred during your request.",
        },
      },
      { status }
    );
  }
}

async function* streamChatCompletion(dataStream: AsyncIterable<Buffer>) {
  try {
    const textEncoder = new TextEncoder();

    for await (const chunk of dataStream) {
      const lines = chunk
        .toString("utf8")
        .split("\n")
        .filter((line) => line.trim().startsWith("data: "));

      for (const line of lines) {
        const message = line.replace(/^data: /, "");
        if (message === "[DONE]") {
          return;
        }

        const json = JSON.parse(message);
        const token = json.choices[0].delta.content as string;
        if (token) {
          // We can't send strings vi Next.js, see:
          // https://github.com/vercel/next.js/issues/38736#issuecomment-1278917422
          yield textEncoder.encode(token);
        }
      }
    }
  } catch (error: any) {
    throw error;
  }
}

// Utils

function BadRequest({ message }: { message: string }) {
  return NextResponse.json({ error: { message } }, { status: 400 });
}

function ServerError({ message }: { message: string }) {
  return NextResponse.json({ error: { message } }, { status: 500 });
}

// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: AsyncGenerator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}
