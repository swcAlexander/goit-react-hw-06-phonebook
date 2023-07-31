import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { addContact, deleteContact, setFilter } from 'redux/contacts/actions';
import style from 'components/Apx.module.css';

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
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

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <div className={style.container}>
        <ContactForm onSubmit={handleFormSubmit} />
        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          <Filter value={filter} onChangeFilter={handleFilterChange} />
        ) : (
          alert('Your phonebook is empty. Add first contact!')
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            removeContact={handleContactDelete}
          />
        )}
      </div>
    </Container>
  );
};

export default App;