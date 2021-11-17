import { useState } from 'react'

const SupportForm = () => {
  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
    status: '',
    priority: '',
  })

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  const validateForm = (form) => {
    if (form.title.len < 25 || form.title.len > 150) return false // Validate title

    if (!/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(form.creator)) return false // Validate creator
    // RegExp: Any number capitalized words containing any number lowercase letters, with a space between.

    if (form.description.len > 250) return false // Validate description

    if (!form.title || !form.priority) return false // Validate status & priority

    return true
  }

  const handleSendSupport = (event) => {
    event.preventDefault()

    if (!validateForm(form)) console.log('Invalid form') // Invalid form error
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
          <option value="1">IT</option>
          <option value="2">Design</option>
          <option value="3">Salg</option>
        </select>
      </div>
      <div>
        <label htmlFor="priority">Prioritet</label>
        <select
          id="priority"
          name="priority"
          onChange={handleInputOnChange}
          value={form.priority}
          required
        >
          <option value="">Velg prioritet</option>
          <option value="1">Høy</option>
          <option value="2">Medium</option>
          <option value="3">Lav</option>
        </select>
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <input
          id="status"
          name="status"
          type="hidden"
          onChange={handleInputOnChange}
          value="Åpen"
        ></input>
      </div>
      <button type="sumbit">Send henvendelse</button>
    </form>
  )
}

export default SupportForm
