import { createStore } from 'redux';
import {contactsReducer} from 'redux/contacts/reducer';

export const store = createStore(contactsReducer);

