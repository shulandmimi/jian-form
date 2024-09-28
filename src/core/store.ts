import { createContext } from 'react';
import { EventEmitter } from '../util/event';
import { parsePaths, setPaths } from '../util/paths';
import { ChangeEvent, FormItemMetadata } from './interface';
import jsonpath from 'jsonpath';

export const StoreContext = createContext<FormEngineStore>(undefined as any);

export class FormEngineStore {
    events = new EventEmitter();

    data: Record<string, unknown> = {};

    metadata: Record<string, FormItemMetadata> = {};

    set(key: string, value: unknown) {
        const paths = parsePaths(key);

        setPaths(this.data, paths, value);

        const changeData: ChangeEvent = {
            paths,
            fullPath: key,
            value,
        };

        this.events.emit(`change:${paths.join('.')}`, changeData);
    }

    get(key?: string) {
        if (!key) {
            return this.data;
        }
        return this.data[key];
    }

    getByJsonPathStartRoot(key: string) {
        return jsonpath.query(this.data, `$${key}`)?.[0];
    }

    getData() {
        return this.data;
    }

    onChange<T>(key: string, cb: (arg: ChangeEvent<T>) => void) {
        const paths = parsePaths(key);
        return this.events.on(`change:${paths.join('.')}`, cb);
    }
}
