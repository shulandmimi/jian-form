# jian-form

support `json` & `code` render mode

## support components

### FormItem

wrap basis component, it's will inject `onChange`, `value`, `name` fields for children

```tsx
<FormItem label="name" paths="name">
  <FormItemText placeholder="hello world" />
</FormItem>
```

### FormItemWatch

support for branch rendering for code mode

```tsx
<FormItemWatch paths={["sex"]}>
  {([sex]) => {
    return (
      <div>
        {(() => {
          switch (sex) {
            case 1: {
              return (
                <FormItem paths="isPlayGame" label="是否玩游戏">
                  <FormItemRadio
                    options={[
                      {
                        label: "是",
                        value: 1,
                      },
                      {
                        label: "否",
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
```

### FormItemSwitch

inner component for json schema render

### basis component

- [x] FormItemText, input text
- [x] FormItemDigit, input number
- [x] FormItemRadio, radio
- [ ] ...
