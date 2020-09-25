import { ObjectHelper, dateFromString } from "../helper/ObjectHelper";

export class Undangan {

    id: string;
    phoneNumber: string;
    email: string;
    idLembaga: number;
    akses: string;
    status: string;

    private _iat: Date;
    set iat(value: any) { this._iat = dateFromString(value); }
    get iat() { return this._iat; }

    private _uat: Date;
    set uat(value: any) { this._uat = dateFromString(value); }
    get uat() { return this._uat; }

    static fromJson = (json: any) => ObjectHelper.fromJson(new Undangan(), json);
    toJson = () => ObjectHelper.toJson(this);

}