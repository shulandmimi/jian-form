export interface FormItemMetadata {
    visible: 'visible' | 'hidden' | undefined;
}

export interface ChangeEvent<T = unknown> {
    paths: string[];
    fullPath: string;
    value: T;
}
