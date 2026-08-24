const vetorDesordenadoBase: number[] = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));

const vetorOrdenado: number[] = vetorDesordenadoBase
    .slice()
    .sort((a, b) => a - b);

const alvoInicio = vetorOrdenado[10];  
const alvoMeio = vetorOrdenado[50];     
const alvoFim = vetorOrdenado[85]; 
const alvoInexistente = -9999;          

function pesquisaSeqIterativa(vetor: number[], alvo: number): number {
    for (let i = 0; i < vetor.length; i++) {
        if (vetor[i] === alvo) return i;
    }
    return -1;
}
function pesquisaBinIterativa(vetor: number[], alvo: number): number {
    let inicio = 0;
    let fim = vetor.length - 1;

    while (inicio <= fim) {
        let meio = Math.floor((inicio + fim) / 2);
        if (vetor[meio] === alvo) return meio;
        if (alvo < vetor[meio]) fim = meio - 1;
        else inicio = meio + 1;
    }
    return -1;
}

function pesquisaSeqRecursiva(elemento: any, vetor: Array<any>, indEsq: number = 0): number {
    if (indEsq >= vetor.length) return -1;
    if (vetor[indEsq] === elemento) return indEsq;
    return pesquisaSeqRecursiva(elemento, vetor, indEsq + 1);
}

function pesquisaBinRecursiva(
    elemento: any,
    vetor: Array<any>,
    indEsq: number = 0,
    indDir: number = vetor.length - 1
): number {
    if (indEsq > indDir) return -1;

    let meio = Math.floor((indEsq + indDir) / 2);

    if (vetor[meio] === elemento) return meio;
    if (elemento < vetor[meio]) {
        return pesquisaBinRecursiva(elemento, vetor, indEsq, meio - 1);
    }
    return pesquisaBinRecursiva(elemento, vetor, meio + 1, indDir);
}

function medirTempo(fn: () => number): { indice: number; tempoMs: number } {
    const inicio = performance.now();
    const indice = fn();
    const fim = performance.now();
    return { indice, tempoMs: fim - inicio };
}

function executarTestes() {
    const cenarios = [
        { nome: "Início (Pos 10)", alvo: alvoInicio },
        { nome: "Meio (Pos 50)", alvo: alvoMeio },
        { nome: "Fim (Pos 85)", alvo: alvoFim },
        { nome: "Ausente", alvo: alvoInexistente }
    ];

    console.log("-------------------Benchmarch---------------------: \n");

    cenarios.forEach(({ nome, alvo }) => {
        console.log(`\n--- Cenário: ${nome} (Alvo: ${alvo}) ---`);

        const seqIter = medirTempo(() => pesquisaSeqIterativa(vetorOrdenado, alvo));
        const seqRec = medirTempo(() => pesquisaSeqRecursiva(alvo, vetorOrdenado));
        const binIter = medirTempo(() => pesquisaBinIterativa(vetorOrdenado, alvo));
        const binRec = medirTempo(() => pesquisaBinRecursiva(alvo, vetorOrdenado));

        console.table([
            { Algoritmo: "Seq. Iterativa", Índice: seqIter.indice, "Tempo (ms)": seqIter.tempoMs.toFixed(5) },
            { Algoritmo: "Seq. Recursiva", Índice: seqRec.indice, "Tempo (ms)": seqRec.tempoMs.toFixed(5) },
            { Algoritmo: "Bin. Iterativa", Índice: binIter.indice, "Tempo (ms)": binIter.tempoMs.toFixed(5) },
            { Algoritmo: "Bin. Recursiva", Índice: binRec.indice, "Tempo (ms)": binRec.tempoMs.toFixed(5) }
        ]);
    });
}

executarTestes();
//conclusão:
    /*
        em casos que o elemento está no início do vetor, a pesquisa sequencial iterativa é mais rápida, pois encontra o elemento rapidamente.
        a pesquisa sequencial recursiva é foi mais lenta na maioria dos casos.
        a pesquisa sequencial recursiva foi mais rápida em 3 dos 4 casos, onde só não foi mais eficiente no terceiro cenário.
        a binaria interativa se demonstrou menos eficinente no geral que a sequencial, só foi mais rápida no cenário 3 que é a busca nas posições finais do vetor.
    */