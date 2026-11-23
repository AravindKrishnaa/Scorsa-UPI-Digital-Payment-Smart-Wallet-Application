import React, { useState } from 'react';
import '../styles/Contacts.css';

const defaultContacts = [
  { id: 1, name: 'Aisha', upi: 'aisha@upi', phone: '+91 98765 43210', avatar: 'A' },
  { id: 2, name: 'Rahul', upi: 'rahul@upi', phone: '+91 99887 76654', avatar: 'R' },
  { id: 3, name: 'Meera', upi: 'meera@upi', phone: '+91 98123 45678', avatar: 'M' },
  { id: 4, name: 'Daniel', upi: 'daniel@upi', phone: '+91 90909 80808', avatar: 'D' },
  { id: 5, name: 'Priya', upi: 'priya@upi', phone: '+91 97345 88990', avatar: 'P' },
  { id: 6, name: 'Karan', upi: 'karan@upi', phone: '+91 91555 22330', avatar: 'K' }
];

function Contacts({ onBack }) {
  const [contacts, setContacts] = useState(defaultContacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [permissionMessage, setPermissionMessage] = useState('');
  const [permissionDecision, setPermissionDecision] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', upi: '' });

  const requestDeviceContacts = async () => {
    const contactAPI = navigator.contacts || window.ContactPicker;

    if (!contactAPI || typeof contactAPI.select !== 'function') {
      setPermissionMessage('This browser does not support reading saved contacts. You can add a contact manually.');
      return;
    }

    try {
      const selected = await contactAPI.select(['name', 'tel'], { multiple: true });

      if (selected && selected.length > 0) {
        const importedContacts = selected.map((contact, index) => {
          const name = contact.name || `Contact ${index + 1}`;
          const phone = Array.isArray(contact.tel) ? contact.tel[0]?.value || '' : contact.tel?.value || '';
          const upi = phone ? `${name.toLowerCase().replace(/\s+/g, '')}@upi` : `contact${index + 1}@upi`;

          return {
            id: Date.now() + index,
            name,
            upi,
            phone,
            avatar: name.charAt(0).toUpperCase()
          };
        });

        setContacts((prev) => [...importedContacts, ...prev]);
        setPermissionMessage('Device contacts imported successfully.');
      } else {
        setPermissionMessage('Permission was not granted. You can add contacts manually.');
      }
    } catch (error) {
      setPermissionMessage('Permission denied. You can still add contacts manually.');
    }
  };

  const handlePermission = async (allowed) => {
    setPermissionDecision(allowed ? 'allow' : 'no');

    if (allowed) {
      await requestDeviceContacts();
    } else {
      setPermissionMessage('You can still add contacts manually.');
    }
  };

  const handleAddContact = () => {
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const upi = formData.upi.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@upi`;

    if (!name || !phone) {
      setPermissionMessage('Please enter a contact name and phone number.');
      return;
    }

    setContacts((prev) => [
      {
        id: Date.now(),
        name,
        upi,
        phone,
        avatar: name.charAt(0).toUpperCase()
      },
      ...prev
    ]);

    setFormData({ name: '', phone: '', upi: '' });
    setShowAddForm(false);
    setPermissionMessage('Contact added successfully.');
  };

  return (
    <div className="contacts-page">
      <div className="contacts-panel">
        <div className="contacts-header">
          <button type="button" className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <h2>Contacts</h2>
          <button type="button" className="add-contact-btn" onClick={() => setShowAddForm((prev) => !prev)}>
            {showAddForm ? 'Close' : 'Add Contact'}
          </button>
        </div>

        {permissionDecision === null && (
          <div className="contact-permission-box">
            <p>Allow access to your device contacts?</p>
            <div className="permission-actions">
              <button type="button" className="allow-btn" onClick={() => handlePermission(true)}>
                Allow
              </button>
              <button type="button" className="no-btn" onClick={() => handlePermission(false)}>
                No
              </button>
            </div>
          </div>
        )}

        {permissionMessage && <div className="contacts-status">{permissionMessage}</div>}

        {showAddForm && (
          <div className="add-contact-form">
            <input
              type="text"
              placeholder="Contact name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="UPI ID (optional)"
              value={formData.upi}
              onChange={(e) => setFormData({ ...formData, upi: e.target.value })}
            />
            <button type="button" className="save-contact-btn" onClick={handleAddContact}>
              Save Contact
            </button>
          </div>
        )}

        <div className="contacts-list">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <div className="contact-avatar">{contact.avatar}</div>

              <div className="contact-meta">
                <strong>{contact.name}</strong>
                <span>{contact.upi}</span>
                <small>{contact.phone}</small>
              </div>

              <button type="button" className="contact-request-btn">
                Request
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
