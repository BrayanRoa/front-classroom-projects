// Generated by https://quicktype.io

export interface OneGroupInterface {
    status:    number;
    statusMsg: string;
    data:      Data;
}

export interface Data {
    id:         string;
    created_at: string;
    updated_at: string;
    name:       string;
    active:     boolean;
    template:   null;
    subject:    Subject;
}

export interface Subject {
    name: string;
    code: string;
}