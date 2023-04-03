"use client";

import { Chat } from "@/components/addons/Chat";
import React from "react";
import { HeadingSmall } from "baseui/typography";
import { ChatCompletionRequestBody, Message } from "@/app/api/openai";

const INITIAL_MESSAGES: Message[] = [
  {
    role: "system",
    content: `Você é um assistente em serviço da empresa RBNA Consultoria, uma empresa de certificação sedeada no Rio de Janeiro.
      Você deseja extrair todos os dados relevantes para um processo de certificação da emissão de carbono.
      
      Responda as mensagens a seguir como se fosse um funcionário da RBNA tentando extrair as informações certas do cliente.`,
  },
  {
    role: "assistant",
    content: `Olá! Eu sou o assistente de inteligência artificial e vou te ajudar a criar um processo. Vou fazer algumas perguntas e juntos vamos criar seu processo de certificação.`,
  },
];

function CreateProcessChat() {
  const [isSendingMessage, setIsSendingMessage] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
  const [sendMessageError, setSendMessageError] = React.useState<string | null>(
    null
  );

  async function sendMessage(userMessage: Message) {
    setIsSendingMessage(true);
    setSendMessageError(null);
    try {
      const withUserMessage = [...messages, userMessage];
      setMessages(withUserMessage);
      const body = { messages: withUserMessage };
      await onChatCompletionResponse(body, {
        next: (content) => {
          const updatedResponseMessage: Message = {
            role: "assistant",
            content,
          };
          setMessages([...withUserMessage, updatedResponseMessage]);
        },
        error: (error) => {
          setMessages(messages); // Roll back to messages without user message
          setSendMessageError(error?.message || "Erro desconhecido");
        },
        complete() {
          setIsSendingMessage(false);
        },
      });
    } catch (error: any) {
      alert("hello");
      setMessages(messages); // Roll back to messages without user message
      setSendMessageError(error?.message || "Erro desconhecido");
    } finally {
      setIsSendingMessage(false);
    }
  }

  return (
    <Chat
      header={<HeadingSmall>Assistente de Criação de Processo</HeadingSmall>}
      isSendingMessage={isSendingMessage}
      sendMessageError={sendMessageError}
      messages={messages.slice(1)}
      onSendMessage={sendMessage}
    />
  );
}

interface Observer {
  next: (content: string) => void;
  error: (error: any) => void;
  complete: () => any;
}

async function onChatCompletionResponse(
  body: ChatCompletionRequestBody,
  { next, error, complete }: Observer
) {
  try {
    const stream = await getChatCompletionStream(body);

    const reader = stream.getReader();
    const textDecoder = new TextDecoder();

    let messageContent = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        complete();
        return;
      }

      const token = textDecoder.decode(value);
      messageContent += token;
      next(messageContent);
    }
  } catch (err: any) {
    error(err);
  }
}

async function getChatCompletionStream(body: ChatCompletionRequestBody) {
  const response = await fetch("/api/openai/chat_completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.status >= 400) {
    const json = await response.json();
    throw json.error;
  }
  const stream = response.body as ReadableStream;
  return stream;
}

export { CreateProcessChat };
