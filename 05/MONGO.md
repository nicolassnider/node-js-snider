# CREDITOS A darwin-morocho https://gist.github.com/darwin-morocho
# MongoDB
Es una base de datos documental (NoSQL) de escalado facil y gran performance.
Los datos se guardan como un JSON.


## Document
cada dato guardado en una base mongo se le conoce como documento.


## Collection
Es un grupo de documentos (Similar a las tablas en una base SQL)


 SQL Database  | MongoDB
------------- | -------------
Database  | Database
Table  | Collection
Tuple/Row   | Document
column  | Field
Table Join | Embedded Documents
Primary Key | Primary Key (Default key _id provided by MongoDB itself)

## Ejemplo de un documento
```jsx
{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by: 'MEEDU.APP',
   url: 'http://meedu.com',
   tags: ['mongodb', 'flutter', 'react'],
   likes: 100, 
   comments: [	
      {
         user:'user1',
         message: 'My first comment',
         dateCreated: new Date(2011,1,20,2,15),
         like: 0 
      },
      {
         user:'user2',
         message: 'My second comments',
         dateCreated: new Date(2011,1,25,7,45),
         like: 5
      }
   ]
}
```


## Datos soportados por mongodb
* String − This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.

* Integer − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.

* Boolean − This type is used to store a boolean (true/ false) value.

* Double − This type is used to store floating point values.

* Min/ Max keys − This type is used to compare a value against the lowest and highest BSON elements.

* Arrays − This type is used to store arrays or list or multiple values into one key.

* Timestamp − ctimestamp. This can be handy for recording when a document has been modified or added.

* Object − This datatype is used for embedded documents.

* Null − This type is used to store a Null value.

* Date − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.

* Object ID − This datatype is used to store the document’s ID.

* Binary data − This datatype is used to store binary data.

* Code − This datatype is used to store JavaScript code into the document.

* Regular expression − This datatype is used to store regular expression.



## use <database_name>
Selecciona la base de datos (si no existe la crea solo si se inserta datos en ella)

```
use itzam
```


## mostrar colecciones

```
show collections
```


## insertar datos en mongo

```
db.nombre_coleccion_en_plural.insert(  {name: 'Afghanistan', code: 'AF'}   )
```

## insertar varios elementos a la vez

```
db.countries.insert(  [
   {name: 'Åland Islands', code: 'AX'}, 
  {name: 'Albania', code: 'AL'}, 
]   )
```


## listar datos de una colección
`db.nombre_coleccion.find()` retorna todos los datos de de una coleccion como un array

```
db.countries.find()
```

Filtrado (retorna una lista con los documentos que coincidan con el filtro de igualdad)
```
db.countries.find({code:"EC"})
```

```
db.countries.find({  code: { $eq: "EC" } })
```


retorna una lista con los paises cuyo campo code no sea igual a "EC"

```
db.countries.find({  code: { $ne: "EC" } })
```



## performance 
.explain("executionStats")  retorna informacion sobre el tiempo del query



## findOne()
retorna el primer elemento de una coleccion que coincida con el filtro

```
db.countries.findOne({name:"Ecuador"})
```


## Projection
Una proyeccion se refiere a retornar solo la data necesaria

La siguiente instruccion retornara los todos los paises excluyendo el campo _id
```
 db.countries.find({},{name:1, _id:0, code:1})
 ```








