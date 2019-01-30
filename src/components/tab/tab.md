``` js

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

initialState = {
  selectedIndex: 0
};

const handleTabIndexChange = (index) => setState({ selectedIndex: index });

<React.Fragment>
  <Tab
    options={tabs}
    selectedIndex={state.selectedIndex}
    handleTabIndexChange={handleTabIndexChange}
  />
  <div>
    <h3>Selected tab: {tabs[state.selectedIndex]}</h3>
  </div>
</React.Fragment>
```
