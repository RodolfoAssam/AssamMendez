## **Principios de la Arquitectura REST**
![imagenAPI](https://dossetenta.com/wp-content/uploads/2021/12/R6qFq3n.png)
Primero debemos conocer el significado de la arquitectura REST, el es: Representational State Transfer, es un estilo de arquitectura de software para sistemas distribuidos como la World Wide Web, ahora mostraré los principios fundamentales:

## Interfaz Uniforme
Este principio es la piedra angular de REST y dicta que la interfaz entre el cliente y el servidor debe ser uniforme y consistente. Se divide en cuatro sub-principios:

- ### Identificación de recursos
Cada recurso en el sistema REST debe ser identificable de forma única a través de un URI (Uniform Resource Identifier). Por ejemplo, en una API para un blog, podrías tener un URI como `/articles` para acceder a los artículos.

- ### Manipulación de recursos a través de representaciones
Los clientes interactúan con los recursos utilizando representaciones, típicamente en formatos como JSON o XML. Por ejemplo, cuando un cliente solicita un recurso, puede recibir una representación de ese recurso en JSON. Al modificar recursos, el cliente envía una representación modificada al servidor.

- ### Mensajes auto-descriptivos
Los mensajes HTTP (solicitudes y respuestas) deben contener toda la información necesaria para ser comprendidos, incluyendo metadatos (como encabezados HTTP) y datos aplicables (como el cuerpo del mensaje).

- ### Hipermedia como motor del estado de la aplicación (HATEOAS)
Este concepto implica que las respuestas del servidor deben incluir hipervínculos a otros recursos y acciones relacionadas, permitiendo al cliente navegar dinámicamente entre ellos. Por ejemplo, una respuesta con detalles de un artículo podría incluir enlaces para editar o eliminar ese artículo.

## Sin Estado (Stateless)
En REST, cada solicitud del cliente al servidor debe contener toda la información necesaria para entender y procesar esa solicitud. El servidor no guarda ningún estado de la sesión del cliente entre peticiones. Esto aumenta la fiabilidad y la escalabilidad al simplificar el diseño del servidor.

## Almacenamiento en Caché (Cacheable)
Las respuestas deben ser explícitamente definidas como cacheables o no cacheables. Si una respuesta es cacheable, el cliente puede reutilizarla para solicitudes futuras, reduciendo la latencia y mejorando la eficiencia de la red.

## Sistema en Capas (Layered System)
La arquitectura debe estar organizada en capas, donde cada capa tiene una función específica. Un cliente no necesita saber si está interactuando directamente con el servidor final o con una capa intermedia. Esto permite la escalabilidad y la seguridad, ya que las funciones como el balanceo de carga y el cifrado pueden implementarse en capas separadas.

## Código bajo Demanda (opcional)
Este es el único principio opcional en REST. Permite que el servidor envíe código ejecutable al cliente para extender o personalizar su funcionalidad. Por ejemplo, el servidor podría enviar scripts JavaScript para ser ejecutados por el cliente.