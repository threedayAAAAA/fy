/**
 * 常用方法
 * @returns 
 */

export default function commonFn() {
    const genNatural = (min: number | string = 1, max: number | string = 10) => {
        return Math.round(Math.random() * (Number(max) - Number(min))) + Number(min);
    }

    const genWord = (min?: number, max?: number) => {
        // 常用字
        const DICT_HANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞'

        let len: number | undefined = 1;

        if (min && max) {
            len = genNatural(Number(min), max)
        } else if (min) {
            len = min
        } else {
            len = 1
        }

        let result = ''
        for (let i = 0; i < len; i++) {
            result += DICT_HANZI.charAt(genNatural(0, DICT_HANZI.length - 1))
        }
        return result
    }

    const genInt = (min: number, max: number) => {
        return Math.round(Math.random() * (max - min)) + min
    }

    const genEmail = () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        let email = "";
        for (let i = 0; i < 10; i++) {
            if (i === 0) {
            email += alphabet[Math.floor(Math.random() * alphabet.length)];
            } else if (i === 9) {
            email += "@example.com";
            } else {
            const randomChar = Math.random() < 0.5 ? alphabet : numbers;
            email += randomChar[Math.floor(Math.random() * randomChar.length)];
            }
        }
        return email;
    }

    const genUuId = () => {
        // 随机生成一个省份代码
        let provinceCode: number | string = Math.floor(Math.random() * 31 + 1);
        if (provinceCode < 10) {
            provinceCode = `0${provinceCode}`;
        }
        // 随机生成一个出生日期
        let year: number | string  = Math.floor(Math.random() * 100 + 1920);
        let month: number | string = Math.floor(Math.random() * 12 + 1);
        if (month < 10) {
            month = `0${month}`;
        }
        let day: number | string = Math.floor(Math.random() * 28 + 1);
        if (day < 10) {
            day = `0${day}`;
        }
        // 随机生成一个顺序码
        let orderCode: number | string = Math.floor(Math.random() * 999 + 1);
        if (orderCode < 10) {
            orderCode = `00${orderCode}`;
        } else if (orderCode < 100) {
            orderCode = `0${orderCode}`;
        }
        // 计算校验码
        let idNumber: number | string = `${provinceCode}${year}${month}${day}${orderCode}`;
        let checkCode: number | string = Math.floor(Math.random() * 10 + 1);

        if (checkCode == 10) {
            checkCode = "X";
        }
       
        // 返回生成的身份证号
        return `${idNumber}${checkCode}`;
    }

    return {
        genNatural,
        genWord,
        genInt,
        genEmail,
        genUuId
    }
}