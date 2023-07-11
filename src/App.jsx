import "./App.css";
import React, { useState } from "react";
import contacts from "./contacts.json";

function App() {
  const initialContacts = contacts.slice(0, 5);
  const [contactList, setContactList] = useState(initialContacts);
  const newArray = contacts.filter(function (el) {
    return !initialContacts.includes(el);
  });

  const randomContact = newArray[Math.floor(Math.random() * newArray.length)];

  function handleSort() {
    const sortedContacts = [...contactList].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    setContactList(sortedContacts);
  }

  function handleSortPop() {
    const sortedContacts = [...contactList].sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setContactList(sortedContacts);
  }

  const deleteActor = (id) => {
    const updatedList = contactList.filter((actor) => actor.id !== id);
    setContactList(updatedList);
  };
  return (
    <div>
      <h1>ACTORS</h1>

      <button
        onClick={() => {
          setContactList((prevContacts) => [...prevContacts, randomContact]);
        }}
      >
        Add New Actor
      </button>
      <button onClick={handleSort}>Sort by Name</button>
      <button onClick={handleSortPop}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Oscar</th>
            <th>Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>
                <button onClick={() => deleteActor(contact.id)}>Delete</button>
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar && <p>🏆</p>}</td>
              <td>{contact.wonEmmy && <p>🏆</p>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
