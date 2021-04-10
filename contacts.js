import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { handleError } from './utils/handleError.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

const listContacts = () => {
  fs.readFile(contactsPath, 'utf-8', (err, contacts) => {
    if (err) handleError(err)

    console.table(JSON.parse(contacts))
  })
}

function getContactById (contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, contacts) => {
    if (err) handleError(err)

    const parsedContacts = JSON.parse(contacts)
    const searchContact = parsedContacts.find(({ id }) => id === Number(contactId))
    console.log(searchContact)
  })
}

function removeContact (contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, contacts) => {
    if (err) handleError(err)

    const parsedContacts = JSON.parse(contacts)
    const updatedContacts = parsedContacts.filter(({ id }) => id !== Number(contactId))
    console.table(updatedContacts)

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (err) => {
      if (err) handleError(err)
    })
  })
}

function addContact (name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, contacts) => {
    if (err) handleError(err)

    const parsedContacts = JSON.parse(contacts)
    const lastId = parsedContacts[parsedContacts.length - 1].id
    const newContact = {
      id: lastId + 1,
      name,
      email,
      phone
    }

    const updatedContacts = [...parsedContacts, newContact]

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (err) => {
      if (err) handleError(err)

      console.table(updatedContacts)
    })
  })
}

export default { listContacts, getContactById, addContact, removeContact }
