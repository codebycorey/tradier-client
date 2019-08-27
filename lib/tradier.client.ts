import { TradierAccountType } from './tradier.models';
import { TradierMarketClient } from './market';
import { TradierConfig } from './tradier-config';

export class TradierClient {

  private readonly tradierConfig: TradierConfig;

  public readonly market: TradierMarketClient;

  public constructor(
      private readonly accessToken: string,
      private readonly accountType: TradierAccountType
  ) {
    this.tradierConfig = new TradierConfig(this.accessToken, this.accountType);

    this.market = new TradierMarketClient(this.tradierConfig);
  }
}
