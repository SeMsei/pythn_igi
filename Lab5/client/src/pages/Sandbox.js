import React from 'react';
import ClickHandlerExample from '../components/sandbox/ClickHandlerExample';
import ChangeHandlerExample from '../components/sandbox/ChangeHandlerExample';
import FormSubmissionHandlerExample from '../components/sandbox/FormSubmissionHandlerExample';
import FocusHandlerExample from '../components/sandbox/FocusHandlerExample';
import BlurHandlerExample from '../components/sandbox/BlurHandlerExample';
import MouseOverHandlerExample from '../components/sandbox/MouseOverHandlerExample';
import KeyPressHandlerExample from '../components/sandbox/KeyPressHandlerExample';
import DefaultPropsComponent from '../components/sandbox/DefaultPropsComponent'

function EventHandlersPage() {
  return (
    <div>
      <h1>Event Handlers Examples</h1>

      <ClickHandlerExample />

      <hr />

      <ChangeHandlerExample />

      <hr />

      <FormSubmissionHandlerExample />

      <hr />

      <FocusHandlerExample />

      <hr />

      <BlurHandlerExample />

      <hr />

      <MouseOverHandlerExample />

      <hr />

      <KeyPressHandlerExample />

      <hr/>
      <DefaultPropsComponent text="Привет, мир!" />
      <hr/>
      <DefaultPropsComponent />
    </div>
  );
}

export default EventHandlersPage;
