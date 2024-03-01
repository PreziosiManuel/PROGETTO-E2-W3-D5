const apy_key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWNlMTRjNTllYzAwMTk5MGQ2ZmMiLCJpYXQiOjE3MDkyODQ1NzcsImV4cCI6MTcxMDQ5NDE3N30.GbFZbfjd6W6sJbymBxiEOH1gHicQ-zTMyDunEBjmEvk";
const url = "https://striveschool-api.herokuapp.com/api/product/";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  console.log(form);
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita il comportamento predefinito del submit del form
    postData();
  });
});

function postData() {
  const titolo = document.getElementById("titolo").value;
  const descrizione = document.getElementById("descrizione").value;
  const brand = document.getElementById("brand").value;
  const imgUrl = document.getElementById("img").value;
  const prezzo = document.getElementById("prezzo").value;

  const data = {
    name: titolo,
    description: descrizione,
    brand: brand,
    imageUrl: imgUrl,
    price: prezzo,
  };

  fetch(url, {
    method: "POST", // è come scrivere method: method,
    body: JSON.stringify(data),
    headers: {
      Authorization: apy_key,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }

        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }

        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }

        throw new Error("Errore nel reperimento dati");
      }
    })
    .then((newAppointment) => {
      if (newAppointment) {
        alert("Appuntamento con id: " + " è stato modificato con successo ");
      } else {
        alert("Appuntamento con id: " + " è stato creato correttamente");

        e.target.reset();
      }
    })
    .catch((err) => console.log(err));
}
