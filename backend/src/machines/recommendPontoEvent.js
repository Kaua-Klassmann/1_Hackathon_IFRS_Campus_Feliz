import tf from "@tensorflow/tfjs";

function vetorizar(itens, categorias) {
  return categorias.map((categoria) => (itens.includes(categoria) ? 1 : 0));
}

function calcularScore(vetorA, vetorB) {
  const tensorA = tf.tensor1d(vetorA);
  const tensorB = tf.tensor1d(vetorB);

  const dotProduct = tf.dot(tensorA, tensorB).dataSync();

  const magnitudeA = tf.norm(tensorA).dataSync();
  const magnitudeB = tf.norm(tensorB).dataSync();

  return dotProduct / (magnitudeA * magnitudeB);
}

export default function recomendarPontoEvento(
  habilidadesUsuario,
  habilidades,
  habilidadesPontoEventos
) {
  const vetorUsuario = vetorizar(habilidadesUsuario, habilidades);

  const scores = habilidadesPontoEventos.map((habilidadePontoEvento) => {
    const vetorPontoEvento = vetorizar(
      habilidadePontoEvento.idHabilidade,
      habilidades
    );
    const score = calcularScore(vetorUsuario, vetorPontoEvento);
    return { pontoEvento: pontoEvento.idPontoEvento, score };
  });

  const recomendacoes = scores.sort((a, b) => b.score - a.score);

  return recomendacoes;
}
