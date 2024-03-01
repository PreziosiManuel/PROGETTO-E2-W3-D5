const rows = document.getElementsByClassName("row");

function creaCard(immagine, titolo, descrizione) {
  // Crea una nuova colonna
  const col = document.createElement("div");
  col.className = "col-6 col-md-4 col-lg-3 mt-5";

  // Crea una nuova card
  const card = document.createElement("div");
  card.className = "card";

  // Aggiungi l'immagine alla card
  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = immagine;
  card.appendChild(img);

  // Aggiungi il corpo della card
  const body = document.createElement("div");
  body.className = "card-body";

  // Aggiungi il titolo
  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = titolo;
  body.appendChild(h5);

  // Aggiungi la descrizione
  const p = document.createElement("p");
  p.className = "card-text";
  p.textContent = descrizione;
  body.appendChild(p);

  // Aggiungi il pulsante Dettagli
  const btnDettagli = document.createElement("a");
  btnDettagli.className = "btn btn-primary mx-2";
  btnDettagli.textContent = "Dettagli";
  body.appendChild(btnDettagli);

  // Aggiungi il pulsante Modifica
  const btnModifica = document.createElement("a");
  btnModifica.className = "btn btn-warning";
  btnModifica.textContent = "Modifica";
  body.appendChild(btnModifica);

  // Aggiungi il corpo della card alla card
  card.appendChild(body);

  // Aggiungi la card alla colonna
  col.appendChild(card);

  // Aggiungi la colonna alla prima riga (puoi modificare questo comportamento se necessario)
  rows[0].appendChild(col);
}

const apy_key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWNlMTRjNTllYzAwMTk5MGQ2ZmMiLCJpYXQiOjE3MDkyODQ1NzcsImV4cCI6MTcxMDQ5NDE3N30.GbFZbfjd6W6sJbymBxiEOH1gHicQ-zTMyDunEBjmEvk";
const url = "https://striveschool-api.herokuapp.com/api/product/";

// BACKOFFICE
fetch(url, {
  method: "GET",
  //   body: JSON.stringify(data),
  headers: {
    Authorization: apy_key,
    // "Content-Type": "application/json",
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
    newAppointment.forEach((element) => {
      creaCard(element.imageUrl, element.name, element.description);
    });
  })
  .catch((err) => console.log(err));
