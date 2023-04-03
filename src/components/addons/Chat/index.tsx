import { styled } from "@/styles";
import { Textarea } from "baseui/textarea";
import { Tag, KIND, SIZE } from "baseui/tag";
import { Button } from "baseui/button";
import { ArrowRight } from "baseui/icon";
import React from "react";
import { Message } from "@/app/api/openai";
import { capitalizeFirstLetter } from "@/utils/text";
import { Banner } from "baseui/banner";

interface ChatProps {
  // State
  isSendingMessage: boolean;
  sendMessageError: string | null;
  messages: Message[];

  // Actions
  onSendMessage: (message: Message) => void;

  // UI
  header: React.ReactNode;
  emptyMessages?: React.ReactNode;
}

function Chat({
  isSendingMessage,
  messages,
  sendMessageError,
  onSendMessage,
  header,
  emptyMessages,
}: ChatProps) {
  const [input, setInput] = React.useState("");
  const scrollToBottomRef = React.useRef<HTMLDivElement>(null);
  const messagesRef = React.useRef<HTMLDivElement>(null);

  function safeScrollToBottom() {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  React.useEffect(function onFirstMount() {
    safeScrollToBottom();
  }, []);

  React.useEffect(
    function scrollOnNewMessagesHeuristic() {
      if (!messagesRef.current) return;

      const { scrollHeight, clientHeight, scrollTop } = messagesRef.current;
      const maxScrollHeight = scrollHeight - clientHeight;
      const isCloseToBottom = scrollTop >= 0.75 * maxScrollHeight;
      if (isCloseToBottom) safeScrollToBottom();
    },
    [messages]
  );

  function handleSendMessage() {
    if (disableSendMessage) return;
    setInput("");
    onSendMessage({ role: "user", content: input });
  }

  const disableSendMessage = isSendingMessage || !input;

  return (
    <Container>
      <HeaderContainer>{header}</HeaderContainer>

      <MessagesContainer ref={messagesRef}>
        {messages.length === 0 && emptyMessages}
        {messages.map((m) => (
          <Message role={m.role} key={`${m.content}`}>
            {m.content}
          </Message>
        ))}
        <div ref={scrollToBottomRef} />

        {sendMessageError && (
          <Banner
            kind={KIND.negative}
            title={`Algum erro ocorreu: ${sendMessageError}`}
          >
            Envie uma nova mensagem para tentar novamente.
          </Banner>
        )}
      </MessagesContainer>

      <FooterContainer>
        <TextAreaContainer>
          <Textarea
            autoFocus
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={1}
            placeholder="Digite sua mensagem aqui"
            overrides={{
              Root: {
                style: {
                  // To avoid warning with borderRadius: 0, we don't use shorthand properties
                  // The warning:
                  // "Mixing shorthand and longhand properties within the same style object is unsupported with atomic rendering."
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                },
              },
            }}
            onKeyDown={(event) => {
              if (disableSendMessage) return;
              if (event.shiftKey) return; // Let add a new line

              if (event.key === "Enter") {
                event.preventDefault(); // Prevent create a new line
                handleSendMessage();
              }
            }}
          />

          <FooterButtonsContainer>
            <Button
              isLoading={isSendingMessage}
              disabled={disableSendMessage}
              kind={"tertiary"}
              shape="square"
              onClick={handleSendMessage}
            >
              <ArrowRight size={30} />
            </Button>
          </FooterButtonsContainer>
        </TextAreaContainer>
      </FooterContainer>
    </Container>
  );
}

const HEADER_HEIGHT = "50px";

const Container = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "100%",
  border: "1px solid rgba(34,36,38,.15)",
  borderRadius: "15px",

  // Internal Layout
  position: "relative",
  paddingTop: HEADER_HEIGHT,
  display: "flex",
  flexDirection: "column",
}));

const HeaderContainer = styled("header", ({ $theme }) => ({
  position: "absolute",
  top: 0,
  height: HEADER_HEIGHT,
  width: "100%",
  borderBottom: "1px solid rgba(34,36,38,.15)",

  // Internal Layout
  display: "flex",
  alignItems: "center",
  padding: "1em",
}));

const MessagesContainer = styled("div", ({ $theme }) => ({
  flexGrow: 1,
  minHeight: "2em",
  maxHeight: "400px",

  // Internal Layout
  display: "flex",
  flexDirection: "column",
  paddingBottom: "1em",
  overflowY: "auto",
  overflowX: "hidden",
}));

const MessageContainer = styled<"div", { $role: Message["role"] }>(
  "div",
  ({ $theme, $role }) => ({
    width: "100%",
    padding: "1em",
    borderBottom: "1px solid rgba(34,36,38,.15)",
    color: $theme.colors.primary,
    background:
      $role === "user"
        ? $theme.colors.backgroundPrimary
        : $theme.colors.backgroundTertiary,

    // Internal Layout
    display: "flex",
    alignItems: "center",
    wordBreak: "break-word",
  })
);

function useDisplayRole(role: Message["role"]) {
  switch (role) {
    case "assistant":
      return "Assistente";
    case "system":
      return "Sistema";

    case "user":
      return "Leonardo";
    default:
      // This should be impossible
      return capitalizeFirstLetter(role);
  }
}

function Message({
  role,
  children,
}: {
  role: Message["role"];
  children: React.ReactNode;
}) {
  const displayRole = useDisplayRole(role);
  return (
    <MessageContainer $role={role}>
      <Tag closeable={false} kind={KIND.neutral} size={SIZE.medium}>
        {displayRole}
      </Tag>

      <div style={{ marginRight: "1em" }} role="separator" />

      <span>{children}</span>
    </MessageContainer>
  );
}

const FooterContainer = styled("footer", () => ({
  width: "100%",
  flexShrink: 0,
}));

const TextAreaContainer = styled("div", ({ $theme }) => ({
  width: "100%",
  position: "relative",
  display: "flex",
  background: $theme.colors.inputFill,
}));

const FooterButtonsContainer = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  padding: "0 1em",
}));

export { Chat };
