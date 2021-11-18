import { useState } from 'react'
import axios from 'axios'

const SupportForm = () => {
  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
    department: '',
    severity: '',
  })

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  const validateForm = (form) => {
    if (form.title.len < 25 || form.title.len > 150) return false // Validate title

    if (!/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(form.creator)) return false // Validate creator
    // RegExp: Any number capitalized words containing any number lowercase letters, with a space between.

    if (form.description.len > 250) return false // Validate description

    if (!form.title || !form.severity) return false // Validate status & severity

    return true
  }

  const handleSendSupport = (event) => {
    event.preventDefault()

    if (!validateForm(form)) return console.log('Invalid form') // Invalid form error

    axios.post('/api/issues', form)
  }

  return (
    <form className="support_form" onSubmit={handleSendSupport}>
      <h2>Ny henvendelse</h2>
      <div>
        <label htmlFor="title">Tittel</label>
        <input
          type="text"
          id="title"
          name="title"
          minLength="25"
          maxLength="150"
          onChange={handleInputOnChange}
          value={form.title}
          required
        />
      </div>
      <div>
        <label htmlFor="creator">Navn</label>
        <input
          type="text"
          id="creator"
          name="creator"
          pattern="^[A-Z][a-z]*(\s[A-Z][a-z]*)*$"
          // RegExp: Any number capitalized words containing any number lowercase letters, with a space between.
          onChange={handleInputOnChange}
          value={form.creator}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          type="text"
          id="description"
          name="description"
          maxLength="250"
          onChange={handleInputOnChange}
          value={form.description}
          required
        />
      </div>

      <div>
        <label htmlFor="department">Avdeling</label>
        <select
          id="department"
          name="department"
          onChange={handleInputOnChange}
          value={form.department}
          required
        >
          <option value="">Velg avdeling</option>
          <option value="it">IT</option>
          <option value="design">Design</option>
          <option value="salg">Salg</option>
        </select>
      </div>
      <div>
        <label htmlFor="severity">Prioritet</label>
        <select
          id="severity"
          name="severity"
          onChange={handleInputOnChange}
          value={form.severity}
          required
        >
          <option value="">Velg prioritet</option>
          <option value="high">Høy</option>
          <option value="medium">Medium</option>
          <option value="low">Lav</option>
        </select>
      </div>

      <button type="sumbit">Send henvendelse</button>
    </form>
  )
}

export default SupportForm
