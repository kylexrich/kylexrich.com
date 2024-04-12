import { ContentType } from './ContentType';

export interface ServiceResponse<T> {
    data: T;
    contentType: ContentType | string;
}
