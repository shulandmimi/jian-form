export interface FormItemRadioProps {
    value?: number;
    options?: { label: string; value: number }[];
    onChange?: (value: number) => void;
    name?: string;
}

export function FormItemRadio(props: FormItemRadioProps) {
    return (
        <div>
            {props.options?.map(option => (
                <div key={option.value}>
                    <input
                        name={props.name}
                        type='radio'
                        value={'value' in option ? option.value.toString() : undefined}
                        checked={option.value === props.value}
                        onChange={() => props.onChange?.(option.value)}
                    />
                    {option.label}
                </div>
            ))}
        </div>
    );
}
