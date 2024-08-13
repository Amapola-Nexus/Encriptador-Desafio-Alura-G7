# ENCRIPTAD0R

*Desafío de ALURA LATAM para el Curso de Programación, grupo G7.*

Encripta/desencripta las vocales de un texto ingresado. Las llaves de encriptación por defecto son:
 * La letra "a" es convertida para "ai"
 * La letra "e" es convertida para "enter"
 * La letra "i" es convertida para "imes"
 * La letra "o" es convertida para "ober"
 * La letra "u" es convertida para "ufat"

## Herramientas utilizadas

 * HTML
 * CSS
 * JavaScript

## Ejemplos

 * hola mundo => hoberlai mufatndober
 * aidimesobers mufatndober => adios mundo

## Características

 - Puedes configurar la llave de encriptación en la Configuración, sea manualmente o con una llave generada aleatoriamente.
 - Desencripta el texto ingresado *siempre y cuando* este contenga la llave actualmente configurada.
 - Al ingresar texto en el textarea, automáticamente las mayúsculas se convertirán a minúsculas y se eliminará cualquier tilde.
 - Botón para copiar el texto resultante.
 - Disponible en inglés y español.

## Creditos

El generador de llaves se ha basado en [generate-words](https://github.com/Stuk/generate-words.git "repositorio de Stuk")