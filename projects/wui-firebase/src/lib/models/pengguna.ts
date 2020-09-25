import { ObjectHelper } from '../helper/objectHelper';

export class Pengguna {

    uid: string;
    email: string;
    displayName: string;
    photoUrl: string;
    emailVerified: boolean;

    static fromJson(json: any) {
        return ObjectHelper.fromJson(new Pengguna(), json);
    }
    toJson = () => ObjectHelper.toJson(this);

}