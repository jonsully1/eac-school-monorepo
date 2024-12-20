export const createISODateTimeString = ({
  days = 0,
  toMysql = false,
  hour = 0,
  min = 0,
} = {}) => {
  const offset = days * 24 * 60 * 60 * 1000;
  const time = [hour, min, 0, 0] as [number, number, number, number];
  const now = new Date();
  const timestamp = new Date(now.getTime() + offset);
  const iso = new Date(timestamp.setHours(...time)).toISOString();
  return !toMysql ? iso : iso.slice(0, 19).replace("T", " ");
};
