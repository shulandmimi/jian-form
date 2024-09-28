import { useEffect, useMemo } from 'react';
import { joinPaths } from '../util/paths';
import { FormItem } from './Item';
import { FormItemText } from './Text';
import { FormItemDigit } from './Digit';
import { FormItemRadio } from './Radio';
import { FormItemSwitch } from './Switch';
import { FormType } from '../schema/constant';
import { FormPath, IFormBlock, IFormItem } from '../schema/interface';
import { useStore } from '../hooks/store';

export interface FormBlockCompProps {
    block: IFormBlock;
    paths?: FormPath;
}

export function FormBlockComp(props: FormBlockCompProps) {
    const store = useStore();
    const properties = useMemo(() => Object.entries(props.block.properties), [props.block.properties]);

    const shouldWithPath = joinPaths(props.paths, props.block.withPath ? props.block.id : undefined) || undefined;

    function renderFormItem(key: string, item: IFormItem) {
        const childPath = joinPaths(shouldWithPath, key);

        // @ts-ignore
        let _props = () => {
            let v: any;
            // @ts-ignore
            return (() => v || (v = ['label', 'colon', 'visible'].reduce((res, key) => ({ ...res, [key]: item[key] }), {})))();
        };

        switch (item.type) {
            case FormType.Text:
                return (
                    <FormItem {..._props()} paths={childPath}>
                        <FormItemText {...item.componentProps} />
                    </FormItem>
                );
            case FormType.Digit:
                return (
                    <FormItem {..._props()} paths={childPath}>
                        <FormItemDigit {...item.componentProps} />
                    </FormItem>
                );
            case FormType.Radio:
                return (
                    <FormItem {..._props()} paths={childPath}>
                        <FormItemRadio {...item.componentProps} name={joinPaths(shouldWithPath, key)} />
                    </FormItem>
                );
            case FormType.Switch:
                return <FormItemSwitch cases={Array.isArray(item.cases) ? item.cases : []} />;
            case FormType.Block:
                return <FormBlockComp paths={shouldWithPath} block={item}></FormBlockComp>;
        }
    }

    useEffect(() => {
        if (props.block.withPath && shouldWithPath) {
            store.set(shouldWithPath, {});
        }
    }, []);

    return properties.map(([key, value]) => {
        return <div key={key}>{renderFormItem(key, value)}</div>;
    });
}
