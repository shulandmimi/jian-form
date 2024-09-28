import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../core/store';
import React from 'react';
import { ChangeEvent } from '../core/interface';
import { FormPath } from '../schema/interface';

export interface FormItemProps {
    paths: FormPath;
    children: React.ReactNode;
    label?: string;
    colon?: boolean;
    initialValue?: unknown;
}

export function FormItem(props: FormItemProps) {
    const store = useContext(StoreContext);

    const [value, setValue] = useState(() => ('initialValue' in props ? props.initialValue : store.get(props.paths)));
    const colon = props.colon ?? true;

    useEffect(() => {
        return store.onChange(props.paths, (value: ChangeEvent) => {
            if (value !== store.get(props.paths)) {
                setValue(value.value);
            }
        });
    }, []);

    const children =
        React.isValidElement(props.children) &&
        React.Children.map(props.children, child => {
            return React.cloneElement(child, {
                // @ts-ignore
                value,
                // @ts-ignore
                onChange: value => {
                    store.set(props.paths, value);
                },
                name: props.paths,
            });
        });

    return (
        <div>
            {props.label ? (
                <div>
                    {props.label}
                    {colon ? ':' : null}
                </div>
            ) : null}
            <div>{children}</div>
        </div>
    );
}
