// Generated by https://quicktype.io
//* REGISTER PERSON
export interface RegisterPerson {
    names:              string;
    lastnames:          string;
    institutional_mail: string;
    password:           string;
    code:               string;
    role_id:            string;
    document_id:        string;
}

//* GET ALL PERSONS
export interface GetAllPersonsInterface {
    status:    number;
    statusMsg: string;
    data:      Persons[];
}

export interface Persons {
    id:                 string;
    created_at:         string;
    updated_at:         string;
    institutional_mail: string;
    names:              string;
    lastnames:          string;
    code:               string;
    num_document:       string;
    img:                null;
    active:             boolean;
    document_type:      DocumentType;
    role:               DocumentType;
}

export interface DocumentType {
    name: string;
}
