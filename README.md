# Tradier Client
Node.js Tradier Brokerage API written in typescript. 

Current Functionality
 * Market Data
 * Fundamentals (Beta use at own risk)

Future Planned Functionality
 * Stream Endpoint
 * OAuth Authentication
 * Account
 * Trading
 * Watchlist

### Tradier
Brokerage Reinvented.

Tradier is a REST-based, open, and secure API for investors, advisors, and traders.

[Tradier Documentation](https://documentation.tradier.com/)

#### Access Token
You will receive your Tradier API Access Token after you create an account.

Depending on what type of account you create will determine the type of access token you will receive.
 * [Sandbox](https://developer.tradier.com/user/sign_up)
 * [Brokerage](https://brokerage.tradier.com/signup)

 Note: Sandbox does not work with every endpoint and may contain delayed information.

## Installation
```
npm i --save @reycodev/tradier-client
```

## Usage
Initialize the client.
```Typescript
import { TradierAccountType, TradierClient, TradierClientOptions } from '@reycodev/tradier-client';

const options: TradierClientOptions = {
  accessToken: '##########' // Token receieved after creating tradier account
  accountType: TradierAccountType.SANDBOX // Depends on type of account created.
}

const tradier: TradierClient = new TradierClient(options);

```
#### Market
Implemented Endpoints:
 * [Get Quotes](https://documentation.tradier.com/brokerage-api/markets/get-quotes)
 * [Get Option Chains](https://documentation.tradier.com/brokerage-api/markets/get-options-chains)
 * [Get Option Strikes](https://documentation.tradier.com/brokerage-api/markets/get-options-strikes)
 * [Get Option Expirations](https://documentation.tradier.com/brokerage-api/markets/get-options-expirations)
 * [Get Historical Quotes](https://documentation.tradier.com/brokerage-api/markets/get-history)
 * [Get Time and Sales](https://documentation.tradier.com/brokerage-api/markets/get-timesales)
 * [Get ETB Securities](https://documentation.tradier.com/brokerage-api/markets/get-etb)
 * [Get Clock](https://documentation.tradier.com/brokerage-api/markets/get-clock)
 * [Get Calendar](https://documentation.tradier.com/brokerage-api/markets/get-calendar)
 * [Get Companies](https://documentation.tradier.com/brokerage-api/markets/get-search)
 * [Get Lookup Symbol](https://documentation.tradier.com/brokerage-api/markets/get-lookup)

Examples:
```Typescript
// Get Quotes
tradier.market.getQuotes(['spy', 'amd'])
  .then((response) => console.log('response', response))
  .catch((error) => console.error(error));
// Get Option Questions
tradier.market.getOptionChains('spy', '2019-05-17')
  .then((response) => console.log('response', response))
  .catch((error) => console.error(error));
```

#### Fundamentals
Implemented Endpoints:
 * [Get Company](https://documentation.tradier.com/brokerage-api/markets/fundamentals/get-company)
 * [Get Corporate Calendars](https://documentation.tradier.com/brokerage-api/markets/fundamentals/get-calendars)
 * [Get Dividends](https://documentation.tradier.com/brokerage-api/markets/fundamentals/get-dividends)
 * [Get Corporate Actions](https://documentation.tradier.com/brokerage-api/markets/fundamentals/get-corporate-actions)
 * [Get Rations](https://documentation.tradier.com/brokerage-api/markets/fundamentals/get-ratios)
 * [Get Financial Reports](https://documentation.tradier.com/brokerage-api/markets/fundamentals/get-financials)
 * [Get Price Statistics](https://documentation.tradier.com/brokerage-api/markets/fundamentals/get-statistics)

Examples:
```Typescript
// Get Company Information
tradier.fundamentals.getCompany(['spy', 'amd'])
  .then((response) => console.log('response', response))
  .catch((error) => console.error(error));
  // Get Corporate Calendars
tradier.fundamentals.getCorporateCalendars(['spy', 'amd'])
  .then((response) => console.log('response', response))
  .catch((error) => console.error(error));
```

## Development
Decisions:
 * Trying to follow Inversion of Control with Dependency Injection (Needs some more refactoring)
 * Went with promises but thought about observables (rxjs) but didn't want to have that dependency. 
   * Observables seem like a viable option because it could help with real time updates. 

Improvements:
 * Add Linting
 * Add Unit Tests
 * Add Typings for responses
 * Add more endpoints for tradier
 * Add bundling process to allow for use on different environments such as browser.

## Miscellaneous
#### NestJs
Planned on creating a Nestjs library using this package.
In the mean time, you can follow this to create your own.

tradier.service.ts
```Typescript
import { Injectable } from '@nestjs/common';
import { TradierClient } from '@reycodev/tradier-client';

@Injectable()
export class TradierService extends TradierClient {}

```

tradier.module.ts
```Typescript
import { Module, Provider } from '@nestjs/common';
import { TradierClient, TradierAccountType, TradierClientOptions } from '@reycodev/tradier-client';

import { TradierService } from './services';

// Recomend not commiting access token
const tradierToken: string = '######' 

// Probably should be its own file.
const tradierServiceFactory: Provider = {
  provide: TradierService,
  useFactory: () => {
    return new TradierClient({
      accessToken: tradierToken,
      accountType: TradierAccountType.SANDBOX,
    });
  }
}

@Module({
  imports: [],
  providers: [
    tradierServiceFactory,
  ],
  exports: [
    TradierService,
  ],
})
export class TradierModule {}

```
