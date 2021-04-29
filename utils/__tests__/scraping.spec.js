import { scrapeAnnualValue } from '../scraping';

describe('scraping utils', () => {
  describe('scrapeAnnualValue', () => {
    const data = `
      <table class="historical_data_table table">
        <tbody>
          <tr><td>2020</td><td>$65,339</td></tr>
          <tr><td>2019</td><td>$90,488</td></tr>
          <tr><td>2018</td><td>$107,147</td></tr>
          <tr><td>2017</td><td>$134,047</td></tr>
          <tr><td>2016</td><td>$128,249</td></tr>
          <tr><td>2015</td><td>$119,355</td></tr>
          <tr><td>2014</td><td>$111,547</td></tr>
          <tr><td>2013</td><td>$123,549</td></tr>
          <tr><td>2012</td><td>$118,210</td></tr>
          <tr><td>2011</td><td>$76,615</td></tr>
          <tr><td>2010</td><td>$47,791</td></tr>
          <tr><td>2009</td><td>$31,640</td></tr>
          <tr><td>2008</td><td>$22,297</td></tr>
          <tr><td>2007</td><td>$14,532</td></tr>
          <tr><td>2006</td><td>$9,984</td></tr>
          <tr><td>2005</td><td>$7,428</td></tr>
        </tbody>
      </table>
    `;

    it('should return annual value object', () => {
      const expectedAnnualValue = {
        2020: 65339,
        2019: 90488,
        2018: 107147,
        2017: 134047,
        2016: 128249,
        2015: 119355,
        2014: 111547,
        2013: 123549,
        2012: 118210,
        2011: 76615,
      };
      const result = scrapeAnnualValue(data, 10);

      expect(result).toEqual(expectedAnnualValue);
    });
  });
});
