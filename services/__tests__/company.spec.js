import axios from 'axios';
import { getCompaniesUrl } from '../../utils/urls';

import CompanyService from '../company';

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

describe('CompanyService', () => {
  describe('getCompanies', () => {
    it('should return a list of companies', async () => {
      const data = [
        { n: 'AAPL - Apple', s: 'AAPL/apple' },
        { n: 'MSFT - Microsoft', s: 'MSFT/microsoft' },
        { n: 'AMZN - Amazon', s: 'AMZN/amazon' },
      ];
      axios.get.mockResolvedValueOnce({ data });

      const companies = await CompanyService.getCompanies();

      expect(companies).toEqual(data);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(getCompaniesUrl());
    });

    it('should catch error', async () => {
      const error = new Error('some error');
      axios.get.mockRejectedValueOnce(error);

      await expect(CompanyService.getCompanies()).rejects.toThrow(error);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(getCompaniesUrl());
    });
  });
});
