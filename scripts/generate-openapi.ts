import { writeFileSync } from 'fs';

import { buildSpec } from '../src/openapi/document.js';
writeFileSync('openapi.json', JSON.stringify(buildSpec(), null, 2));
