/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Component } from 'react';
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import EditorFileIcon from '@atlaskit/icon/glyph/editor/file';
import { getExtensionLozengeData } from '@atlaskit/editor-common/utils';
import {
  placeholderFallback,
  placeholderFallbackParams,
  styledImage,
} from './styles';

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export interface Props {
  node: PmNode;
}

interface LozengeData {
  url: string;
  height?: number;
  width?: number;
}

export const ICON_SIZE = 24;

export default class ExtensionLozenge extends Component<Props, any> {
  render() {
    const { node } = this.props;

    const imageData = getExtensionLozengeData({ node, type: 'image' });
    if (imageData && node.type.name !== 'extension') {
      return this.renderImage(imageData);
    }

    const iconData = getExtensionLozengeData({ node, type: 'icon' });
    return this.renderFallback(iconData);
  }

  private renderImage(lozengeData: LozengeData) {
    const { extensionKey } = this.props.node.attrs;
    const { url, ...rest } = lozengeData;
    return <img css={styledImage} src={url} {...rest} alt={extensionKey} />;
  }

  private renderFallback(lozengeData?: LozengeData) {
    const { parameters, extensionKey } = this.props.node.attrs;
    const { name } = this.props.node.type;
    const params = parameters && parameters.macroParams;
    const title =
      (parameters && parameters.extensionTitle) ||
      (parameters &&
        parameters.macroMetadata &&
        parameters.macroMetadata.title) ||
      extensionKey;
    const isBlockExtension = name === 'extension';
    return (
      <div data-testid="lozenge-fallback" css={placeholderFallback}>
        {lozengeData && !isBlockExtension ? (
          this.renderImage({
            height: ICON_SIZE,
            width: ICON_SIZE,
            ...lozengeData,
          })
        ) : (
          <EditorFileIcon label={title} />
        )}
        <span className="extension-title">{capitalizeFirstLetter(title)}</span>
        {params && !isBlockExtension && (
          <span css={placeholderFallbackParams}>
            {Object.keys(params).map(
              (key) => key && ` | ${key} = ${params[key].value}`,
            )}
          </span>
        )}
      </div>
    );
  }
}
