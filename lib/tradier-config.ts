import { AxiosRequestConfig } from 'axios';

import { TradierAccountType } from './models';

interface Headers {
    Authorization: string;
    Accept: string;
}

enum TradierBaseUrl {
    SANDBOX = 'https://sandbox.tradier.com',
    API = 'https://api.tradier.com',
    STREAM = 'https://stream.tradier.com',
}

export class TradierConfig {

    private readonly headers: Headers;

    public constructor(
        private readonly accessToken: string,
        private readonly accountType: TradierAccountType,
    ) {
        this.headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${this.accessToken}`
        };
    }

    public buildUrl(url: string, stream: boolean = false): string {
        if (stream) {
            if (this.accountType === TradierAccountType.SANDBOX) {
                throw new Error('Stream cannot be used with Sandbox Account');
            }
            return `${TradierBaseUrl.SANDBOX}${url}`;
        }

        if (this.accountType === TradierAccountType.API) {
            return `${TradierBaseUrl.API}${url}`;
        }

        return `${TradierBaseUrl.SANDBOX}${url}`;
    }

    public buildBaseConfig(): AxiosRequestConfig {
      return Object.assign({}, {
        headers: this.headers,
      })
    }

    public buildConfigWithParams<T>(params: T): AxiosRequestConfig {
        return Object.assign({}, {
            headers: this.headers,
            params
        })
    }
}
