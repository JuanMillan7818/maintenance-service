
import * as bcrypt from 'bcrypt';

export async function generateToken (): Promise<string> {
    const salt = await bcrypt.genSalt(); 
    const password = 'random_password';
    const hash = await bcrypt.hash(password, salt);
    return 'dd';
}
