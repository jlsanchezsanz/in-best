import { scrapRevenue } from '../scrapping';

describe('Scrapping utils', () => {
  describe('scrapRevenue', () => {
    const data = `
    <table class="historical_data_table table">
      <tbody>
        <tr><td>2020</td><td>$274,515</td></tr>
        <tr><td>2019</td><td>$260,174</td></tr>
        <tr><td>2018</td><td>$265,595</td></tr>
        <tr><td>2017</td><td>$229,234</td></tr>
        <tr><td>2016</td><td>$215,639</td></tr>
        <tr><td>2015</td><td>$233,715</td></tr>
        <tr><td>2014</td><td>$182,795</td></tr>
        <tr><td>2013</td><td>$170,910</td></tr>
        <tr><td>2012</td><td>$156,508</td></tr>
        <tr><td>2011</td><td>$108,249</td></tr>
        <tr><td>2010</td><td>$65,225</td></tr>
      </tbody>
    </table>
  `;

    it('should return revenue object', () => {
      const expectedRevenue = {
        2011: 108249,
        2012: 156508,
        2013: 170910,
        2014: 182795,
        2015: 233715,
        2016: 215639,
        2017: 229234,
        2018: 265595,
        2019: 260174,
        2020: 274515,
      };
      const result = scrapRevenue(data, 10);

      expect(result).toEqual(expectedRevenue);
    });
  });
});
