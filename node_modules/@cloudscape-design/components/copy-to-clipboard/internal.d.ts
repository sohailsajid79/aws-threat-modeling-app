/// <reference types="react" />
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { CopyToClipboardProps } from './interfaces';
export interface InternalCopyToClipboardProps extends CopyToClipboardProps, InternalBaseComponentProps {
}
export default function InternalCopyToClipboard({ variant, copyButtonAriaLabel, copyButtonText, copySuccessText, copyErrorText, textToCopy, popoverRenderWithPortal, __internalRootRef, ...restProps }: InternalCopyToClipboardProps): JSX.Element;
//# sourceMappingURL=internal.d.ts.map