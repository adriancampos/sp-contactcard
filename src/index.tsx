import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContactCard } from './components/ContactCard/ContactCard';

const webparts: NodeListOf<Element> = document.getElementsByClassName('webpart-contactcard');
for (let i: number = 0; i < webparts.length; i++) {
    // Get the data property from the Element
    const accountid: string = webparts[i].getAttribute('data-accountid').toString();

    ReactDOM.render(
        <ContactCard accountid={accountid} />,
        webparts[i]
    );
}
