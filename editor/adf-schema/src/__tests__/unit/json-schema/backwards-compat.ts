import { exec } from 'child_process';
import { validateSchemaCompatibility } from 'json-schema-diff-validator';
import newSchema from '../../../../json-schema/v1/full.json';

// TODO: remove this when jest unit tests are supported for TS files
declare var expect: any;

const RED_START = '\u001b[31m';
const RED_END = '\u001b[39m';
const BOLD_START = '\u001b[1m';
const BOLD_END = '\u001b[22m';
const IMPORTANT_MESSAGE_START = `${RED_START}${BOLD_START}`;
const IMPORTANT_MESSAGE_END = `${BOLD_END}${RED_END}`;

function fetchLastPublishedJSONSchema(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      `git show origin/master:packages/editor/adf-schema/json-schema/v1/full.json`,
      { maxBuffer: 512000 },
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr);
        }
        resolve(JSON.parse(stdout));
      },
    );
  });
}

expect.extend({
  toBeBackwardsCompatibleWith(
    received: any,
    argument: any,
    definitionsToSkip: string[] = [],
  ) {
    try {
      definitionsToSkip.forEach((definition) => {
        received.definitions[definition] = argument.definitions[definition];
      });

      validateSchemaCompatibility(argument, received, {
        allowNewOneOf: true,
        allowNewEnumValue: true,
        allowReorder: true,
      });

      return {
        pass: true,
      };
    } catch (ex: any) {
      return {
        message: () => ex.message,
        pass: false,
      };
    }
  },
});

describe('JSON schema', () => {
  it('should be backwards compatible', async () => {
    const existingSchema = await fetchLastPublishedJSONSchema();
    try {
      // TODO: Remove this orderedList_node skip after ADF schema changes merge to master
      // (See: https://product-fabric.atlassian.net/browse/ED-15903)
      const definitionsToSkip = ['orderedList_node'];
      expect(newSchema).toBeBackwardsCompatibleWith(
        existingSchema,
        definitionsToSkip,
      );
    } catch (ex: any) {
      throw new Error(
        'JSON schema backwards compatibility test failed. ' +
          `${IMPORTANT_MESSAGE_START}Have you tried rebasing your current branch against target branch?${IMPORTANT_MESSAGE_END}\n` +
          ex.message,
      );
    }
  });
});
