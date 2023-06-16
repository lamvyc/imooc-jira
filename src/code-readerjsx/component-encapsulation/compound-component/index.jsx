import React, { createContext, useContext } from 'react';

const TabsContext = createContext();

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onSelectTab = (index) => {
    setActiveIndex(index);
  };

  return (
    <TabsContext.Provider value={{ activeIndex, onSelectTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  const { activeIndex, onSelectTab } = useContext(TabsContext);

  return (
    <div className="tab-list">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          active: index === activeIndex,
          onSelect: () => onSelectTab(index)
        });
      })}
    </div>
  );
}

function Tab({ children, active, onSelect }) {
  return (
    <div className={`tab ${active ? 'active' : ''}`} onClick={onSelect}>
      {children}
    </div>
  );
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext);

  return <div className="tab-panels">{children[activeIndex]}</div>;
}

function TabPanel({ children }) {
  return <div className="tab-panel">{children}</div>;
}

function CompoundComponent() {
  return (
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default CompoundComponent;