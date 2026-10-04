"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMovie() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [year, setYear] = useState("");
  const [genero, setGenero] = useState("");

 async function crearPelicula(e: React.FormEvent) {
  e.preventDefault();
   const mutation = `
  mutation {
    crearPelicula(
      titulo: "${titulo}"
      year: ${year}
      genero: "${genero}"
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
 <form onSubmit={crearPelicula}>
    <input
      type="text"
      placeholder="Título"
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
    />

    <input
      type="number"
      placeholder="Año"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    />

    <input
      type="text"
      placeholder="Género"
      value={genero}
      onChange={(e) => setGenero(e.target.value)}
    />

    <button type="submit">
      Añadir película
    </button>
  </form>
);
}