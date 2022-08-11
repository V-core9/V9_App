import {
  Accordion,
  NavItem,
  Counter,
  Nav,
  BookNewForm
} from '../../components';


export { ComponentsExample };

function ComponentsExample() {
  return (
    <>
      <header>
        <h3>Demo Components</h3>
      </header>
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
      <Accordion title='Navigation Component' content={<Nav />} />
      <Accordion title='Counter Component' content={<Counter />} />
      <Accordion title='BookNewForm Component' content={<BookNewForm />} />
    </>
  )
}
