import {
  CreateChatCompletionResponse,
  ChatCompletionResponseMessage,
  ChatCompletionRequestMessage,
} from "openai";

export interface ChatCompletionRequestBody {
  messages: ChatCompletionRequestMessage[];
}

export type { CreateChatCompletionResponse };

export interface Message {
  role: "system" | "assistant" | "user";
  content: string;
}
