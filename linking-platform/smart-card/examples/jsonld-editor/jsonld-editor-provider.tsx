/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useCallback, useMemo } from 'react';
import { JsonLd } from 'json-ld-types';
import { SmartCardProvider } from '@atlaskit/link-provider';
import JsonldEditorClient from './jsonld-editor-client';

const featureFlags = {
  enableFlexibleBlockCard: true,
};

type Props = {
  json?: JsonLd.Response;
  onError?: (error: Error) => void;
  onFetch?: () => JsonLd.Response | undefined;
  onResolve?: (json: JsonLd.Response) => void;
  url: string;
  ari?: string;
  branchDeploy?: string;
};

const JsonldEditorProvider: React.FC<Props> = ({
  children,
  onError,
  onFetch,
  onResolve,
  ari,
  branchDeploy,
}) => {
  // This will cause Provider to rerender which is not a normal use case for
  // smart links. We are hacking it so that we can force using json from
  // jsonld editor.
  const client = useMemo(
    () =>
      new JsonldEditorClient(
        'staging',
        onFetch,
        onResolve,
        onError,
        ari,
        branchDeploy,
      ),
    [ari, branchDeploy, onError, onFetch, onResolve],
  );

  return (
    <SmartCardProvider
      client={client}
      featureFlags={featureFlags}
      isAdminHubAIEnabled={true}
    >
      {children}
    </SmartCardProvider>
  );
};

const withJsonldEditorProvider =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P & Props> =>
  (props) => {
    const { ari, branchDeploy, json, onError, onResolve, url } = props;
    const onFetch = useCallback(() => json, [json]);

    return (
      <JsonldEditorProvider
        onError={onError}
        onFetch={onFetch}
        onResolve={onResolve}
        url={url}
        ari={ari}
        branchDeploy={branchDeploy}
      >
        <Component {...props} />
      </JsonldEditorProvider>
    );
  };

export default withJsonldEditorProvider;
