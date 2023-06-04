/**
 * 包含基础数据类型
 * 符合特定规则的数据:指定范围内的数字、指定长度的字符串、指定格式的日期
 * 自定义数据类型，生成身份证号码、手机号码和邮箱的数据。
 */

class PrimitiveData {

  public randomString(length = 10): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public randomNumber(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public randomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  public randomEnum(arr: Array<string | number>): string | number {
    return arr[ Math.floor(Math.random() * arr.length)];
  }

  public randomTime(): string {
    const hours = this.randomNumber(0, 23).toString().padStart(2, '0');
    const minutes = this.randomNumber(0, 59).toString().padStart(2, '0');
    const seconds = this.randomNumber(0, 59).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  public randomDate(): Date {
    const year = this.randomNumber(1970, 2023);
    const month = this.randomNumber(0, 11);
    const day = this.randomNumber(1, 31);
    const hours = this.randomNumber(0, 23);
    const minutes = this.randomNumber(0, 59);
    const seconds = this.randomNumber(0, 59);
    return new Date(year, month, day, hours, minutes, seconds);
  }

  public randomIdCard(): string {
    const area = [
    '110000', '120000', '130000', '140000', '150000', '210000', '220000', '230000', '310000', '320000',
    '330000', '340000', '350000', '360000', '370000', '410000', '420000', '430000', '440000', '450000',
    '460000', '500000', '510000', '520000', '530000', '540000', '610000', '620000', '630000', '640000',
    '650000', '710000', '810000', '820000'
    ];
    const year = Math.floor(Math.random() * (2010 - 1950 + 1)) + 1950;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const random = Math.floor(Math.random() * 10000);
    const areaCode = area[Math.floor(Math.random() * area.length)];
    const idCard = `${areaCode}${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${random.toString().padStart(4, '0')}`;
    return idCard;
  }

  public randomPhone(): string {
    const prefix = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '153', '154', '155', '156', '157', '158', '159', '170', '171', '172', '173', '174', '175', '176', '177', '178', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189'];
    const random = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    const phone = `${prefix[Math.floor(Math.random() * prefix.length)]}${random}`;
    return phone;
  }

  public randomEmail(): string {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'qq.com', '163.com', '126.com', 'sina.com', 'sohu.com', 'aliyun.com'];
    const username = Math.random().toString(36).substring(2, 8);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${username}@${domain}`;
    return email;
  }
}

export default PrimitiveData;