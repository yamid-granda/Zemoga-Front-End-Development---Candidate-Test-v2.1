export function getTimeAgoFromStrDate(strDate: string) {
  let text;

  const date = new Date(strDate);
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: "auto" });

  if (years > 0) {
    text = rtf.format(0 - years, "year");
  } else if (months > 0) {
    text = rtf.format(0 - months, "month");
  } else if (days > 0) {
    text = rtf.format(0 - days, "day");
  } else if (hours > 0) {
    text = rtf.format(0 - hours, "hour");
  } else if (minutes > 0) {
    text = rtf.format(0 - minutes, "minute");
  } else {
    text = rtf.format(0 - diff, "second");
  }

  return text;
}
