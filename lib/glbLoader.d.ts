import { GLBOption, GMM } from './types';
declare const GlbLoader: (url: string, options: GLBOption) => Promise<GMM>;
export default GlbLoader;
