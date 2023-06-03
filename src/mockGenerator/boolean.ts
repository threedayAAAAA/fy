import { Logger } from '../util/logger';
import { POSITION } from './const';

/** 默认的概率 */
const DEFAULT_PROBABILITY = 50;

export function boolean(probability: number = DEFAULT_PROBABILITY) {
  probability = parseFloat(probability.toString());
  if (isNaN(probability)) {
    Logger.warn(POSITION, 'probability must be a number, now use default (50)');
    probability = DEFAULT_PROBABILITY;
  }
  if (probability > 100) {
    Logger.warn(POSITION, 'probability should <= 100');
  }
  if (probability < 0) {
    Logger.warn(POSITION, 'probability should > 0');
  }
  return Math.random() < probability / 100;
}

export default {
  boolean,
};
