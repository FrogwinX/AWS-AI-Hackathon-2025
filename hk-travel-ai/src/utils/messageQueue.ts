import { getChatbotMessage } from "@/app/api/agenticChatbot";
import { BANKS } from "@/constants/bank";
import { Language } from "@/constants/chatbotMessage";

type WealthCallback = (message: WealthMessage) => void;
type RetailCallback = (message: RetailMessage) => void;

export interface RetailMessage {
  chatbotId: string;
  messageId: string;
  parentMessageId?: string;
  text: string;
  lang: Language | null;
  isUser: boolean;
  audioUrl?: string | null;
  isLoading?: boolean;
  followUpQuestion?: string[];
  showFollowUp?: boolean;
}

export interface WealthMessage {
  chatbotId: string;
  messageId: string;
  originalMessageId: string;
  username: string;
  userQuery: string;
  aiAnswer: string;
  originalAudioUrl?: string | null;
  audioUrl?: string | null;
  time: string;
  isExpanded: boolean;
  replied: boolean;
  isReplying: boolean;
  reply: string;
}

class MessageQueue {
  private callbackToWealth: WealthCallback[] = [];
  private callbackToRetail: RetailCallback[] = [];

  /* From Retail To Wealth */
  subscribeRetail(callback: WealthCallback) {
    this.callbackToWealth.push(callback);
    return () => {
      this.callbackToWealth = this.callbackToWealth.filter(cb => cb !== callback);
    };
  }

  async publishWealth(message: RetailMessage, chatId: string) {
    const formData = new FormData();
    formData.append("chatInput", message.text);
    formData.append("lang", message.lang!);
    formData.append("from", `${BANKS().bank.initial} Wealth`);
    formData.append("chatId", chatId);
    const response = await getChatbotMessage(formData);
    this.callbackToWealth.forEach(callbackToWealth => callbackToWealth({
      chatbotId: message.chatbotId,
      messageId: Date.now().toString(),
      originalMessageId: message.messageId,
      username: 'Customer',
      userQuery: response.query,
      originalAudioUrl: message.audioUrl || null,
      aiAnswer: response.answer,
      time: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      isExpanded: false,
      replied: false,
      isReplying: false,
      reply: ""
    }));
  }

  /* From Wealth To Retail */
  subscribeWealth(callback: RetailCallback) {
    this.callbackToRetail.push(callback);
    return () => {
      this.callbackToRetail = this.callbackToRetail.filter(cb => cb !== callback);
    };
  }

  async publishRetail(message: WealthMessage) {
    this.callbackToRetail.forEach(callbackToRetail => callbackToRetail({
      chatbotId: message.chatbotId,
      messageId: message.messageId,
      parentMessageId: message.originalMessageId,
      text: message.reply,
      lang: null,
      isUser: false,
      audioUrl: message.audioUrl || null,
      isLoading: false,
      followUpQuestion: [],
      showFollowUp: false
    }));
  }
}

export const messageQueue = new MessageQueue();