
import * as bcrypt from 'bcrypt';

export async function generateKeyApi (): Promise<string> {
    const salt = await bcrypt.genSalt(); 
    const text = generateToken();                       
    return bcrypt.hash(text, salt);;
}

export function generateToken(): string {
    let text: string = 'REF';
    for(let i = 0; i<8; i++) {        
        text += (
            (Math.floor(Math.random() * (61 - 10)) + 10) + 
            String.fromCharCode(Math.floor(Math.random() * (123 - 97)) + 97).toUpperCase());
    }    
    return text;        
}
