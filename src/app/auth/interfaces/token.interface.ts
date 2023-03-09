export interface ResponseToken {
    status:    number;
    statusMsg: string;
    data:      DataToken;
}

export interface DataToken {
    accessToken: string;
    email:       string;
    role:        string
}