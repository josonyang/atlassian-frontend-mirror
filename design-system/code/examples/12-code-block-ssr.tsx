/** @jsx jsx */
import { ReactNode } from 'react';

import { jsx } from '@emotion/react';
import ReactDOMServer from 'react-dom/server';

import { token } from '@atlaskit/tokens';

import { CodeBlock } from '../src';

const exampleCodeBlock = `// React component
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  mountNode
);`;

const Layout = (props: { children: ReactNode }) => (
  <div
    css={{
      padding: token('space.100', '8px'),
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: token('space.100', '8px'),
    }}
  >
    {props.children}
  </div>
);

const H2 = (props: { children: ReactNode }) => (
  <h2
    css={{
      marginBottom: token('space.100', '8px'),
    }}
  >
    {props.children}
  </h2>
);

export default function Component() {
  return (
    <Layout>
      <div>
        <H2>SSR</H2>
        <div
          dangerouslySetInnerHTML={{
            __html: ReactDOMServer.renderToString(
              <CodeBlock language="jsx" text={exampleCodeBlock} />,
            ),
          }}
        />
      </div>
      <div>
        <H2>Hydrated</H2>
        <CodeBlock language="jsx" text={exampleCodeBlock} />
      </div>
      <div>
        <H2>SSR</H2>
        <div
          dangerouslySetInnerHTML={{
            __html: ReactDOMServer.renderToString(
              <CodeBlock
                showLineNumbers={false}
                language="jsx"
                text={exampleCodeBlock}
              />,
            ),
          }}
        />
      </div>
      <div>
        <H2>Hydrated</H2>
        <CodeBlock
          showLineNumbers={false}
          language="jsx"
          text={exampleCodeBlock}
        />
      </div>
    </Layout>
  );
}
