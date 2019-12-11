```jsx
const data = require('./data.json');

const defaultColumns = ["name", "definition", "unit", "composite_name", "percentages", "very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long_header_label"];
const ellipsisColumns = ["composite_name"];
const firstColumnHeaders = ["composite_name", "name"];
const narrowColumns = ['definition']
const setColumnWidth = column => {
  if (narrowColumns.includes(column)) return 180;
  return 230
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
const data = require('./second-table-data.json');
const newData = require('./second-table-data-2.json');
const tableTheme = require('./table-theme.scss');
const defaultColumns = ['country', 'Co-benefits of mitigation actions for adaptation/resilience and vice versa (Current selection)', 'Long-term Strategy Document', 'Date of LTS submission'];
const isEqual = require('lodash/isEqual');

initialState = {
  defaultColumns,
  data
}

const ellipsisColumns = ['composite_name'];
const firstColumnHeaders = ['composite_name', 'name'];
const narrowColumns = ['country', 'Date of LTS submission']
const wideColumns = ['Assessment of the impacts of changes in climate on long-lived infrastructure, land-use planning, (Current selection)', 'Co-benefits of mitigation actions for adaptation/resilience and vice versa (Current selection)']
const setColumnWidth = column => {
  if (wideColumns.includes(column)) return 380;
  if (narrowColumns.includes(column)) return 100;
  return 300
}

const toggleDefaultColumns = () => {
  const newDefaultColumns = ['country', 'Assessment of the impacts of changes in climate on long-lived infrastructure, land-use planning, (Current selection)', 'Long-term Strategy Document', 'Date of LTS submission'];

  if (isEqual(state.defaultColumns, defaultColumns)) {
    setState({ defaultColumns: newDefaultColumns })
    setState({ data: newData })
  } else {
    setState({ defaultColumns, data })
  }
}

<>
  <button onClick={toggleDefaultColumns}>
    Change default columns and data
  </button>
  <Table
    data={state.data}
    horizontalScroll
    parseHtml
    defaultColumns={state.defaultColumns}
    dynamicRowsHeight
    setColumnWidth={setColumnWidth}
    theme={tableTheme}
  />
</>
```
