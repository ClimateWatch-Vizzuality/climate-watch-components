```js
initialState = { open: false };
const toggleModalOpen = (slug) => {
  setState((state) => {
    return { open: !state.open }
  });
};
const ModalHeader = require('./modal-header.js').default;
const Button = require('../button').default;
<React.Fragment>
  <Button onClick={toggleModalOpen} >
    Open modal with simple header
  </Button>
  <Modal
    isOpen={state.open}
    onRequestClose={toggleModalOpen}
    header={<ModalHeader title="My modal title" />}
  >
    <h2>Your modal content here</h2>
  </Modal>
</React.Fragment>
```

```js
initialState = { open: false, tabSelectedIndex: 0 };
const tabTitles = ['Tab 1', 'Tab 2'];
const toggleModalOpen = (slug) => {
  setState((state) => {
    return { open: !state.open }
  });
};
const handleTabIndexChange = (index) => {
  setState({ tabSelectedIndex: index });
};
const getModalContent = (tabIndex) => {
  return (
    <h2>
      {`Modal content for ${tabTitles[tabIndex]}`}
    </h2>
  );
};

const ModalHeader = require('./modal-header.js').default;
const Button = require('../button').default;
<React.Fragment>
  <Button onClick={toggleModalOpen} >
    Open modal with tabs in the header
  </Button>
  <Modal
    isOpen={state.open}
    onRequestClose={toggleModalOpen}
    header={
      <ModalHeader
        title="My modal title"
        tabTitles={tabTitles}
        tabSelectedIndex={state.tabSelectedIndex}
        handleTabIndexChange={handleTabIndexChange}
      />
    }
  >
    {getModalContent(state.tabSelectedIndex)}
  </Modal>
</React.Fragment>
```
