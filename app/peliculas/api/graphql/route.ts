import { buildSchema, graphql } from "graphql";

const schema = buildSchema(`
  type Pelicula {
    titulo: String
    year: Int
    genero: String
  }

  type Query {
    peliculas: [Pelicula]
  }

  type Mutation {
    crearPelicula(
      titulo: String!
      year: Int!
      genero: String!
    ): Pelicula
    borrarPelicula(titulo: String!): Pelicula
  }
`);

const peliculas = [
  {
    titulo: "Interstellar",
    year: 2014,
    genero: "Ciencia ficción",
  },
  {
    titulo: "El Padrino",
    year: 1972,
    genero: "Crimen",
  },
  {
    titulo: "Pulp Fiction",
    year: 1994,
    genero: "Crimen",
  },
];

const root = {
  peliculas: () => peliculas,



  borrarPelicula: ({ titulo }: { titulo: string }) => {
  const indice = peliculas.findIndex(
    (pelicula) => pelicula.titulo === titulo
  );

  if (indice === -1) {
    return null;
  }

  const peliculaBorrada = peliculas[indice];

  peliculas.splice(indice, 1);

  return peliculaBorrada;
},


  crearPelicula: ({
    titulo,
    year,
    genero,
  }: {
    titulo: string;
    year: number;
    genero: string;
  }) => {
    const nuevaPelicula = {
      titulo,
      year,
      genero,
    };

    peliculas.push(nuevaPelicula);

    return nuevaPelicula;
  },
};

export async function POST(request: Request) {
  const { query } = await request.json();

  const result = await graphql({
    schema,
    source: query,
    rootValue: root,
  });

  return Response.json(result);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) {
    return Response.json(
      { error: "Falta la query GraphQL" },
      { status: 400 }
    );
  }

  const result = await graphql({
    schema,
    source: query,
    rootValue: root,
  });

  return Response.json(result);
}