const OpenAPISnippet = require('openapi-snippet')

fetch("http://localhost:8080/api-docs-json")
    .then(respuesta=>respuesta.json())
        .then(desc=>{
          // define input:
const openApi = desc
const targets = ['node_unirest', 'c'] // array of targets for code snippets. See list below...

try {
  // either, get snippets for ALL endpoints:
  const results = OpenAPISnippet.getSnippets(openApi, targets) // results is now array of snippets, see "Output" below.

  // ...or, get snippets for a single endpoint:
  //const results2 = OpenAPISnippet.getEndpointSnippets(openApi, '/carro', 'get', targets)
  console.log(results);
} catch (err) {
  console.log("Ocurrio un error: "+err);
}

});
            //console.log(desc);