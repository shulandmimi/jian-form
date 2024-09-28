import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../hooks';

export interface FormItemWatchProps {
    paths: string[];
    children: (values: unknown[]) => JSX.Element;
}

export function FormItemWatch(props: FormItemWatchProps) {
    const store = useStore();

    const [values, setValues] = useState(() => props.paths.map(path => store.get(path)));

    useEffect(() => {
        const disposes = props.paths.map((path, index) =>
            store.onChange(path, v => {
                setValues([...values.slice(0, index), v.value, ...values.slice(index + 1)]);
            })
        );
        return () => {
            disposes.forEach(dispose => dispose());
        };
    }, props.paths ?? []);

    const children = useMemo(() => props.children(values), values);

    return <>{children}</>;
}
