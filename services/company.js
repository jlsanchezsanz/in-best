import axios from 'axios';

import { getCompaniesUrl } from '../utils/urls';

export default class CompanyService {
  static async getCompanies() {
    const { data } = await axios.get(getCompaniesUrl());

    return data;
  }
}
