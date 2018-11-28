```jsx
const data = require('./data.json');

const defaultColumns = ["name", "here it is really really really really really long label definition_UPPERCASE_lowercase and something funny at the end of that", "unit", "composite_name"];
const ellipsisColumns = ["composite_name"];

<Table
  data={data}
  headerHeight={42}
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
