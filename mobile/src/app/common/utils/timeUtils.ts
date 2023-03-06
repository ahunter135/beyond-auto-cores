import * as moment from 'moment';

export const toLocalTime = (date: string, format = 'MM/DD/YYYY hh:mm A') =>
  moment.utc(date).local().format(format);
