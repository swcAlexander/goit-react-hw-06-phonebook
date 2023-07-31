import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
   reducers: {
    addContact: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },

      prepare: ({ id, name, number }) => {
        return {
          payload: {
            id,
            name,
            number,
          },
        };
      },
    },

    deleteContact: (state, action) => {
      state.concats = state.contacts.filter(contact => contact.id !== action.payload);
    },
  },
  },
);

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',

  reducers: {
    setContactFilter: (state, action) => action.payload,
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};
const filterReducer = filterSlice.reducer;
const contactReducer = contactsSlice.reducer;

const persistedContactsReducer = persistReducer(persistConfig, contactReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: filterReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export const { setContactFilter } = filterSlice.actions;
export const { addContact, deleteContact } = contactsSlice.actions;
