import { ProductKeys } from './types';

const productKeys: ProductKeys = {
  confluence: {
    newCardExperience: 'confluence.frontend.media.cards.new.experience',
    captions: 'confluence.frontend.fabric.editor.media.captions',
    mediaInline: 'confluence.frontend.fabric.editor.media.inline',
    folderUploads: 'confluence.frontend.media.picker.folder.uploads',
    //TODO fill the value after https://product-fabric.atlassian.net/browse/MEX-1593
    observedWidth: '',
    // TODO https://product-fabric.atlassian.net/browse/MEX-1620
    timestampOnVideo: '',
    memoryCacheLogging: 'confluence-frontend-media-card-memory-cache-logging',
  },
  jira: {
    newCardExperience: 'issue.details.media-cards-new-experience',
    captions: 'issue.details.editor.media.captions',
    // Manged by Linking Platform. No Rollout plan found for Jira
    mediaInline: '',
    folderUploads: 'issue.details.media-picker-folder-upload',
    //TODO fill the value after https://product-fabric.atlassian.net/browse/MEX-1593
    observedWidth: '',
    // TODO https://product-fabric.atlassian.net/browse/MEX-1620
    timestampOnVideo: '',
    memoryCacheLogging: 'jira-frontend-media-card-memory-cache-logging',
  },
};

export const getProductKeys = () => productKeys;
