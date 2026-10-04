"use client";

import { useRouter } from "next/navigation";

type DeleteMovieProps = {
  titulo: string;
};

export default function DeleteMovie({ titulo }: DeleteMovieProps) {
  const router = useRouter();

async function borrarPelicula() {
  const mutation = `
    mutation {
      borrarPelicula(
        titulo: "${titulo}"
      ) {
        titulo
        year
        genero
      }
    }
  `;

  const respuesta = await fetch("/peliculas/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: mutation,
    }),
  });

  const datos = await respuesta.json();

  console.log(datos);

  router.refresh();
}
  return (
    <button onClick={borrarPelicula}>
      Borrar
    </button>
  );
}