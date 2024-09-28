import { useContext } from 'react';
import { FormEngineStore, StoreContext } from '../core/store';

export function useStore(store?: FormEngineStore) {
    return store ?? useContext(StoreContext) ?? new FormEngineStore();
}
