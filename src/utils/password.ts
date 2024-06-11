import { compare, hash } from "bcrypt";

export const createPasswordHashed = async (password: string): Promise<string> => {
    const saltOrRounds = 10;

    return hash(password, saltOrRounds);
}

export const validatePassword = async (password: string, passwordHashed: string): Promise<Boolean> => {
    try {
        const match = await compare(password, passwordHashed);
        return match;
    } catch (error) {
        console.error('Erro ao comparar senhas');
        return false;
    }
}