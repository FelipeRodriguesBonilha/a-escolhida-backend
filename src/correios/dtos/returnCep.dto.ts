export interface ReturnCepDto {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ddd: number,
    erro?: boolean
}