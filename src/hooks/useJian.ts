import { FormEngineStore } from '../core';
import { useStore } from './store';

export interface JianInstance<V> {
    getValues(): V;
    [PrivateComponent]: PrivateContent;
}

export interface JianOptions<V> {
    instance?: JianInstance<V>;
    store?: FormEngineStore;
}

export interface PrivateContent {
    store: FormEngineStore;
}

export const PrivateComponent = Symbol('privateComponent');

export function useJian<V>(options?: JianOptions<V>): JianInstance<V> {
    const content = options?.instance?.[PrivateComponent];
    const store = useStore(content?.store);

    return {
        [PrivateComponent]: {
            store,
        },
        getValues() {
            return store.getData() as V;
        },
    };
}
