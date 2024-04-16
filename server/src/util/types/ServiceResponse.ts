import {ContentType} from './ContentType.js';


export interface ServiceResponse<T> {
    data: T;
    contentType: ContentType | string;
}
