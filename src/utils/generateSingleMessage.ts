import { Contact, Intimacy } from '../data/mockData';
import { messageLibrary } from '../data/messageLibrary';

export function generateSingleMessage(
  contact: Contact,
  targetIntimacy?: Intimacy,
) {
  const scenario = contact.scenario;
  const intimacy =
    targetIntimacy !== undefined ? targetIntimacy : contact.intimacy;

  const messages = messageLibrary[scenario][intimacy];

  if (!messages || messages.length === 0) {
    return '생성된 메시지가 없습니다.';
  }
  return messages[Math.floor(Math.random() * messages.length)];
}
