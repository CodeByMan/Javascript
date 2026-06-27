"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  HiMiniSparkles,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMinus,
  HiOutlinePaperAirplane,
  HiOutlineXMark,
} from "react-icons/hi2";
import {
  AliGPTMenuState,
  AliGPTOption,
  buildMenuDrivenAliGPTReply,
  getAliGPTWelcomeReply,
} from "@/lib/ali-gpt-context";
import styles from "./AliGPT.module.css";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const INITIAL_REPLY = getAliGPTWelcomeReply();

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: INITIAL_REPLY.reply,
};

const LINK_PATTERN =
  /(https?:\/\/[^\s]+|www\.[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\+\d{1,3}(?:[\s()-]*\d){7,14})/gi;

function sanitizeAssistantText(content: string) {
  return content
    .replace(/\r/g, "")
    .replace(/â€¢/g, "•")
    .replace(/â/g, "'")
    .replace(/â/g, "-")
    .replace(/â/g, "-")
    .replace(/\*\*/g, "")
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/```/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1: $2")
    .replace(/^\s*--+\s*/gm, "")
    .replace(/^\s*-\s+/gm, "• ")
    .replace(/^\s*\*\s+/gm, "• ")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getLinkHref(value: string, fullLine: string) {
  const normalizedValue = value.trim();

  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(normalizedValue)) {
    return `mailto:${normalizedValue}`;
  }

  if (/^\+\d/.test(normalizedValue)) {
    const digits = normalizedValue.replace(/\D/g, "");

    if (/^\s*whatsapp\s*:/i.test(fullLine)) {
      return `https://wa.me/${digits}`;
    }

    return `tel:+${digits}`;
  }

  return normalizedValue.startsWith("http://") ||
    normalizedValue.startsWith("https://")
    ? normalizedValue
    : `https://${normalizedValue}`;
}

function renderInlineContent(text: string, keyPrefix: string) {
  const matches = Array.from(text.matchAll(LINK_PATTERN));

  if (!matches.length) {
    return text;
  }

  const parts: ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    const linkText = match[0];
    const start = match.index ?? 0;
    const href = getLinkHref(linkText, text);
    const opensNewTab = /^https?:\/\//i.test(href);

    if (start > lastIndex) {
      parts.push(
        <span key={`${keyPrefix}-text-${index}`}>
          {text.slice(lastIndex, start)}
        </span>
      );
    }

    parts.push(
      <a
        key={`${keyPrefix}-link-${index}`}
        href={href}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        className={styles.inlineLink}
      >
        {linkText}
      </a>
    );

    lastIndex = start + linkText.length;
  });

  if (lastIndex < text.length) {
    parts.push(
      <span key={`${keyPrefix}-tail`}>{text.slice(lastIndex)}</span>
    );
  }

  return parts;
}

function renderFormattedContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return <div key={`space-${index}`} className={styles.lineSpacer} />;
    }

    const isBullet = trimmedLine.startsWith("• ");
    const isSectionHeading =
      !isBullet &&
      !trimmedLine.includes(":") &&
      !/^\d+[.)]\s/.test(trimmedLine) &&
      trimmedLine.length <= 48 &&
      /^[A-Za-z][A-Za-z\s/&.-]+$/.test(trimmedLine);

    const inlineContent = renderInlineContent(trimmedLine, `line-${index}`);

    if (isSectionHeading) {
      return (
        <p key={`heading-${index}`} className={styles.sectionHeading}>
          {trimmedLine}
        </p>
      );
    }

    if (isBullet) {
      return (
        <div key={`bullet-${index}`} className={styles.bulletRow}>
          <span className={styles.bulletDot} />
          <p className={styles.messageParagraph}>
            {renderInlineContent(trimmedLine.slice(2), `bullet-${index}`)}
          </p>
        </div>
      );
    }

    return (
      <p key={`line-${index}`} className={styles.messageParagraph}>
        {inlineContent}
      </p>
    );
  });
}

function AssistantMessage({ content }: { content: string }) {
  const sanitizedContent = sanitizeAssistantText(content);

  return (
    <div className={styles.formattedMessage}>
      {renderFormattedContent(sanitizedContent)}
    </div>
  );
}

export default function AliGPT() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [menuState, setMenuState] = useState<AliGPTMenuState>(
    INITIAL_REPLY.nextState
  );
  const [options, setOptions] = useState<AliGPTOption[]>(
    INITIAL_REPLY.options
  );
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const messageIdRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, options, isOpen]);

  useEffect(() => {
    const updateWidgetVisibility = () => {
      const footer =
        document.querySelector("footer") ?? document.getElementById("footer");

      const footerTop = footer
        ? footer.getBoundingClientRect().top
        : Number.POSITIVE_INFINITY;

      const beforeFooter = footerTop > window.innerHeight + 80;

      setIsWidgetVisible(beforeFooter);

      if (!beforeFooter) {
        setIsOpen(false);
      }
    };

    updateWidgetVisibility();

    window.addEventListener("scroll", updateWidgetVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateWidgetVisibility);

    return () => {
      window.removeEventListener("scroll", updateWidgetVisibility);
      window.removeEventListener("resize", updateWidgetVisibility);
    };
  }, []);

  function submitSelection(rawValue: string, visibleLabel?: string) {
    const trimmedValue = rawValue.trim();

    if (!trimmedValue) {
      return;
    }

    messageIdRef.current += 1;
    const messageSequence = messageIdRef.current;

    const userMessage: Message = {
      id: `message-${messageSequence}-user`,
      role: "user",
      content: visibleLabel ?? trimmedValue,
    };

    const result = buildMenuDrivenAliGPTReply(trimmedValue, menuState);

    const assistantMessage: Message = {
      id: `message-${messageSequence}-assistant`,
      role: "assistant",
      content: result.reply,
    };

    setMessages((current) => [
      ...current,
      userMessage,
      assistantMessage,
    ]);
    setMenuState(result.nextState);
    setOptions(result.options);
    setInput("");
  }

  function handleOptionClick(option: AliGPTOption) {
    submitSelection(option.value, `${option.value}. ${option.label}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitSelection(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitSelection(input);
    }
  }

  const inputPlaceholder =
    menuState === "follow-up"
      ? "Enter 1 for Yes or 2 for No"
      : menuState === "stopped"
        ? "Type anything to start again"
        : "Enter an option number";

  return (
    <div
      className={`${styles.root} ${
        isWidgetVisible ? styles.rootVisible : styles.rootHidden
      }`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={styles.panel}
            aria-label="AliGPT portfolio assistant"
          >
            <header className={styles.header}>
              <div className={styles.headerIdentity}>
                <div className={styles.headerIcon}>
                  <HiMiniSparkles size={15} />
                </div>

                <div className={styles.headerCopy}>
                  <div className={styles.headerTitleRow}>
                    <p className={styles.headerTitle}>AliGPT</p>
                    <span className={styles.onlineDot} />
                  </div>
                  <p className={styles.headerSubtitle}>
                    Guided Portfolio Assistant
                  </p>
                </div>
              </div>

              <div className={styles.headerActions}>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.headerButton}
                  aria-label="Minimize AliGPT"
                >
                  <HiOutlineMinus size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.headerButton}
                  aria-label="Close AliGPT"
                >
                  <HiOutlineXMark size={16} />
                </button>
              </div>
            </header>

            <div ref={viewportRef} className={styles.messagesViewport}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.18,
                    delay: index === 0 ? 0 : 0.03,
                  }}
                  className={`${styles.messageRow} ${
                    message.role === "user"
                      ? styles.messageRowUser
                      : styles.messageRowAssistant
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      message.role === "user"
                        ? styles.userBubble
                        : styles.assistantBubble
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <AssistantMessage content={message.content} />
                    ) : (
                      <p className={styles.userMessageText}>
                        {message.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {options.length > 0 && (
                <motion.div
                  key={`${menuState}-${options.map((option) => option.value).join("-")}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.quickReplies}
                  aria-label="Available AliGPT options"
                >
                  {options.map((option) => (
                    <button
                      key={`${menuState}-${option.value}`}
                      type="button"
                      className={styles.optionButton}
                      onClick={() => handleOptionClick(option)}
                    >
                      <span className={styles.optionNumber}>
                        {option.value}
                      </span>
                      <span className={styles.optionLabel}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <div className={styles.inputDock}>

              <form onSubmit={handleSubmit} className={styles.inputShell}>
                <label htmlFor="ali-gpt-input" className={styles.srOnly}>
                  Enter an AliGPT menu option
                </label>

                <textarea
                  id="ali-gpt-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={inputPlaceholder}
                  rows={1}
                  inputMode={
                    menuState === "stopped" ? "text" : "numeric"
                  }
                  className={styles.textarea}
                />

                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={styles.sendButton}
                  aria-label="Submit selected option"
                >
                  <HiOutlinePaperAirplane size={16} />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={styles.launcher}
        aria-label={isOpen ? "Close AliGPT" : "Open AliGPT"}
      >
        <span className={styles.launcherIcon} aria-hidden="true">
          <HiOutlineChatBubbleLeftRight
            size={27}
            strokeWidth={1.8}
            className={styles.launcherSvg}
          />
        </span>
        <span className={styles.launcherTooltip}>
          {"Explore Ali's Portfolio"}
        </span>
      </button>
    </div>
  );
}
