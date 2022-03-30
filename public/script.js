// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

// define variables that reference elements on our page
const dreamsList = document.getElementById("dreams");
const dreamsForm = document.querySelector("form");

// a helper function that creates a list item for a given dream
function appendNewDream(dream) {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream;
  dreamsList.appendChild(newListItem);
}

// buscar a lista inicial de sonhos
fetch("/dreams")
  .then(response => response.json()) // parse the JSON from the server
  .then(dreams => {
    // remova o texto de carregamento
    dreamsList.firstElementChild.remove();
  
    // iterar através de cada sonho e adicioná-lo à nossa página
    dreams.forEach(appendNewDream);
  
    // ouça o formulário a ser enviado e adicione um novo sonho quando for
    dreamsForm.addEventListener("submit", event => {
      // impedir que nosso envio de formulário atualize a página
      event.preventDefault();

      // obter o valor do sonho e adicioná-lo à lista
      let NOVOREGISTRO = dreamsForm.elements.dream.value;
      dreams.push(NOVOREGISTRO);
      appendNewDream(NOVOREGISTRO);

      // redefinir formulário
      dreamsForm.reset();
      dreamsForm.elements.dream.focus();
    });
  });
