export interface FormItemDigitProps {
    value?: number;
    onChange?: (value: number) => void;
    placeholder?: string;
}

export function FormItemDigit(props: FormItemDigitProps) {
    return (
        <input
            value={props.value}
            placeholder={props.placeholder}
            onChange={e => {
                let value: string | number = e.target.value;
                if (!value.length) {
                    value = 0;
                } else {
                    value = parseFloat(e.target.value);
                }
                props.onChange?.(value);
            }}></input>
    );
}
