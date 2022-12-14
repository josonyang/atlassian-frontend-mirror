/** @jsx jsx */
import { jsx } from '@emotion/react';

export interface UnresolvedTextProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}

export const UnresolvedText = ({ icon, text }: UnresolvedTextProps) => {
  return (
    <span css={{ display: 'flex', alignItems: 'center' }}>
      {icon}
      {text}
    </span>
  );
};
