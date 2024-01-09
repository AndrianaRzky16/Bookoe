export function getBooks() {
  return fetch("https://bookapi.cm.hmw.lol/api/books?page=1").then((response) =>
    response.json()
  );
}
