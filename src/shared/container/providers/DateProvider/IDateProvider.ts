export interface IDateProvider {
    compareInHours(startDate: Date, endDate: Date): number;
    compareInDays(startDate: Date, endDate: Date): number;
    convertToUTC(originalDate: Date): string;
    dateNow(): Date;
}
