
import {
    apply,
    array,
    bool,
    constant,
    number,
    oneOf,
    templateObject,
    string,
    date,
    phone,
    idCard,
    email } from  './lib/index.js';
export { randomBool, randomChar, randomNumber, randomString } from './lib/random/index.js';
export { Mocker } from './mocker.js';
export { randomEmail } from './lib/email.js';
export { randomIdCard} from './lib/idCard.js';
export { randomPhone } from './lib/phone.js';
export { randomDate } from './lib/date.js';
export const M = { apply, array, bool, constant, number, oneOf, templateObject, string, date, phone, idCard, email };

// const m = M.array(M.templateObject({
//   id: M.number(100, 1000000),     	
//   name: M.string(6),                	
//   sex: M.oneOf(['male', 'female']),                    
//   city: M.constant('shenzhen'),          
//   work: M.oneOf(['DESC', 'ASC']),
//   date: M.date('YYYY-MM-DD hh:mm:ss'),
//   bool: M.bool(0.7),
//   phone: M.phone(),
//   idCard: M.idCard(),
//   email: M.email()
// }), 5);                               

// console.log(m.mock());

// const test = () => M.array(M.bool(1), 5)

// const randomTest = () => {
//     return M.apply(test);
// }



// console.log(randomTest().mock().mock())

// const m = M.array(M.templateObject({
//   id: M.number(100, 1000000),     	
//   name: M.string(6),                	
//   sex: M.oneOf(['male', 'female']),                    
//   city: M.constant('shenzhen'),          
//   work: M.oneOf(['DESC', 'ASC']),
//   date: M.date('YYYY-MM-DD hh:mm:ss'),
//   bool: M.bool(0.7),
//   phone: M.phone(),
//   idCard: M.idCard(),
//   email: M.email(),
//   uuid: randomUuid(),
// }), 2);  

// console.log(m.mock());
// console.log(M.array(M.string()).mock())
// console.log(M.templateObject({name: M.string()}).mock())