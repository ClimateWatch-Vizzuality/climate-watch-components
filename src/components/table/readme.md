```jsx
const data = require('./data.json');

const defaultColumns = ["name", "definition", "unit", "composite_name"];
const ellipsisColumns = ["composite_name"];

<Table
  data={data}
  hasColumnSelect
  defaultColumns={defaultColumns}
  ellipsisColumns={ellipsisColumns}
  emptyValueLabel={'Not specified'}
  horizontalScroll
/>
```
