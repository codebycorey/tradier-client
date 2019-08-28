import axios from 'axios';

import { TradierClientOptions } from './tradier.models';
import { TradierMarketClient } from './market';
import { TradierUtil } from './tradier-util';

export class TradierClient {

  private readonly tradierUtil: TradierUtil;

  public readonly market: TradierMarketClient;

  public constructor(
      private readonly options: TradierClientOptions,
  ) {
    this.tradierUtil = new TradierUtil(this.options);

    this.market = new TradierMarketClient(this.tradierUtil, axios);
  }
}
