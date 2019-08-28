interface TradierAuthentication {
    get_auth_code: string;
    create_access_token: string;
    refresh_access_token: string;
}

interface TradierAccount {
    balance: string;
    positions: string;
    history: string;
    grain_loss: string;
    orders: string;
    individual_order: string;
}

interface TradierStreaming {
    create_session: string;
    quotes: string;
}

interface TradierEndpoints {
    authentication: TradierAuthentication;
    account: TradierAccount;
    streaming: TradierStreaming;
}

enum TradierEndpointTypes {
    AUTHENTICATION = 'authentication',
    ACCOUNT = 'account',
    MARKET = 'market',
    FUNDAMENTALS = 'fundamentals',
    STREAMING = 'streaming',
}

const endpoints: TradierEndpoints = {
    [TradierEndpointTypes.AUTHENTICATION]: {
        get_auth_code: '/v1/oauth/authorize?client_id={clientId}&scope={scopes}&state={state}',
        create_access_token: '/v1/oauth/accesstoken',
        refresh_access_token: '/v1/oauth/refreshtoken',
    },
    [TradierEndpointTypes.ACCOUNT]: {
        balance: '/v1/accounts/{account_id}/balances',
        positions: '/v1/accounts/{account_id}/positions',
        history: '/v1/accounts/{account_id}/history',
        grain_loss: '/v1/accounts/{account_id}/gainloss',
        orders: '/v1/accounts/{account_id}/orders',
        individual_order: '/v1/accounts/{account_id}/orders/{id}',
    },
    [TradierEndpointTypes.STREAMING]: {
        create_session: '/v1/markets/events/session',
        quotes: '/v1/markets/events',
    }
}

export enum TradierAccountType {
  SANDBOX = 'sandbox',
  BROKERAGE = 'brokerage',
}

export interface TradierClientOptions {
  accessToken: string;
  accountType: TradierAccountType;
}
