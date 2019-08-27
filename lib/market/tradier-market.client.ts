import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TradierHistoryInterval, TradierSessionFilter, TradierTimeSalesInterval } from './tradier-market.models';
import { TradierConfig } from '../tradier-config';

interface TradierMarketEndpoints {
  quotes: string;
  option_chains: string;
  option_strikes: string;
  option_expirations: string;
  historical_quotes: string;
  time_and_sales: string;
  etb_securities: string;
  clock: string;
  calendar: string;
  search_companies: string;
  lookup_symbol: string;
}

const endponts: TradierMarketEndpoints = {
  quotes: '/v1/markets/quotes',
  option_chains: '/v1/markets/options/chains',
  option_strikes: '/v1/markets/options/strikes',
  option_expirations: '/v1/markets/options/expirations',
  historical_quotes: '/v1/markets/history',
  time_and_sales: '/v1/markets/timesales',
  etb_securities: '/v1/markets/etb',
  clock: '/v1/markets/clock',
  calendar: '/v1/markets/calendar',
  search_companies: '/v1/markets/search',
  lookup_symbol: '/v1/markets/lookup',
}

export class TradierMarketClient {

  public constructor(
    private readonly tradierConfig: TradierConfig,
  ) {}

  /**
   * Get a list of symbols using a keyword lookup on the symbols description. Results are in descending order
   * by average volume of the security. This can be used for simple search functions.
   * @param symbols Comma-delimited list of symbols (equity or option)
   */
  public async getQuotes(symbols: string[]) {
    const url: string = this.tradierConfig.buildUrl(endponts.quotes);
    const config: AxiosRequestConfig = this.tradierConfig.buildConfigWithParams({
      symbols: symbols.join(',')
    });

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * Get all quotes in an option chain.
   * @param symbol Underlying symbol of the chain
   * @param expiration Expiration for the chain (format 2019-05-17)
   */
  public async getOptionChains(symbol: string, expiration: string) {
    const url: string = this.tradierConfig.buildUrl(endponts.option_chains);
    const config: AxiosRequestConfig = this.tradierConfig.buildConfigWithParams({
      symbol,
      expiration
    });

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * Get an options strike prices for a specified expiration date.
   * @param symbol Underlying symbol of the chain
   * @param expiration Expiration for the chain (format 2019-05-17)
   */
  public async getOptionStrikes(symbol: string, expiration: string) {
    const url: string = this.tradierConfig.buildUrl(endponts.option_strikes);
    const config: AxiosRequestConfig = this.tradierConfig.buildConfigWithParams({
      symbol,
      expiration
    });

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * Get expiration dates for a particular underlying.
   *
   * Note that some underlying securities use a different symbol for their weekly options (RUT/RUTW, SPX/SPXW).
   * To make sure you see all expirations, make sure to send the includeAllRoots parameter.
   * This will also ensure any unique options due to corporate actions (AAPL1) are returned.
   * @param symbol Underlying symbol of the chain
   * @param includeAllRoots Send expirations related to all option roots
   * @param strikes Add strike prices to each expiration
   */
  public async getOptionExpirations(symbol: string, includeAllRoots: boolean = false, strikes: boolean = false) {
    const url: string = this.tradierConfig.buildUrl(endponts.option_expirations);
    const config: AxiosRequestConfig = this.tradierConfig.buildConfigWithParams({
      symbol,
      includeAllRoots,
      strikes
    });

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * Get historical pricing for a security.
   * This data will usually cover the entire lifetime of the company if sending reasonable start/end times.
   * @param symbol A single security symbol.
   * @param interval Interval of time per timesale. One of: daily, weekly, monthly
   * @param start Start date represented as YYYY-MM-DD
   * @param end End date represented as YYYY-MM-DD
   */
  public async getHistoricalPricing(symbol: string, interval?: TradierHistoryInterval, start?: string, end?: string) {
    const url: string = this.tradierConfig.buildUrl(endponts.historical_quotes);
    const config: AxiosRequestConfig = this.tradierConfig.buildConfigWithParams({
      symbol,
      interval,
      start,
      end
    });

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * Time and Sales (timesales) is typically used for charting purposes. It captures pricing across a time slice at predefined intervals.
   *
   * Tick data is also available through this endpoint.
   * This results in a very large data set for high-volume symbols, so the time slice needs to be much smaller to keep downloads time reasonable.
   * @param symbol A single security symbol.
   * @param interval Interval of time per timesale. One of: tick, 1min, 5min, 15min
   * @param start Start date/time for timesales range represented as YYYY-MM-DD HH:MM
   * @param end End date/time for timesales range represented as YYYY-MM-DD HH:MM
   * @param session_filter Specify to retrieve all data points, or data points during market hours. One of: all, open.
   */
  public async getTimeAndSales(
    symbol: string, interval?: TradierTimeSalesInterval, start?: string, end?: string, session_filter?: TradierSessionFilter,
  ) {
    const url: string = this.tradierConfig.buildUrl(endponts.time_and_sales);
    const config: AxiosRequestConfig = this.tradierConfig.buildConfigWithParams({
      symbol,
      interval,
      start,
      end,
      session_filter
    });

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * The ETB list contains securities that are able to be sold short with a Tradier Brokerage account.
   * The list is quite comprehensive and can result in a long download response time.
   */
  public async getETBSecurities() {
    const url: string = this.tradierConfig.buildUrl(endponts.etb_securities);
    const config: AxiosRequestConfig = this.tradierConfig.buildBaseConfig();

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * Get the intraday market status. This call will change and return information pertaining to the current day.
   * If programming logic on whether the market is open/closed – this API call should be used to determine the current state.
   */
  public async getClock() {
    const url: string = this.tradierConfig.buildUrl(endponts.clock);
    const config: AxiosRequestConfig = this.tradierConfig.buildBaseConfig();

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * Get a list of symbols using a keyword lookup on the symbols description.
   * Results are in descending order by average volume of the security. This can be used for simple search functions.
   * @param q Search query
   * @param indexes Whether to include indexes in the results
   */
  public async searchForCompanies(q: string, indexes?: boolean) {
    const url: string = this.tradierConfig.buildUrl(endponts.search_companies);
    const config: AxiosRequestConfig = this.tradierConfig.buildConfigWithParams({
      q,
      indexes,
    });

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  /**
   * Search for a symbol using the ticker symbol or partial symbol.
   * Results are in descending order by average volume of the security.
   * This can be used for simple search functions.
   * @param q Search query
   * @param exchanges Which exchanges to include in lookup
   * @param types Which security types to include in lookup
   */
  public async searchForSymbols(q: string, exchanges: string[] = [], types?: string) {
    const url: string = this.tradierConfig.buildUrl(endponts.lookup_symbol);
    const config: AxiosRequestConfig = this.tradierConfig.buildConfigWithParams({
      q,
      exchanges: exchanges.join(','),
      types
    });

    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

}
