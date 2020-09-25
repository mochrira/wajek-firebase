import { ObjectHelper } from '../helper/objectHelper';

export class Akses {

    id: number;
    uid: string;
    idLembaga: number;
    tipe: string;
    idUndangan: number;
    isDefault: boolean;

    static fromJson = (json: any) => ObjectHelper.fromJson(new Akses(), json);
    toJson = () => ObjectHelper.toJson(this);

}