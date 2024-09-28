import { FormEngine, FormItem, FormItemRadio, FormItemText, useJian, FormItemWatch } from 'jian-form';

export default function App() {
    const instance = useJian<Record<string, unknown>>();
    return (
        <div>
            <FormEngine instance={instance}>
                <FormItem label='name' paths='name'>
                    <FormItemText placeholder='please input your name' />
                </FormItem>
                <FormItem label='age' paths='age'>
                    <FormItemText placeholder='please input your age' />
                </FormItem>
                <FormItem label='sex' paths='sex'>
                    <FormItemRadio
                        options={[
                            {
                                label: '男',
                                value: 1,
                            },
                            {
                                label: '女',
                                value: 0,
                            },
                        ]}></FormItemRadio>
                </FormItem>
                <FormItemWatch paths={['sex']}>
                    {([sex]) => {
                        return (
                            <div>
                                {(() => {
                                    switch (sex) {
                                        case 1: {
                                            return (
                                                <FormItem paths='isPlayGame' label='是否玩游戏'>
                                                    <FormItemRadio
                                                        options={[
                                                            {
                                                                label: '是',
                                                                value: 1,
                                                            },
                                                            {
                                                                label: '否',
                                                                value: 0,
                                                            },
                                                        ]}
                                                    />
                                                </FormItem>
                                            );
                                        }
                                        default: {
                                            return null;
                                        }
                                    }
                                })()}
                            </div>
                        );
                    }}
                </FormItemWatch>
            </FormEngine>
            <button
                onClick={() => {
                    console.log(instance.getValues());
                }}>
                获取数据
            </button>
        </div>
    );
}
