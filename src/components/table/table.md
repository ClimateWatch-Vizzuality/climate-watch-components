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

Table with theme

```jsx
const data = require('./data.json');
const tableTheme = require('./table-theme.scss');

const defaultColumns = ["name", "definition", "very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long_header_label", "unit", "composite_name"];

initialState = {
  defaultColumns
}

const ellipsisColumns = ["composite_name"];
const firstColumnHeaders = ["composite_name", "name"];
const narrowColumns = ['definition']
const setColumnWidth = column => {
  if (narrowColumns.includes(column)) return 100;
  return null
}

const toggleDefaultColumns = () => {
  const newDefaultColumns = ["name", "definition", "unit", "percentages"];
  if (state.defaultColumns.length === defaultColumns.length) {
    setState({ defaultColumns: newDefaultColumns })
  } else {
    setState({ defaultColumns })
  }
}

<>
  <button onClick={toggleDefaultColumns}>
    Change default columns
  </button>
  <Table
    data={data}
    hasColumnSelect
    defaultColumns={state.defaultColumns}
    ellipsisColumns={ellipsisColumns}
    firstColumnHeaders={firstColumnHeaders}
    emptyValueLabel={'Not specified'}
    horizontalScroll
    parseMarkdown
    dynamicRowsHeight={true}
    titleLinks={data.map(c => [{columnName: "link", url: "self", label: "View more"}])}
    hiddenColumnHeaderLabels={['link']}
    setColumnWidth={setColumnWidth}
    theme={tableTheme}
  />
</>
```

