"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getChatbotMessage } from "@/app/api/agenticChatbot";
import {
  LANGUAGES,
  DEFAULT_MESSAGES,
  Language,
} from "../constants/chatbotMessage";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaMicrophone,
  FaStop,
  FaTimes,
  FaQuestionCircle,
} from "react-icons/fa";
import remarkBreaks from "remark-breaks";
import { RetailMessage, messageQueue } from "@/utils/messageQueue";
import { MarkdownComponents } from "./MarkdownEditor";
import { TravelGuideProps } from "@/constants/travel";
import { useTripPlan } from "@/contexts/TripPlanContext";

const Chatbot = ({
  from,
  chatId,
  selectedGuide,
}: {
  from: string;
  chatId: string;
  selectedGuide: TravelGuideProps;
}) => {
  const { parseChatResponse } = useTripPlan();

  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    "TRADITIONAL_CHINESE"
  );
  const suggestions =
    DEFAULT_MESSAGES(selectedGuide)[currentLanguage].suggestions;

  const [messages, setMessages] = useState<RetailMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const generateMessageId = () => `${Date.now().toString()}`;

  useEffect(() => {
    setMessages([
      {
        chatbotId: chatId,
        messageId: generateMessageId(),
        text: DEFAULT_MESSAGES(selectedGuide)[currentLanguage].text,
        lang: currentLanguage,
        isUser: false,
        followUpQuestion:
          DEFAULT_MESSAGES(selectedGuide)[currentLanguage].suggestions,
        showFollowUp: true,
      },
    ]);
  }, [chatId, currentLanguage, selectedGuide]);

  const toggleLanguage = () => {
    const languages: Language[] = [
      "TRADITIONAL_CHINESE",
      "SIMPLIFIED_CHINESE",
      "ENGLISH",
    ];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    setCurrentLanguage(nextLanguage);
    setMessages((prevMessages) => {
      if (prevMessages.length > 0) {
        const newMessages = [...prevMessages];
        newMessages[0] = {
          chatbotId: chatId,
          messageId: prevMessages[0].messageId,
          text: DEFAULT_MESSAGES(selectedGuide)[nextLanguage].text,
          lang: nextLanguage,
          isUser: false,
          followUpQuestion:
            DEFAULT_MESSAGES(selectedGuide)[nextLanguage].suggestions,
          showFollowUp: true,
        };
        return newMessages;
      }
      return prevMessages;
    });
  };

  const addMessage = (message: RetailMessage) => {
    const messageWithId = {
      ...message,
      messageId: message.messageId || generateMessageId(),
      text:
        typeof message.text === "string"
          ? message.text
          : String(message.text || ""),
    };
    setMessages((prev) => [...prev, messageWithId]);
    return messageWithId;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    audioChunksRef.current = [];
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const sendMessage = async (text?: string) => {
    let messageContent = text ? text : inputValue.trim();

    if (
      (!messageContent && !audioBlob && !audioUrl) ||
      (!messageContent && audioBlob && !audioUrl) ||
      (!messageContent && !audioBlob && audioUrl)
    )
      return;

    setIsMessageSending(true);

    const userMessage: RetailMessage = {
      chatbotId: chatId,
      messageId: generateMessageId(),
      text: messageContent,
      lang: currentLanguage,
      isUser: true,
      audioUrl: audioUrl || null,
    };

    await new Promise((resolve) =>
      setTimeout(() => {
        addMessage(userMessage);
        setInputValue("");
        resetRecording();
        resolve(null);
      }, 100)
    );

    const loadingMessageId = generateMessageId();
    const loadingMessage: RetailMessage = {
      chatbotId: chatId,
      messageId: loadingMessageId,
      text: "",
      lang: null,
      isUser: false,
      isLoading: true,
    };

    await new Promise((resolve) =>
      setTimeout(() => {
        addMessage(loadingMessage);
        resolve(null);
      }, 1500)
    );

    setIsMessageSending(false);

    try {
      const formData = new FormData();
      if (audioBlob) {
        formData.append("audioInput", audioBlob, "audio.webm");
      } else {
        formData.append("chatInput", messageContent);
      }
      formData.append("lang", currentLanguage);
      formData.append("from", from);
      formData.append("chatId", chatId);

      const response = await getChatbotMessage(formData);
      
      // Handle different response formats
      let botResponse: string;
      if (typeof response === 'string') {
        botResponse = response;
      } else if (response && typeof response.output === 'string') {
        botResponse = response.output;
      } else if (response && response.output) {
        // If output is an object or array, try to extract meaningful text
        if (Array.isArray(response.output)) {
          botResponse = response.output.map((item: any) => {
            if (typeof item === 'string') return item;
            if (item.type === 'text' && item.text) return item.text;
            if (item.functionCall) {
              const funcName = item.functionCall.name.replace(/_/g, ' ').toLowerCase();
              return `🔍 Getting ${funcName}...`;
            }
            return JSON.stringify(item);
          }).join('\n');
        } else {
          botResponse = JSON.stringify(response.output);
        }
      } else {
        botResponse = "Sorry, I could not process that.";
      }

      const followUp = response && response.question ?
        (typeof response.question === 'string' ? response.question.split("*") : []) : [];

      // Parse the AI response to update trip plan
      if (typeof botResponse === 'string') {
        parseChatResponse(botResponse);
      }

      if (response && response.isPassToWealth && response.query) {
        messageQueue.publishWealth({
          ...userMessage,
          text: response.query,
          audioUrl: userMessage.audioUrl || null
        }, chatId);
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === loadingMessageId
            ? {
                chatbotId: chatId,
                messageId: loadingMessageId,
                text: String(botResponse || ""),
                lang: currentLanguage,
                isUser: false,
                followUpQuestion: followUp,
                showFollowUp: true,
              }
            : msg.chatbotId === chatId
            ? msg
            : {
                chatbotId: "0",
                messageId: loadingMessageId,
                text: String(botResponse || ""),
                lang: currentLanguage,
                isUser: false,
                followUpQuestion: followUp,
                showFollowUp: true,
              }
        )
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === loadingMessageId
            ? {
                chatbotId: chatId,
                messageId: loadingMessageId,
                text: "Error fetching response",
                lang: currentLanguage,
                isUser: false,
                followUpQuestion: [],
                showFollowUp: false,
              }
            : msg.chatbotId === chatId
            ? msg
            : {
                chatbotId: "0",
                messageId: loadingMessageId,
                text: "Error fetching response",
                lang: currentLanguage,
                isUser: false,
                followUpQuestion: [],
                showFollowUp: false,
              }
        )
      );
    }
  };

  const ReplyDisplay = ({ parentId }: { parentId: string }) => {
    const parentMessage = messages.find((m) => m.messageId === parentId);
    if (!parentMessage) return null;

    return (
      <div className="bg-gray-100 border-l-4 border-blue-500 pl-4 py-3 my-4 text-gray-600 text-sm md:text-md truncate">
        {parentMessage.audioUrl ? (
          <audio
            controls
            src={parentMessage.audioUrl}
            className="h-10 w-48 sm:w-64"
          />
        ) : parentMessage.text.length > 50 ? (
          `${parentMessage.text.substring(0, 50)}...`
        ) : (
          parentMessage.text
        )}
      </div>
    );
  };

  // Convert message content to JSX elements using React Markdown
  const displayMessage = (message: RetailMessage) => {
    if (message.isLoading) {
      return (
        <div className="flex gap-2 pt-3">
          <div className="w-2 h-2 bg-teal-400 rounded-full opacity-75 animate-bounce"></div>
          <div
            className="w-2 h-2 bg-teal-400 rounded-full opacity-75 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-teal-400 rounded-full opacity-75 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      );
    }
    return (
      <div className="relative">
        {message.parentMessageId && (
          <ReplyDisplay parentId={message.parentMessageId} />
        )}
        {message.audioUrl ? (
          <audio
            controls
            src={message.audioUrl}
            className="h-10 w-48 sm:w-64"
          />
        ) : (
          <ReactMarkdown
            components={MarkdownComponents}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw]}
          >
            {typeof message.text === "string"
              ? message.text.replace(/\n\n/gi, "\n&nbsp;\n")
              : String(message.text || "")}
          </ReactMarkdown>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (chatHistoryRef.current && messages.length > 1) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const unsubscribe = messageQueue.subscribeWealth(
      (newMessage: RetailMessage) => {
        const replyMessage = newMessage.parentMessageId
          ? { ...newMessage, parentMessageId: newMessage.parentMessageId }
          : newMessage;
        setMessages((prev) => [...prev, replyMessage]);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto flex-1">
      <div
        ref={chatHistoryRef}
        className="flex flex-col px-3 sm:px-6 py-4 overflow-y-auto h-full"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {messages
          .filter((message) => message.chatbotId === chatId)
          .map((message, idx) => (
            <div
              key={idx}
              className={`max-w-[95%] sm:max-w-[85%] p-3 sm:p-4 mb-3 sm:mb-4 relative animate-fadeIn ${
                message.isUser
                  ? "bg-blue-600 text-white self-end rounded-br-none rounded-l-2xl rounded-tr-2xl"
                  : "bg-blue-50 border border-blue-100 self-start rounded-bl-none rounded-r-2xl rounded-tl-2xl"
              }`}
              style={{
                position: "relative",
                borderBottomLeftRadius: message.isUser ? "1rem" : "0",
                borderBottomRightRadius: message.isUser ? "0" : "1rem",
              }}
            >
              <div
                className={`flex items-center gap-2 mb-2 text-sm sm:text-base font-bold ${
                  message.isUser ? "text-blue-100" : "text-blue-600"
                }`}
              >
                {message.isUser ? <FaUser /> : <FaRobot className="pb-1" />}
                <span>{message.isUser ? "You" : "HK Travel AI"}</span>
              </div>

              {displayMessage(message)}

              {!message.isUser &&
                !message.isLoading &&
                message.showFollowUp &&
                message.followUpQuestion && (
                  <div className="flex flex-col items-start gap-2 mt-4">
                    {message.followUpQuestion.map((question, qIdx) => (
                      <button
                        key={qIdx}
                        className="w-full px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-left text-sm sm:text-base hover:bg-blue-200 transition-colors"
                        onClick={() => sendMessage(question)}
                        disabled={isRecording || isMessageSending}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
      </div>

      {/* Input area fixed at bottom */}
      <div className="p-2 sm:p-4 h-16 sm:h-20 border-t border-gray-200 flex gap-2 sm:gap-3 items-center relative">
        {isRecording ? (
          <button
            onMouseDown={stopRecording}
            className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600"
          >
            <FaStop />
          </button>
        ) : audioBlob ? (
          <button
            onMouseDown={resetRecording}
            className="bg-gray-200 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-400"
          >
            <FaTimes />
          </button>
        ) : (
          <button
            onMouseDown={startRecording}
            className="bg-teal-400 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-teal-500"
          >
            <FaMicrophone />
          </button>
        )}

        {isRecording ? (
          <div className="flex-1 bg-red-100 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base">
            Recording...
          </div>
        ) : audioUrl ? (
          <div className="flex-1">
            <audio controls src={audioUrl} className="w-full h-10 sm:h-12" />
          </div>
        ) : (
          <div className="flex-1 relative">
            {/* Language button */}
            <button
              disabled={isRecording || isMessageSending}
              onClick={toggleLanguage}
              className="absolute left-4 top-1/2 border-r pr-3 transform -translate-y-1/2 text-gray-400 hover:text-teal-500"
            >
              {LANGUAGES[currentLanguage].display}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !isMessageSending && sendMessage()
              }
              placeholder="Ask about Hong Kong attractions, food, transport..."
              className={`w-full ${
                LANGUAGES[currentLanguage] === LANGUAGES.ENGLISH
                  ? "px-16 py-2 sm:px-18 sm:py-3"
                  : "px-12 py-2 sm:px-14 sm:py-3"
              } border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm sm:text-base`}
            />

            {/* Suggestions */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-500"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              <FaQuestionCircle className="text-sm sm:text-base" />
            </button>

            {showSuggestions && !isRecording && !audioUrl && (
              <div
                ref={suggestionsRef}
                className="absolute bottom-full bg-white rounded-lg shadow-lg z-10 mb-1 w-full overflow-y-auto"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-left hover:bg-gray-100 text-gray-700 text-sm sm:text-base"
                    onClick={() => {
                      setInputValue(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => sendMessage()}
          disabled={isRecording || isMessageSending}
          className="bg-teal-400 hover:bg-teal-500 text-white p-2 sm:p-4 rounded-lg font-medium transition-colors flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto"
        >
          <FaPaperPlane className="text-sm sm:text-base" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
