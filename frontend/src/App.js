import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/api/contacts/${editId}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/contacts', formData);
      }
      setFormData({ name: '', phone: '', email: '', address: '' });
      setIsEditing(false);
      setEditId(null);
      fetchContacts();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleEdit = (contact) => {
    setIsEditing(true);
    setEditId(contact.id);
    setFormData(contact);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://localhost:8000/api/contacts/${id}`);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contacts App</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update Contact' : 'Add Contact'}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="border p-4 rounded">
            <h3 className="font-bold">{contact.name}</h3>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p>{contact.address}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(contact)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;