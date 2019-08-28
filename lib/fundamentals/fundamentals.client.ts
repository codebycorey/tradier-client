
import { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';

import { TradierUtil } from '../tradier-util';

interface TradierFundamentalsEndpoints {
  company: string;
  corporate_calendars: string;
  dividends: string;
  corporate_actions: string;
  ratios: string;
  financial_reports: string;
  price_statistics: string;
}

const endponts: TradierFundamentalsEndpoints = {
  company: '/beta/markets/fundamentals/company',
  corporate_calendars: '/beta/markets/fundamentals/calendars',
  dividends: '/beta/markets/fundamentals/dividends',
  corporate_actions: '/beta/markets/fundamentals/corporate_actions',
  ratios: '/beta/markets/fundamentals/ratios',
  financial_reports: '/beta/markets/fundamentals/financials',
  price_statistics: '/beta/markets/fundamentals/statistics',
}

/**
 * @beta
 */
export class TradierFundamentalsClient {

  public constructor(
    private readonly tradierUtil: TradierUtil,
    private readonly axios: AxiosStatic = axios,
  ) { }

  /**
   * Get company fundamental information.
   * @param symbols Array of symbols
   *
   * @beta This API is presently in Beta.
   * It is only available to Tradier Brokerage account holders and should only be used in production applications with caution.
   */
  public async getCompany(symbols: string[]) {
    const url: string = this.tradierUtil.buildUrl(endponts.company);
    const config: AxiosRequestConfig = this.tradierUtil.buildConfigWithParams({
      symbols: symbols.join(',')
    });

    const response: AxiosResponse = await this.axios.get(url, config);
    return response.data;
  }

  /**
   * Get corporate calendar information for securities. This does not include dividend information.
   * @param symbols Array of symbols
   *
   * @beta This API is presently in Beta.
   * It is only available to Tradier Brokerage account holders and should only be used in production applications with caution.
   */
  public async getCorporateCalendars(symbols: string[]) {
    const url: string = this.tradierUtil.buildUrl(endponts.corporate_calendars);
    const config: AxiosRequestConfig = this.tradierUtil.buildConfigWithParams({
      symbols: symbols.join(',')
    });

    const response: AxiosResponse = await this.axios.get(url, config);
    return response.data;
  }

  /**
   * Get dividend information for a security. This will include previous dividends as well as formally announced future dividend dates.
   * @param symbols Array of symbols
   *
   * @beta This API is presently in Beta.
   * It is only available to Tradier Brokerage account holders and should only be used in production applications with caution.
   */
  public async getDividends(symbols: string[]) {
    const url: string = this.tradierUtil.buildUrl(endponts.dividends);
    const config: AxiosRequestConfig = this.tradierUtil.buildConfigWithParams({
      symbols: symbols.join(',')
    });

    const response: AxiosResponse = await this.axios.get(url, config);
    return response.data;
  }

  /**
   * Retrieve corporate action information. This will include both historical and scheduled future actions.
   * @param symbols Array of symbols
   *
   * @beta This API is presently in Beta.
   * It is only available to Tradier Brokerage account holders and should only be used in production applications with caution.
   */
  public async getCorporateActions(symbols: string[]) {
    const url: string = this.tradierUtil.buildUrl(endponts.corporate_actions);
    const config: AxiosRequestConfig = this.tradierUtil.buildConfigWithParams({
      symbols: symbols.join(',')
    });

    const response: AxiosResponse = await this.axios.get(url, config);
    return response.data;
  }

  /**
   * Get standard financial ratios for a company.
   * @param symbols Array of symbols
   *
   * @beta This API is presently in Beta.
   * It is only available to Tradier Brokerage account holders and should only be used in production applications with caution.
   */
  public async getRatios(symbols: string[]) {
    const url: string = this.tradierUtil.buildUrl(endponts.ratios);
    const config: AxiosRequestConfig = this.tradierUtil.buildConfigWithParams({
      symbols: symbols.join(',')
    });

    const response: AxiosResponse = await this.axios.get(url, config);
    return response.data;
  }

  /**
   * Retrieve corporate financial information and statements.
   * @param symbols Array of symbols
   *
   * @beta This API is presently in Beta.
   * It is only available to Tradier Brokerage account holders and should only be used in production applications with caution.
   */
  public async getFinancialReports(symbols: string[]) {
    const url: string = this.tradierUtil.buildUrl(endponts.financial_reports);
    const config: AxiosRequestConfig = this.tradierUtil.buildConfigWithParams({
      symbols: symbols.join(',')
    });

    const response: AxiosResponse = await this.axios.get(url, config);
    return response.data;
  }

  /**
   * Retrieve price statistic Information.
   * @param symbols Array of symbols
   *
   * @beta This API is presently in Beta.
   * It is only available to Tradier Brokerage account holders and should only be used in production applications with caution.
   */
  public async getPriceStatistics(symbol: string, expiration: string) {
    const url: string = this.tradierUtil.buildUrl(endponts.price_statistics);
    const config: AxiosRequestConfig = this.tradierUtil.buildConfigWithParams({
      symbol,
      expiration
    });

    const response: AxiosResponse = await this.axios.get(url, config);
    return response.data;
  }

}
