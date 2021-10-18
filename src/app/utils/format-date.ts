export const formatDate = (date: Date): string => {
  try{
    const year = String(date.getFullYear());
    const months = String(date.getMonth());
    const day = String(date.getDate());
    const minutes = String(date.getMinutes());
    const seconds =  String(date.getSeconds());
    return `${convertTimeCorrectFormat(day)}.${convertTimeCorrectFormat(months)}.${convertTimeCorrectFormat(year)} ${convertTimeCorrectFormat(minutes)}:${convertTimeCorrectFormat(seconds)}`;
  } catch(error){
    return '';
  }
}

export const convertTimeCorrectFormat = (time: string): string => {
  if (time.length == 1)
    return '0' + time;
  return time;
}
