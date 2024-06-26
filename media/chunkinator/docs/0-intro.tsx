import React from 'react';
import { md, code, Example, AtlassianInternalWarning } from '@atlaskit/docs';
import { createRxjsNotice, createMediaUseOnlyNotice } from '@atlaskit/media-common/docs';

export default md`
${createMediaUseOnlyNotice('Chunkinator', [
	{ name: 'Media Picker', link: '/packages/media/media-picker' },
])}

  ${(<AtlassianInternalWarning />)}

  ${createRxjsNotice('Chunkinator')}

  Upload large files from the browser with ease

  ## Usage

  ${code`
    import {chunkinator} from '@atlaskit/chunkinator';
    import {Subject} from "rxjs";
    import {takeUntil} from "rxjs/operators";

    const cancelSubject = new Subject<void>();

    const chunkinatorObservable = chunkinator(
      blob,
      {
        hashingConcurrency: 5,
        chunkSize: 10000,
        uploadingConcurrency: 3,
        uploadingFunction,
        processingBatchSize,
        processingFunction: createProcessingFunction(deferredUploadId),
      },
      {
        onProgress(progress) {
          console.log({progress})
        },
      },
    );

    await chunkinatorObservable.pipe(takeUntil(cancelSubject)).toPromise();
  `}

  ${(
		<Example
			Component={require('../examples/1-integrator').default}
			title="Chunkinator"
			source={require('!!raw-loader!../examples/1-integrator')}
		/>
	)}
`;
