import { Service } from '@angular/core';
import { ChatSession, getAI, getGenerativeModel, ModelParams } from 'firebase/ai';
import { getApp } from 'firebase/app';

@Service()
export class GeminiChat {
  createSession(params: ModelParams): ChatSession {
    const ai = getAI(getApp());
    return getGenerativeModel(ai, params).startChat();
  }
}
