import { useEffect, useReducer } from 'react';
import { FormBlockComp } from './Block';
import { ExprConstantValue, ExprPathValue, ExprValue, IFormBlock, Op } from '../schema/interface';
import { ExprValueType, OpType } from '../schema/constant';
import { useStore } from '../hooks/store';

export interface FormItemSwitchProps {
    cases: {
        case: Op;
        block: IFormBlock;
    }[];

    paths?: string;
}

export function FormItemSwitch(props: FormItemSwitchProps) {
    const store = useStore();
    const [, rerender] = useReducer(() => ({}), {});
    function tryGetValueFromExpr(expr: ExprPathValue) {
        return store.getByJsonPathStartRoot(expr.path);
    }

    function tryGetValueFromConstant(expr: ExprConstantValue) {
        return expr.v;
    }

    function getValueFromExpr(expr: ExprValue) {
        if (expr.type === ExprValueType.Path) {
            return tryGetValueFromExpr(expr);
        } else {
            return tryGetValueFromConstant(expr);
        }
    }

    const val = props.cases.find(item => {
        return getValueFromExpr(item.case.left) === getValueFromExpr(item.case.right);
    });

    useEffect(() => {
        const watchPaths: string[] = props.cases
            .map(item => {
                const result = [];
                function getWatchPathsFromExpr(expr: ExprValue) {
                    switch (expr.type) {
                        case ExprValueType.Path: {
                            return [expr.path];
                        }
                    }

                    return [];
                }

                switch (item.case.type) {
                    case OpType.Eq: {
                        const left = item.case.left;
                        const right = item.case.right;

                        result.push(getWatchPathsFromExpr(left));

                        result.push(getWatchPathsFromExpr(right));
                    }
                }

                return result;
            })
            .flat(1000);

        const dispose = watchPaths.map((path: string) =>
            store.onChange(path, () => {
                rerender();
            })
        );
        return () => {
            dispose.forEach(fn => fn());
        };
    }, [props.cases]);

    return <div>{val ? <FormBlockComp paths={props.paths} key={val.block.id} block={val.block} /> : null}</div>;
}
