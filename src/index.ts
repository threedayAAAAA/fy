export * from './mockGenerator/boolean';
export * from './mockGenerator/common';
export * from './mockGenerator/number';
export * from './mockGenerator/string';
export * from './mockGenerator/date';

import { DataGenerator } from './dataGenerator/index';

const Mock = new DataGenerator();

export default Mock;
