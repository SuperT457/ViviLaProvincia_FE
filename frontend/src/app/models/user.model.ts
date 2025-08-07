export interface Utente{
    id?: number; 
    username: string;
    password?: string;
    mail: string,
    ruolo: string
}

export interface UserLogin{
	username: string,
	password: string
}
