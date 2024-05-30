import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { ReturnCepDto } from './dtos/returnCep.dto';



@Injectable()
export class CorreiosService {
    URL_CEP_CORREIOS = process.env.URL_CEP_CORREIOS;

    constructor(private readonly httpService: HttpService) {}

    async getByCep(cep: string): Promise<ReturnCepDto> {
        const returnCep: ReturnCepDto = await this.httpService.axiosRef.get<ReturnCepDto>(this.URL_CEP_CORREIOS.replace('{CEP}', cep)).
        then((result) => {
            if(result.data.erro === true){
                throw new NotFoundException('CEP não encontrado!');
            }
            return result.data;
        }).
        catch((error: AxiosError) => {
            throw new BadRequestException(`Erro na conexão ${error}`);
        });

        return returnCep;
    }
}

