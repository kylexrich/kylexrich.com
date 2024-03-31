import { ContentType } from './ContentType';

export interface ServiceResponse {
    data: any;
    contentType: ContentType | string;
}
