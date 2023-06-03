import { date } from './date';
import { natural } from './number';

export const PRE_DIXS = [
  '130',
  '131',
  '132',
  '133',
  '134',
  '135',
  '136',
  '137',
  '138',
  '139',
  '150',
  '151',
  '152',
  '153',
  '155',
  '156',
  '157',
  '158',
  '159',
  '186',
  '187',
  '188',
  '189',
];

const CHECK_CODE = '0123456789X';

/**
 * 随机生成手机号码
 * @returns 随机生成的手机号码
 */
export function phoneNumber() {
  const randomPrefix = PRE_DIXS[Math.floor(Math.random() * PRE_DIXS.length)];
  const randomNumber = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0');
  return `${randomPrefix}${randomNumber}`;
}

export function cid() {
  const randomProvinceCode = natural(100000, 999999);
  const randomBirthDate = date('YYYYMMDD');
  const randomSequenceCode = natural(0, 100).toString().padStart(3, '0');
  const idNumberWithoutCheckCode = `${randomProvinceCode}${randomBirthDate}${randomSequenceCode}`;
  const checkCode = CHECK_CODE.charAt(natural(0, CHECK_CODE.length - 1));
  return `${idNumberWithoutCheckCode}${checkCode}`;
}

export default {
  phoneNumber,
  cid,
};
