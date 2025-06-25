import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

function timeAgo(time, addSuffix = true){
  const date = new Date(time);
  const timeAgo = formatDistanceToNow(date, { addSuffix, locale: fr });
  return timeAgo;
}

export { timeAgo };