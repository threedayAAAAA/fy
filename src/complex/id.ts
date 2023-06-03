/**
* 生成随机生成身份证号码
* @returns 一个随机生成身份证号码
*/

export const id = (): string => {
    const area = [
        '110000', '120000', '130000', '140000', '150000', '210000', '220000', '230000', '310000', '320000',
        '330000', '340000', '350000', '360000', '370000', '410000', '420000', '430000', '440000', '450000',
        '460000', '500000', '510000', '520000', '530000', '540000', '610000', '620000', '630000', '640000',
        '650000', '710000', '810000', '820000',
      ];
      const areaCode = area[Math.floor(Math.random() * area.length)];
      const year = Math.floor(Math.random() * 100) + 1900;
      const month = Math.floor(Math.random() * 12) + 1;
      const day = Math.floor(Math.random() * 28) + 1;
      const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const id = `${areaCode}${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${sequence}`;
      const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let sum = 0;
      for (let i = 0; i < id.length; i++) {
        sum += parseInt(id[i]) * weights[i];
      }
      const checkCode = checkCodes[sum % 11];
      return `${id}${checkCode}`;
}