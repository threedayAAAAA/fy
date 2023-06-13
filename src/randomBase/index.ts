import randomBoolean from './boolean';
import randomCustom from './custom';
import randomString from './string';
import randomDate from './date';
import randomNumber from './number';

export default {
    ...randomBoolean,
    ...randomCustom,
    ...randomString,
    ...randomDate,
    ...randomNumber
}