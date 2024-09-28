import { FormBlockComp } from '../components/Block';
import { JianInstance } from '../hooks';
import { PrivateComponent, useJian } from '../hooks/useJian';
import { IFormBlock } from '../schema/interface';
import { StoreContext } from './store';

export interface FormEngineProps<T = any> {
    block?: IFormBlock;
    children?: React.ReactNode;
    instance?: JianInstance<T>;
}

export function FormEngine(props: FormEngineProps) {
    const instance = useJian({ instance: props.instance });
    const content = instance[PrivateComponent];

    const children = props.children ? props.children : props.block ? <FormBlockComp block={props.block}></FormBlockComp> : null;

    return <StoreContext.Provider value={content.store}>{children}</StoreContext.Provider>;
}
