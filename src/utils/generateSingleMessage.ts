import { Contact, Intimacy } from '../data/mockData';
import { messageFeedbackLibrary, messageLibrary } from '../data/messageLibrary';

export type MessageFeedback = 'polite' | 'soft' | 'concise';

export function generateSingleMessage(
  contact: Contact,
  targetIntimacy?: Intimacy,
  feedback?: MessageFeedback,
) {
  const scenario = contact.scenario;
  const intimacy =
    targetIntimacy !== undefined ? targetIntimacy : contact.intimacy;

  const messages =
    feedback && messageFeedbackLibrary[scenario]?.[feedback]?.[intimacy]
      ? messageFeedbackLibrary[scenario][feedback][intimacy]
      : messageLibrary[scenario][intimacy];

  if (!messages || messages.length === 0) {
    return '생성된 메시지가 없습니다.';
  }
  return messages[Math.floor(Math.random() * messages.length)];
}
