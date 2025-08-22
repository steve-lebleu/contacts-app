import { ContactsList } from '../features/contact/ContactsList';

export const ContactsPage = () => {
  const handleAddContact = () => {
    window.location.href = '/contacts/add'; 
  };

  return (
    <>
      <h1>My contacts list</h1>

      <button 
        onClick={handleAddContact} 
        style={{
          padding: '8px 16px',
          marginBottom: '16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add Contact
      </button>

      <ContactsList />
    </>
  );
};
