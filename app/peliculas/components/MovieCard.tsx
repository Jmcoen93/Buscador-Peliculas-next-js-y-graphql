import styles from "./MovieCard.module.css";
import DeleteMovie from "./DeleteMovie";

type MovieCardProps = {
  titulo: string;
  year: number;
  genero: string;
};

export default function MovieCard({
  titulo,
  year,
  genero,
}: MovieCardProps) {
  return (
    <div className={styles.card}>
      <h2>{titulo}</h2>
      <p>{genero}</p>
      <p>{year}</p>

      <DeleteMovie titulo={titulo} />
    </div>
  );
}