import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { cs } from 'date-fns/locale';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function EventCard({ event, onRegister }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/events/${event.id}/register`,
        formData
      );
      
      setMessage('Registrace byla úspěšná! Těšíme se na Vás na akci.');
      setMessageType('success');
      setFormData({ name: '', email: '' });
      setShowForm(false);
      
      // Update parent component
      if (onRegister) {
        onRegister(event.id);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Došlo k chybě při registraci. Zkuste to prosím znovu.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsRegistering(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    try {
      const date = parseISO(dateTimeString);
      return format(date, 'd. MMMM yyyy, HH:mm', { locale: cs });
    } catch (error) {
      return dateTimeString;
    }
  };

  const isFull = event.max_attendees && event.current_attendees >= event.max_attendees;

  return (
    <div className="event-card">
      <div className="event-date">
        {formatDateTime(event.start_time)}
      </div>
      
      <h3 className="event-title">{event.title}</h3>
      
      <p className="event-description">{event.description}</p>
      
      <div className="event-details">
        <div className="event-detail">
          <span>📍</span>
          <span>{event.location}</span>
        </div>
        <div className="event-detail">
          <span>⏰</span>
          <span>
            {formatDateTime(event.start_time)} - {format(parseISO(event.end_time), 'HH:mm', { locale: cs })}
          </span>
        </div>
      </div>

      <div className="event-attendees">
        <strong>Počet účastníků: </strong>
        {event.current_attendees}
        {event.max_attendees && ` / ${event.max_attendees}`}
        {isFull && <span style={{ color: '#ef4444', marginLeft: '0.5rem' }}>OBSAZENO</span>}
      </div>

      {message && (
        <div className={`${messageType}-message`}>
          {message}
        </div>
      )}

      {!isFull && !showForm && messageType !== 'success' && (
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          Registrovat se na akci
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="registration-form">
          <h4>Registrace na akci</h4>
          
          <div className="form-group">
            <label htmlFor={`name-${event.id}`}>Jméno a příjmení *</label>
            <input
              type="text"
              id={`name-${event.id}`}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isRegistering}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`email-${event.id}`}>E-mail *</label>
            <input
              type="email"
              id={`email-${event.id}`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isRegistering}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              className="register-btn"
              disabled={isRegistering}
            >
              {isRegistering ? 'Registruji...' : 'Potvrdit registraci'}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setMessage('');
              }}
              className="btn"
              style={{ flex: 1, background: '#6b7280', color: 'white' }}
              disabled={isRegistering}
            >
              Zrušit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/events`);
      setEvents(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Nepodařilo se načíst události. Zkuste obnovit stránku.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegistration = (eventId) => {
    // Refresh events to update attendee count
    fetchEvents();
  };

  if (loading) {
    return (
      <section className="page-content-section">
        <div className="container">
          <h1>Naše události</h1>
          <div className="content-wrapper" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p>Načítáme události...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-content-section">
        <div className="container">
          <h1>Naše události</h1>
          <div className="content-wrapper">
            <div className="error-message">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-content-section">
      <div className="container">
        <h1>Naše události</h1>
        <div className="content-wrapper">
          <p>Připojte se k našim událostem a poznejte náš statek a naše zvířata blíže. Všechny akce se konají na našem statku ve Vlkanči.</p>
          
          {events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p>Momentálně nemáme naplánované žádné události. Sledujte naše sociální sítě pro aktuální informace.</p>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRegister={handleRegistration}
                />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#f9fafb', borderRadius: '1rem' }}>
            <h3>Kontakt pro více informací</h3>
            <p>
              Máte otázky ohledně našich událostí? Kontaktujte nás na{' '}
              <a href="mailto:nechmerust@gmail.com" className="inline-link">
                nechmerust@gmail.com
              </a>
            </p>
            <p style={{ marginTop: '1rem' }}>
              Sledujte nás také na{' '}
              <a href="https://www.facebook.com/share/1AkbXrhiRC/" target="_blank" rel="noopener noreferrer" className="inline-link">
                Facebooku
              </a>{' '}
              a{' '}
              <a href="https://www.instagram.com/nech_me_rust?igsh=azM4ZTZwOHJ5MnNl" target="_blank" rel="noopener noreferrer" className="inline-link">
                Instagramu
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventsPage;