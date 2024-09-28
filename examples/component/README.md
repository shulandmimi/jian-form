# jian-form

usage jian-form component mode

```tsx
const instance = useJian();

return (
  <>
    <FormEngine instance={instance}>
      <FormItem label="name" paths="name">
        <FormItemText placeholder="please input your name" />
      </FormItem>
      <FormItemWatch paths={["sex"]}>
        {([sex]) => {
          return (
            <div>
              {(() => {
                switch (sex) {
                  case 0: {
                    return 0;
                  }
                  case 1: {
                    return 1;
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
  </>
);
```
