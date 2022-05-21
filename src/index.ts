import axios, { AxiosResponse } from "axios";

export class MicroPay {
    private _axios

    constructor({ url = 'https://micropay-bot.herokuapp.com/', apiToken }: { url?: string, apiToken: string }) {
        this._axios = axios.create({
            baseURL: url,
            headers: {
                'x-api-token': apiToken
            }
        });
    }

    async getConfig(): Promise<AxiosResponse<{
        id: string,
        currency: string
        currencyBefore?: boolean
    }>> {
        return await this._axios.get('/config');
    }

    async editConfig(config: {
        currency?: string
        currencyBefore?: boolean
    }): Promise<AxiosResponse<{
        success: true
    }>> {
        return await this._axios.post('/config', config);
    }

    async isIn(id: string): Promise<AxiosResponse<boolean>> {
        return await this._axios.get(`/is-in/${id}`);
    }

    async manageMoney(ofId: string, amount: number): Promise<AxiosResponse<{
        success: true
    }>> {
        return await this._axios.post(`/${ofId}/money`, { amount });
    }
}