'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaCheck, FaTimes, FaPen, FaUser, FaMicrophone, FaStop } from 'react-icons/fa';
import { WealthMessage, messageQueue } from '@/utils/messageQueue';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import MarkdownEditor, { MarkdownComponents } from './MarkdownEditor';

const ReplySystem = () => {
  const [messages, setMessages] = useState<WealthMessage[]>([]);
  const [editingAnswers, setEditingAnswers] = useState<Record<string, string>>({});
  const [originalAnswers, setOriginalAnswers] = useState<Record<string, string>>({});

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [currentRecordingId, setCurrentRecordingId] = useState<string | null>(null);

  const startRecording = async (id: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
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
      setCurrentRecordingId(id);
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
    setIsRecording(false);
    audioChunksRef.current = [];
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setCurrentRecordingId(null);
  };

  useEffect(() => {
    messageQueue.subscribeRetail((newMessage: WealthMessage) => {
      setMessages(prev => [
        {
          ...newMessage,
          reply: '',
          messageId: newMessage.messageId,
        },
        ...prev
      ]);
    });
  }, []);

  const toggleExpand = (id: string) => {
    setMessages(prev => {
      const updated = prev.map(message => ({
        ...message,
        isExpanded: message.messageId === id ? !message.isExpanded : false,
        isReplying: false
      }));
      return updated;
    });
  };

  const startEditing = (id: string) => {
    resetRecording();
    setMessages(prev =>
      prev.map(message => {
        if (message.messageId === id) {
          setOriginalAnswers(prev => ({ ...prev, [id]: message.aiAnswer }));
          return {
            ...message,
            isReplying: true,
            isExpanded: true
          };
        }
        return message;
      })
    );
  };

  const cancelEdit = (id: string) => {
    resetRecording();
    setMessages(prev =>
      prev.map(message => {
        if (message.messageId === id) {
          setEditingAnswers(prev => ({ ...prev, [id]: originalAnswers[id] }));
          return {
            ...message,
            isReplying: false
          };
        }
        return message;
      })
    );
  };

  const sendReply = (id: string, content: string, audioUrl?: string | null) => {
    resetRecording();
    toggleExpand(id);
    const message = messages.find(m => m.messageId === id);
    if (message) {
      messageQueue.publishRetail({
        ...message,
        reply: content,
        messageId: message.messageId,
        audioUrl: audioUrl || null
      });
    }

    setMessages(prev => {
      const updated = prev.map(message => {
        if (message.messageId === id) {
          return {
            ...message,
            replied: true,
            reply: content,
            aiAnswer: content,
            isReplying: false,
            audioUrl: audioUrl || null
          };
        }
        return message;
      });

      const unreplied = updated.filter(message => !message.replied);
      const replied = updated.filter(message => message.replied);
      return [...unreplied, ...replied];
    });
  };

  const handleEditChange = (id: string, value: string) => {
    setEditingAnswers(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col h-full overflow-y-hidden">
      <div className="overflow-y-auto flex-1 p-4 bg-gray-50">
        {messages.length === 0 ?
          <div className="flex flex-row items-center justify-center py-8">
            <span className="ml-2 text-gray-600">Waiting for client query...</span>
          </div>
          : ""
        }
        <div className="space-y-3">
          {messages.map(message => (
            <div
              key={message.messageId}
              className={`border rounded-lg transition-all duration-300 overflow-hidden ${message.replied ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 shadow-sm'
                }`}
            >
              <button
                className="w-full p-3 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(message.messageId)}
              >
                <div className="truncate flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                  <span className={`w-2 h-2 rounded-full mr-3 ${message.replied ? 'bg-gray-400' : 'bg-blue-500'}`}></span>
                  <div className="truncate">
                    <span className="font-bold">From {message.username}:</span>
                    <span className="ml-2 text-gray-600">{message.userQuery.substring(0, 50) + (message.userQuery.length > 50 ? '...' : '')}</span>
                  </div>
                </div>
                <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-gray-400 text-sm mr-3">{message.time}</span>
                  <span className="text-gray-400">{message.isExpanded ? '▲' : '▼'}</span>
                </div>
              </button>

              {message.isExpanded && (
                <div className="border-t border-gray-200">
                  <div className="pt-4 px-4 text-gray-700 bg-white">
                    <div className={`flex items-center gap-3 mb-4 text-sm sm:text-base font-bold text-blue-600`}>
                      <FaUser size="16" />
                      {message.originalAudioUrl ?
                        <audio controls src={message.originalAudioUrl} className="h-10 w-48 sm:w-64" /> :
                        <span>{message.userQuery}</span>
                      }
                    </div>
                    <div className={`flex gap-3 mb-2 text-sm sm:text-base`}>
                      <span className="w-full">
                        {message.isReplying ? (
                          // <textarea
                          //   value={editingAnswers[message.id] || message.aiAnswer}
                          //   onChange={(e) => handleEditChange(message.id, e.target.value)}
                          //   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                          //   rows={20}
                          //   autoFocus
                          // />
                          <MarkdownEditor
                            value={editingAnswers[message.messageId] || message.aiAnswer}
                            onChange={(value) => handleEditChange(message.messageId, value)}
                          />
                        ) : (
                          <>
                            {message.audioUrl ?
                              <audio controls src={message.audioUrl} className="h-10 w-48 sm:w-64" /> :
                              <ReactMarkdown
                                components={MarkdownComponents}
                                remarkPlugins={[remarkGfm, remarkBreaks]}
                                rehypePlugins={[rehypeRaw]}
                              >
                                {message.aiAnswer.replace(/\n\n/gi, "\n&nbsp;\n")}
                              </ReactMarkdown>
                            }
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {!message.replied && (
                    <div className="p-3 bg-gray-50 flex justify-between space-x-2 border-t border-gray-200">
                      {/* Audio recording controls */}
                      <div className="flex flex-row space-x-2 w-full">
                        {currentRecordingId === message.messageId ? (
                          <>
                            {isRecording ? (
                              <>
                                <button
                                  onMouseDown={stopRecording}
                                  className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600"
                                >
                                  <FaStop />
                                </button>
                                <div className="flex-1 w-full bg-red-100 text-red-700 mx-2 px-4 py-2 rounded-lg text-sm sm:text-base">
                                  Recording...
                                </div>
                              </>
                            ) : (
                              <>
                                <button
                                  onMouseDown={resetRecording}
                                  className="bg-gray-200 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-400"
                                >
                                  <FaTimes />
                                </button>
                                {audioUrl && <audio controls src={audioUrl} className="h-10 w-32 sm:w-48" />}
                              </>
                            )}
                          </>
                        ) : (
                          <button
                            onMouseDown={() => startRecording(message.messageId)}
                            className="px-3 py-2 bg-teal-400 text-white hover:bg-teal-500 transition-colors rounded-md flex items-center"
                          >
                            <FaMicrophone className="mr-2" /> Audio
                          </button>
                        )}

                        {currentRecordingId === message.messageId && audioUrl && !isRecording && (
                          <button
                            onMouseDown={() => sendReply(message.messageId, '', audioUrl)}
                            className="px-3 py-2 bg-green-100 text-green-700 hover:bg-green-200 transition-colors rounded-md flex items-center"
                          >
                            <FaPaperPlane className="mr-2" /> Send Audio
                          </button>
                        )}
                      </div>

                      <div className="flex space-x-2 justify-end">
                        {message.isReplying ? (
                          <>
                            <button
                              onClick={() => cancelEdit(message.messageId)}
                              className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors rounded-md flex items-center"
                            >
                              <FaTimes className="mr-2" /> Cancel
                            </button>
                            <button
                              onClick={() => sendReply(message.messageId, editingAnswers[message.messageId] || message.aiAnswer)}
                              className="px-3 py-2 bg-teal-400 text-white hover:bg-teal-500 transition-colors rounded-md flex items-center"
                            >
                              <FaPaperPlane className="mr-2" /> Send
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(message.messageId)}
                              className="px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors rounded-md flex items-center"
                            >
                              <FaPen className="mr-2" /> Edit
                            </button>
                            <button
                              onClick={() => sendReply(message.messageId, message.aiAnswer)}
                              className="px-3 py-2 bg-green-100 text-green-700 hover:bg-green-200 transition-colors rounded-md flex items-center"
                            >
                              <FaCheck className="mr-2" /> Reply
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReplySystem;