import { Language } from "@/constants/chatbotMessage";

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

