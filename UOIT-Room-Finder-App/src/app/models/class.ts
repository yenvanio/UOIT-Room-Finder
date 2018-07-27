import {Moment} from 'moment';

export class Class {
    room: String;
    building: String;
    type: String;
    location: Number[];
    start_time: Moment;
    end_time: Moment;
    day: String;
    start_date: Moment;
    end_date: Moment;
    classes: Class[];
    isLab: boolean;
    time: String;
}
