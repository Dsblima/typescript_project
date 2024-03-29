import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
    compareInHours(startDate: Date, endDate: Date): number {
        const endDateUTCFormat = this.convertToUTC(endDate);
        const startDateUTCFormat = this.convertToUTC(startDate);

        return dayjs(endDateUTCFormat).diff(startDateUTCFormat, 'hours');
    }

    convertToUTC(originalDate: Date): string {
        return dayjs(originalDate).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }
}
