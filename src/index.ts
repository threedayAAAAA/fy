import mockGenerator from './mockGenerator/index';
import { generateData } from './codeGenerator/index';

const Mock = {
  Mock: generateData,
  Random: mockGenerator,
};

export default Mock;
