// const { createApp } = Vue

Vue.createApp({
  data() {
    return {
      form: {
        name: '',
        value: '',
      },
      contacts: []
    }
  },
  methods: {
    createContact() {
      const { ...contact } = this.form
      this.contacts.push({ ...contact, id: Date.now() })
      console.log(this.contacts)
      this.form.name = this.form.value = ''
    }
  }
}).mount('#app')