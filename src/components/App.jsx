import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { addContact, deleteContact } from 'redux/store';
import style from 'components/Apx.module.css';

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const handleFormSubmit = (contact) => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    const newContact = { id: nanoid(), ...contact };
    dispatch(addContact(newContact));
  };

  const handleContactDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <Container>
      <div className={style.container}>
        <ContactForm onSubmit={handleFormSubmit} />
        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          <Filter />
        ) : (
          alert('Your phonebook is empty. Add first contact!')
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={contacts} // Передаємо контакти у ContactList
            removeContact={handleContactDelete}
          />
        )}
      </div>
    </Container>
  );
};

export default App;