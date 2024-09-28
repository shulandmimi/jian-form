export interface FormItemTextProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export function FormItemText(props: FormItemTextProps) {
    return (
        <input
            placeholder={props.placeholder}
            value={'value' in props ? props.value ?? '' : undefined}
            onChange={e => props.onChange?.(e.target.value)}
        />
    );
}
