```jsx
const data = require('./data.json');

const defaultColumns = ["name", "definition", "unit", "composite_name", "percentages", "very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long_header_label"];
const ellipsisColumns = ["composite_name"];
const firstColumnHeaders = ["composite_name", "name"];
const narrowColumns = ['definition']
const setColumnWidth = column => {
  if (narrowColumns.includes(column)) return 100;
  return null
}

<Table
  data={data}
  hasColumnSelect
  defaultColumns={defaultColumns}
  ellipsisColumns={ellipsisColumns}
  firstColumnHeaders={firstColumnHeaders}
  emptyValueLabel={'Not specified'}
  horizontalScroll
  parseMarkdown
  dynamicRowsHeight={true}
  titleLinks={data.map(c => [{columnName: "link", url: "self", label: "View more"}])}
  hiddenColumnHeaderLabels={['link']}
  setColumnWidth={setColumnWidth}
/>
```
