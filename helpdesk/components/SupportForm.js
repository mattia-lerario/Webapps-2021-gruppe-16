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

  const handleSendSupport = (event) => {
    event.preventDefault()
    console.log(form)z
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
          onChange={handleInputOnChange}
          value={form.creator}
        />
      </div>
      <div>
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleInputOnChange}
          value={form.description}
        />
      </div>

      <div>
        <label htmlFor="department">Avdeling</label>
        <select
          id="department"
          name="department"
          onChange={handleInputOnChange}
          value={form.department}
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
        >
          <option value="">Velg prioritet</option>
          <option value="1">Høy</option>
          <option value="2">Medium</option>
          <option value="3">Lav</option>
        </select>
      </div>

      <div>
        <label htmlFor="status"></label>
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
