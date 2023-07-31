import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { deleteContact } from 'redux/store';
import { ContactItem } from 'components/ContactList/ContactsItem/ContactItem';
import style from 'components/ContactList/ContactList.module.css';

export const ContactList = ({ contacts }) => { // Приймаємо контакти через пропс
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));
  if (contacts)
    return (
      <ul className={style.contactList}>
        {filteredContacts.map(contact => (
          <div className={style.contactListContainer} key={contact.id}>
            <ContactItem
              name={contact.name}
              number={contact.number}
              key={contact.id}
            />
            <button type="button" onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    );
};