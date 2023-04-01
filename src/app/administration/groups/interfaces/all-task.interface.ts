// Generated by https://quicktype.io

export interface AllTaskInterface {
    status:    number;
    statusMsg: string;
    data:      TaskData;
}

export interface TaskData {
    name:   string;
    active: boolean;
    task:   TaskInterface[];
}

export interface TaskInterface {
    id:           string;
    created_at:   string;
    updated_at:   string;
    name:         string;
    description:  string;
    expired_date: string;
    active:       boolean;
}
