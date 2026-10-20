import { writeFileSync } from 'fs';

import { buildSpec } from '../openapi/document.js';
writeFileSync('openapi.json', JSON.stringify(buildSpec(), null, 2));
