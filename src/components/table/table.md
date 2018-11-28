```jsx
const data = require('./data.json');

const defaultColumns = ["name", "description_description_description_description_description_description_description_description_description_description_description_description_description", "unit", "composite_name"];
const ellipsisColumns = ["composite_name"];

<Table
  data={data}
  headerHeight={42}
  hasColumnSelect
  // setColumnWidth={() => 150}
  defaultColumns={defaultColumns}
  ellipsisColumns={ellipsisColumns}
  emptyValueLabel={'Not specified'}
  horizontalScroll
  dynamicRowsHeight={true}
  titleLinks={data.map(c => [{columnName: "link", url: "self", label: "View more"}])}
  hiddenColumnHeaderLabels={['link']}
/>
```
