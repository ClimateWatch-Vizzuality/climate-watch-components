```jsx
const data = require('./data.json');

const defaultColumns = ["name", "definition", "unit", "composite_name", "percentages", "very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long_header_label"];
const ellipsisColumns = ["composite_name"];
const firstColumnHeaders = ["composite_name", "name"];
const narrowColumns = ['unit', 'country', 'Date of LTS submission', 'composite_name', 'percentages', 'stackable', 'definition']
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
  dynamicRowsHeight
  forceAllRowSamples
  titleLinks={data.map(c => [{ columnName: "name", url: c.link.name }])}
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
const narrowColumns = ['country', 'Date of LTS submission', 'composite_name', 'percentages', 'stackable']
const wideColumns = ['Assessment of the impacts of changes in climate on long-lived infrastructure, land-use planning, (Current selection)', 'Co-benefits of mitigation actions for adaptation/resilience and vice versa (Current selection)']
const setColumnWidth = column => {
  if (wideColumns.includes(column)) return 380;
  if (narrowColumns.includes(column)) return 60;
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
    sortBy="country"
    sortASC={false}
  />
</>

```

Table with custom Cell renderer

```jsx
const data = require('./data.json');
const isNaN = require('lodash/isNaN');
const iconDownload = require('../button-group/assets/download.svg').default;
const iconInfo = require('../button-group/assets/info.svg').default;
const defaultColumns = ["name", "percentages"];

<Table
  data={data}
  defaultColumns={defaultColumns}
  customCellRenderer={(cell) => isNaN(parseFloat(cell.cellData)) ? (
    <Icon onClick={() => console.log('NaN clicked')} icon={iconDownload}></Icon>
  ) : (
    <Icon onClick={() => console.log('Number clicked')} icon={iconInfo}></Icon>
  )}
/>
```

Table with total width offset and visible vertical scrollbar

```jsx

const data = require('./data.json');
const tableTheme = require('./altered-table-theme.scss');
const defaultColumns = ["name", "definition", "unit", "composite_name", "percentages", "stackable", "category","link", "subcategory"];

<Table
  data={data}
  tableHeight={250}
  defaultColumns={defaultColumns}
  setColumnWidth={() => 115}
  theme={tableTheme}
  visibleVerticalScrollBar
  tableWidthOffset={-80}
/>
```
