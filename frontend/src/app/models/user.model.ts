export interface Utente{
    id?: number; 
    username: string;
    mail: string,
    ruolo: 'u' | 'o'; // u = utente, o = organizzatore
}

export interface UserLogin{
	username: string,
	password: string
}
