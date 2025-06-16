import { users, chatSessions, chatMessages, type User, type InsertUser, type ChatSession, type ChatMessage, type InsertChatSession, type InsertChatMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(sessionId: string): Promise<ChatSession | undefined>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string, limit?: number): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatSessions: Map<string, ChatSession>;
  private chatMessages: Map<string, ChatMessage[]>;
  private currentUserId: number;
  private currentSessionId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.chatSessions = new Map();
    this.chatMessages = new Map();
    this.currentUserId = 1;
    this.currentSessionId = 1;
    this.currentMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = this.currentSessionId++;
    const session: ChatSession = {
      id,
      sessionId: insertSession.sessionId,
      createdAt: new Date(),
    };
    this.chatSessions.set(insertSession.sessionId, session);
    this.chatMessages.set(insertSession.sessionId, []);
    return session;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.chatSessions.get(sessionId);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentMessageId++;
    const message: ChatMessage = {
      id,
      sessionId: insertMessage.sessionId,
      role: insertMessage.role,
      content: insertMessage.content,
      createdAt: new Date(),
    };

    const messages = this.chatMessages.get(insertMessage.sessionId) || [];
    messages.push(message);
    this.chatMessages.set(insertMessage.sessionId, messages);

    return message;
  }

  async getChatMessages(sessionId: string, limit: number = 20): Promise<ChatMessage[]> {
    const messages = this.chatMessages.get(sessionId) || [];
    return messages.slice(-limit);
  }
}

export const storage = new MemStorage();
