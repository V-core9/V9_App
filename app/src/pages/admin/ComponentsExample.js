
import {
  Accordion,
  NavItem,
  Counter,
  Nav,
  BookNewForm
} from '../../components';

import * as components from '../../components';

const MaybeRenderComponent = ({ name }) => {

  try {
    return (
      <>{components[name]()}</>
    )
  } catch (error) {
    return (
      <>{JSON.stringify(error)}</>
    )
  }

}

export { ComponentsExample };

function ComponentsExample() {

  return (
    <>
      <header>
        <h3>Demo Components</h3>
      </header>
      <Accordion title='Root Accordion Component' startOpen={true} content={
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

      {Object.keys(components).map(component => {
        return (
          <Accordion title={component} content={<MaybeRenderComponent name={component} />} />
        )
      })}
    </>
  )
}
