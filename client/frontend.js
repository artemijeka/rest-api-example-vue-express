// const { createApp } = Vue
import Loader from './components/loader.js'



Vue.createApp({
  data() {
    return {
      loading: false,
      form: {
        name: '',
        value: '',
      },
      contacts: [
      ]
    }
  },
  components: {
    Loader,
  },
  methods: {
    async createContact() {
      const { ...contact } = this.form

      await request('/api/contacts', 'POST', contact)

      this.loading = true
      this.contacts = await request('/api/contacts')
      this.loading = false

      // this.contacts.push({ ...contact, id: Date.now(), marked: false })
      // console.log(this.contacts)
      this.form.name = this.form.value = ''
    },
    async markContact(id) {
      const contact = this.contacts.find(c => c.id === id)

      await request('/api/contacts', 'PUT', {
        ...contact,
        marked: true//!в contact marked === false, но тут мы его переопределяем на true
      })

      this.loading = true
      this.contacts = await request('/api/contacts')
      this.loading = false

      // console.log(contact)
      // contact.marked = true
    },
    async removeContact(id) {
      await request(`/api/contacts`, 'DELETE', { id })
      // await request(`/api/contacts/${id}`, 'DELETE')

      this.loading = true
      this.contacts = await request('/api/contacts')
      this.loading = false

      // this.contacts = this.contacts.filter(c => c.id !== id)
    }
  },
  computed: {
    canCreate() {
      return this.form.value.trim() && this.form.name.trim()
    }
  },
  async created() {
    this.loading = true
    this.contacts = await request('/api/contacts')
    this.loading = false
  }
}).mount('#app')



async function request(url, method = 'GET', data = null) {
  try {
    const headers = {}
    let body

    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)

    }

    const res = await fetch(url, {
      method,
      headers,
      body
    })

    return await res.json()

  } catch (error) {
    console.warn(error.message)
  }
}