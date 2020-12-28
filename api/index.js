const express = require('express') // importamos express
const cors = require('cors') // importamos cors para las solicitudes cruzadas entre front end y backend

const port = 3001 // puerto en el que se ejecutara

const app = express() // iniciamos nuestro servidor con express

app.use(cors()) // middleware para usar cors en todas las solicitudes al backend

app.get('/iecho', function (req, res) {
  // endpoint get a /iecho
  const { text } = req.query // destructuring de req.query que es por donde recibe el texto que debe invertir
  if (text && text.length > 1) {
    const revertido = text
      .split('')
      .reverse()
      .join('')
    if (revertido === text) {
      // si el texto ingresado es igual que el revertido devolvemos tambien el flag polindrome: true
      res.status(200).send({ text: revertido, palindrome: true })
    } else {
      // devolvemos el texto revertido
      res.status(200).send({ text: revertido })
    }
  } else {
    // devolvemos un error cuando no se ingresa la variable text por query o si tiene menos de 2 caracteres de longitud
    res.status(400).send({ error: 'no text' })
  }
})

if (!module.parent) {
  // si ya esta ejecutado el servidor no lo vuelve a ejecutar en los test
  app.listen({ port }, () =>
    // corremos el servidor
    console.log(`server corriendo en http://localhost:${port}`)
  )
}

module.exports = app // exportamos el servidor para los test
