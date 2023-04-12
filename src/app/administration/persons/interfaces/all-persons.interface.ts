/* 👌 */

export interface GetAllPersonsInterface {
    status:    number;
    statusMsg: string;
    data:      PersonsInterface[];
}

export interface PersonsInterface {
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
    role:               RoleType;
}

export interface DocumentType {
    name: string;
}

export interface RoleType {
    name: string;
}