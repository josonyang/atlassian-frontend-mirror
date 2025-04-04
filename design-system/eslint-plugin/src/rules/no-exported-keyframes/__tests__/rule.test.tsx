import { tester } from '../../__tests__/utils/_tester';
import rule from '../index';

const indent = (level: number) => ' '.repeat(level * 2);

const keyframes = [
	() => 'keyframes``',
	() => 'keyframes({})',
	(level: number) =>
		[
			'keyframes`',
			indent(level + 1) + 'from { opacity: 1 }',
			indent(level + 1) + 'to   { opacity: 0 }',
			indent(level) + '`',
		].join('\n'),
	(level: number) =>
		[
			'keyframes({',
			indent(level + 1) + 'from: { opacity: 1 },',
			indent(level + 1) + 'to:   { opacity: 0 }',
			indent(level) + '})',
		].join('\n'),
];

const level = 5;

const createTestCases = (importSource: string) => [
	...keyframes.flatMap((createKeyframe) => [
		{
			code: `
          import { keyframes } from '${importSource}';

          ${createKeyframe(level)};
        `,
			errors: [],
		},

		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          export const Component = () => (
            <div
              css={{
                animationName: ${createKeyframe(level + 3)}
              }}
            />
          );
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animationName = ${createKeyframe(level)};

          export const Component = () => (
            <div css={{ animationName }} />
          );
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          export default () => (
            <div
              css={{
                animationName: ${createKeyframe(level + 3)}
              }}
            />
          );
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animationName = ${createKeyframe(level)};

          export default () => (
            <div css={{ animationName }} />
          );
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          export const animation = ${createKeyframe(level)};
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          export const keyframe = animation;
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          export const animations = {
            animation: ${createKeyframe(level + 1)},
          };
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          export const animations = {
            animation,
          };
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animations = {
            animation: ${createKeyframe(level + 1)},
          };

          export const keyframe = animations.animation;
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          const animations = {
            animation,
          };

          export const keyframe = animations.animation;
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animations = {
            animation: ${createKeyframe(level + 1)},
            foo: '',
          };

          export const keyframe = animations.foo;
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          const animations = {
            animation,
            foo: '',
          };

          export const keyframe = animations.foo;
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          export { animation };
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          export const animations = [animation];
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			// Note: Array indices are not inspected
			code: `
          import { keyframes } from '${importSource}';

          const animations = [${createKeyframe(level)}];

          export const animation = animations[0];
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animations = {
            animation: ${createKeyframe(level + 1)},
          };

          export { animations };
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          const animations = {
            animation,
          };

          export { animations };
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animations = {
            animation: ${createKeyframe(level + 1)},
          };

          const animation = animations.animation;

          export { animation };
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animations = {
            animation: ${createKeyframe(level + 1)},
            foo: '',
          };

          const animation = animations.foo;

          export { animation };
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          export default ${createKeyframe(level)};
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          export default animation;
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animations = {
            animation: ${createKeyframe(level + 1)},
          };

          export default animations;
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          const animations = {
            animation,
          };

          export default animations;
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animations = {
            animation: ${createKeyframe(level + 1)},
          };

          export default animations.animation;
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          const animations = {
            animation,
          };

          export default animations.animation;
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animations = {
            animation: ${createKeyframe(level + 1)},
            foo: '',
          };

          export default animations.foo;
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          const animations = {
            animation,
            foo: '',
          };

          export default animations.foo;
        `,
			errors: [],
		},
		{
			code: `
          import { keyframes } from '${importSource}';

          const animation = ${createKeyframe(level)};

          export default [animation];
        `,
			errors: [{ messageId: 'unexpected' }],
		},
		{
			// Note: Array indices are not inspected
			code: `
          import { keyframes } from '${importSource}';

          const animations = [${createKeyframe(level)}];

          export default animations[0];
        `,
			errors: [],
		},
		{
			// name: 'should not parse package imports not defined in importSources',
			code: `
          import { keyframes } from '@emotion/react';

          const animation = ${createKeyframe(level)};

          export { animation };
        `,
			options: [{ importSources: ['my-package'] }],
			errors: [],
		},
		{
			// name: 'should not parse unrelated package imports when importSources not defined',
			code: `
          import { keyframes } from 'my-package';

          const animation = ${createKeyframe(level)};

          export { animation };
        `,
			errors: [],
		},
		{
			// name: 'should include package imports defined in importSources',
			code: `
          import { keyframes } from '@emotion/react';

          const animation = ${createKeyframe(level)};

          export { animation };
        `,
			options: [{ importSources: ['@emotion/react'] }],
			errors: [{ messageId: 'unexpected' }],
		},
	]),
	{
		// name: 'should also fail for renamed imports',
		code: `
	  import { keyframes as keyframes2 } from '${importSource}';

	  export const animation = keyframes2\`\`;
	`,
		errors: [{ messageId: 'unexpected' }],
	},
];

tester.run('no-exported-keyframes', rule, {
	valid: createTestCases('@compiled/react').filter(({ errors }) => !errors.length),
	invalid: createTestCases('@compiled/react').filter(({ errors }) => errors.length),
});
