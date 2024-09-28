import { ExprValueType, FormEngine, FormType, IFormBlock, OpType, useJian } from 'jian-form';

const block: IFormBlock = {
    type: FormType.Block,
    id: 'basis',
    properties: {
        name: {
            type: FormType.Text,
            label: '姓名',
            componentProps: {
                placeholder: '请输入姓名',
            },
        },
        age: {
            type: FormType.Digit,
            label: '年龄',
            componentProps: {
                placeholder: '请输入年龄',
            },
        },
        sex: {
            type: FormType.Radio,
            label: '性别',
            componentProps: {
                options: [
                    {
                        label: '男',
                        value: 1,
                    },
                    {
                        label: '女',
                        value: 0,
                    },
                ],
                placeholder: '请选择性别',
            },
        },
        'basis-switch': {
            type: FormType.Switch,
            cases: [
                {
                    case: {
                        type: OpType.Eq,
                        left: {
                            type: ExprValueType.Constant,
                            v: 1,
                        },
                        right: {
                            type: ExprValueType.Path,
                            path: '.sex',
                        },
                    },
                    block: {
                        type: FormType.Block,
                        id: 'manInformation',
                        properties: {
                            isPlayGame: {
                                label: '是否玩游戏',
                                type: FormType.Radio,
                                componentProps: {
                                    options: [
                                        {
                                            label: '是',
                                            value: 1,
                                        },
                                        {
                                            label: '否',
                                            value: 0,
                                        },
                                    ],
                                    placeholder: '请选择是否玩游戏',
                                },
                            },
                        },
                    },
                },
            ],
        },
    },
};

export default function App() {
    const instance = useJian();

    return (
        <div>
            <FormEngine instance={instance} block={block}></FormEngine>
            <button
                onClick={() => {
                    console.log(instance.getValues());
                }}>
                获取数据
            </button>
        </div>
    );
}
