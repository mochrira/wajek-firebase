import { ObjectHelper, dateFromString } from '../helper/objectHelper';

export class Lembaga {

    idLembaga: number;
    nmLembaga: string;
    alamat: string;
    kota: string;
    photoUrl: string;

    private _tglRegistrasi: Date;
    set tglRegistrasi(value: string) { this._tglRegistrasi = dateFromString(value); }
    get tglRegitrasi() { return this._tglRegistrasi; }

    static fromJson(json: any){
        return ObjectHelper.fromJson(new Lembaga(), json);
    };
    toJson = () => ObjectHelper.toJson(this);

}