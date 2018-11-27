```jsx
const data = require('./data.json');

const defaultColumns = ["name", "definition_UPCASE_lowcase", "unit", "composite_name"];
const ellipsisColumns = ["composite_name"];

<Table
  data={data}
  hasColumnSelect
  defaultColumns={defaultColumns}
  ellipsisColumns={ellipsisColumns}
  emptyValueLabel={'Not specified'}
  horizontalScroll
  dynamicRowsHeight={true}
  titleLinks={data.map(c => [{columnName: "link", url: "self", label: "View more"}])}
  hiddenColumnHeaderLabels={['link']}
/>
```
