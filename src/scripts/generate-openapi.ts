import { writeFileSync } from 'fs';

import { buildOpenApiDocument, buildOpenApiYaml } from '../openapi/document.ts';

writeFileSync('openapi.json', JSON.stringify(buildOpenApiDocument(), null, 2));
writeFileSync('openapi.yaml', buildOpenApiYaml());
