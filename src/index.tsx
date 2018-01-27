import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContactCard } from './components/ContactCard/ContactCard';

const webparts: NodeListOf<Element> = document.getElementsByClassName('webpart-contactcard');
for (let i: number = 0; i < webparts.length; i++) {
    // Get the data properties from the Element
    const accountid: string = webparts[i].getAttribute('data-accountid');
    const accountname: string = webparts[i].getAttribute('data-accountname');

    ReactDOM.render(
        <ContactCard accountid={accountid} accountname={accountname} />,
        webparts[i]
    );
}
