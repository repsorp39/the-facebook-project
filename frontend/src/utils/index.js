import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

function timeAgo(time, addSuffix = true){
  const date = new Date(time);
  const timeAgo = formatDistanceToNow(date, { addSuffix, locale: fr });
  return timeAgo;
}

function countRecordDuration(time) {
  let hour = Math.floor(time / 3600);
  let minute = Math.floor(time / 60) % 60;
  let seconde = time % 60;

  hour = hour.toString().padStart(2, "0");
  minute = minute.toString().padStart(2, "0");
  seconde = seconde.toString().padStart(2, "0");

  if (hour === "00") {
    return `${minute} : ${seconde}`;
  } else {
    return `${hour} : ${minute} : ${seconde} `;
  }
}


export { timeAgo,countRecordDuration };