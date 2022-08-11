import { Accordion, NavItem, Counter } from '../../components';


export { ComponentsExample };

function ComponentsExample() {
  return (
    <>
      <Accordion title='Root Accordion Component' content={
        <>
          <Accordion title='Empty Accordion' />
          <Accordion title='Text Content Accordion' content='Demo Content Spaceholder.' />
          <Accordion
            title='NavItems List'
            content={
              <>
                <NavItem text='Demo NavItem' icon='🤦‍♂️' to='#' />
                <NavItem text='Demo NavItem' icon='🤦‍♂️' to='#' />
                <NavItem text='Demo NavItem' icon='🤦‍♂️' to='#' />
              </>
            }
          />
          <Accordion title='Counter Component' content={<Counter />} />
        </>
      } />
    </>
  )
}
