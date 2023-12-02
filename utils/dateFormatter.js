import moment from "moment";

export const dateFormatter = (
  data,
  format = 'DD/MM/YYYY',
  parseFormat = 'YYYY-MM-DD'
) => {
  const date = moment(data, parseFormat).format(format);

  return date !== 'Invalid date' ? date : '-';
};