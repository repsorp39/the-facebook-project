import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

function timeAgo(time){
  const date = new Date(time);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: fr });
  return timeAgo;
}

export { timeAgo };