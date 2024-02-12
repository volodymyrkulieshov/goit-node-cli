const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

// contacts.js

// Розкоментуй і запиши значення
const contactsPath = path.join(__dirname, "db", "contacts.json");

console.log(contactsPath);

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
  // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const removedContact = contacts[index];

  contacts.splice(index, 1);

  await writeContacts();
  return removedContact;

  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts();
  return newContact;

  // ...твій код. Повертає об'єкт доданого контакту (з id).
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
