import { ContactsList } from '../features/contact/ContactsList';
import { fetchService } from './api/fetchService';
import { useEffect } from 'react';

export const ContactsPage = () => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null) 

useEffect(() => {
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await fetchService('/contacts');
      if (error) {
        setError(error);
      } else {
        setContacts(data || []);
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  fetchContacts();
}, []);

const handleSearch = async () => {
  setLoading(true);
  setError(null);

  try {
    const { data, error } = await fetchService(`/contacts?search=${encodeURIComponent(search)}`);
    if (error) {
      setError(error);
    } else {
      setContacts(data || []);
    }
  } catch {
    setError('Something went wrong.');
  } finally {
    setLoading(false);
  }
};

return (
  <>
    <h1>My contacts list</h1>

    {/* Champ de recherche */}
    <div style={{ marginBottom: '16px' }}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search contacts..."
        style={{ padding: '8px', width: '200px', marginRight: '8px' }}
      />
      <button 
        onClick={handleSearch}
        style={{
          padding: '8px 16px',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
    </div>

    {/* Affichage */}
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    <ContactsList contacts={contacts} />
  </>
);
};
