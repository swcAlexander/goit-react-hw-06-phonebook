export const addContact = (contact) => ({
  type: 'ADD_CONTACT',
  payload: contact,
});

export const deleteContact = (contactId) => ({
  type: 'DELETE_CONTACT',
  payload: contactId,
});

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter,
});