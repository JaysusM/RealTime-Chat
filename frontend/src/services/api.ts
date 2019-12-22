
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

export const BASE_API_URL: String = "http://localhost:5000";

export const getMessages = () => {
    return (fromFetch(BASE_API_URL + "/messages").pipe(
        switchMap((response: Response) => response.json())
    ))
}