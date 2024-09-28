import { FormItemTextProps } from '../components';
import { FormItemDigitProps } from '../components/Digit';
import { FormItemRadioProps } from '../components/Radio';
import { ExprValueType, FormType, OpType } from './constant';

export interface FormItemBasis {
    type: string;
    visible?: 'visible' | 'hidden' | undefined;
    componentProps?: Record<string, unknown>;
    label?: string;
    colon?: boolean;
    [key: string]: unknown;
}

export interface IFormBlock {
    type: FormType.Block;
    id: string;
    withPath?: boolean;
    properties: Record<string, IFormItem>;
}

export interface IFormText extends FormItemBasis {
    type: FormType.Text;
    componentProps?: Partial<FormItemTextProps> & Record<string, unknown>;
}

export interface IFormDigit extends FormItemBasis {
    type: FormType.Digit;
    componentProps?: Partial<FormItemDigitProps> & Record<string, unknown>;
}
export interface IFormRadio extends FormItemBasis {
    type: FormType.Radio;
    componentProps?: Partial<FormItemRadioProps> & Record<string, unknown>;
}

export type IFormItem = IFormText | IFormDigit | IFormRadio | IFormSwitch | IFormBlock;

export type FormPath = string;

export type ExprConstantValue = {
    type: ExprValueType.Constant;
    v: unknown;
};

export type ExprPathValue = {
    type: ExprValueType.Path;
    path: FormPath;
};

export type ExprValue = ExprConstantValue | ExprPathValue;

export interface _OP<T extends OpType> {
    type: T;
}

export type FormEq = _OP<OpType.Eq> & TwoExpr;

export interface TwoExpr {
    left: ExprValue;
    right: ExprValue;
}

export type Op = FormEq;

export interface IFormSwitch {
    type: FormType.Switch;
    cases: {
        case: Op;
        block: IFormBlock;
    }[];
}
