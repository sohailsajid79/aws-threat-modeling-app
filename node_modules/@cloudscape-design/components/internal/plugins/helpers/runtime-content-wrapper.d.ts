/// <reference types="react" />
import { MountContentContext } from '../controllers/drawers';
interface RuntimeContentWrapperProps {
    mountContent: (container: HTMLElement, mountContent: MountContentContext) => void;
    unmountContent: (container: HTMLElement) => void;
    id?: string;
}
export declare function RuntimeContentWrapper({ mountContent, unmountContent, id }: RuntimeContentWrapperProps): JSX.Element;
export {};
//# sourceMappingURL=runtime-content-wrapper.d.ts.map