import { getChatbotMessage } from "@/app/api/agenticChatbot";
import { Language } from "@/constants/chatbotMessage";

type PremiumCallback = (message: PremiumMessage) => void;
type TravelCallback = (message: TravelMessage) => void;

export interface TravelMessage {
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

export interface PremiumMessage {
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

// Keep RetailMessage for backward compatibility
export interface RetailMessage extends TravelMessage {}
export interface WealthMessage extends PremiumMessage {}

class MessageQueue {
  private callbackToPremium: PremiumCallback[] = [];
  private callbackToTravel: TravelCallback[] = [];

  /* From Travel To Premium */
  subscribeTravel(callback: PremiumCallback) {
    this.callbackToPremium.push(callback);
    return () => {
      this.callbackToPremium = this.callbackToPremium.filter(cb => cb !== callback);
    };
  }

  async publishPremium(message: TravelMessage, chatId: string) {
    const formData = new FormData();
    formData.append("chatInput", message.text);
    formData.append("lang", message.lang!);
    formData.append("from", "HK Premium Guide");
    formData.append("chatId", chatId);
    const response = await getChatbotMessage(formData);
    this.callbackToPremium.forEach(callbackToPremium => callbackToPremium({
      chatbotId: message.chatbotId,
      messageId: Date.now().toString(),
      originalMessageId: message.messageId,
      username: 'Traveler',
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

  /* From Premium To Travel */
  subscribePremium(callback: TravelCallback) {
    this.callbackToTravel.push(callback);
    return () => {
      this.callbackToTravel = this.callbackToTravel.filter(cb => cb !== callback);
    };
  }

  async publishTravel(message: PremiumMessage) {
    this.callbackToTravel.forEach(callbackToTravel => callbackToTravel({
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

  // Backward compatibility methods
  subscribeRetail = this.subscribeTravel;
  publishWealth = this.publishPremium;
  subscribeWealth = this.subscribePremium;
  publishRetail = this.publishTravel;
}

export const messageQueue = new MessageQueue();