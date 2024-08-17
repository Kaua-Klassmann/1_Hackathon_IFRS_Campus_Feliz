import tf from "@tensorflow/tfjs";

function vetorizar(itens, categorias) {
  return categorias.map((categoria) => (itens.includes(categoria) ? 1 : 0));
}

function calcularScore(vetorA, vetorB) {
  const tensorA = tf.tensor1d(vetorA);
  const tensorB = tf.tensor1d(vetorB);

  const dotProduct = tf.dot(tensorA, tensorB).dataSync()[0];
  const magnitudeA = tf.norm(tensorA).dataSync()[0];
  const magnitudeB = tf.norm(tensorB).dataSync()[0];

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

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
      habilidadePontoEvento.idHabilidades,
      habilidades
    );
    const score = calcularScore(vetorUsuario, vetorPontoEvento);

    return { pontoEvento: habilidadePontoEvento.idPontoEvento, score };
  });

  const recomendacoes = scores.sort((a, b) => b.score - a.score).slice(0, 3);

  return recomendacoes;
}
