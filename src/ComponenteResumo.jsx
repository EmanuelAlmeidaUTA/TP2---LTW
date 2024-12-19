import React, { useState, useEffect } from "react";
import { IoLink } from "react-icons/io5"; // Ícone de link

const ComponenteResumo = () => {
  const [urlArtigo, setUrlArtigo] = useState("");
  const [resumo, setResumo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const historicoGuardado = JSON.parse(localStorage.getItem("resumosArtigos")) || [];
    setHistorico(historicoGuardado);
  }, []);

  const salvarNoHistorico = (url, resumo) => {
    const novaEntrada = { url, resumo };
    const historicoAtualizado = [...historico.filter((item) => item.url !== url), novaEntrada];
    setHistorico(historicoAtualizado);
    localStorage.setItem("resumosArtigos", JSON.stringify(historicoAtualizado));
  };

  const handleResumo = async () => {
    setErro("");
    const resumoExistente = historico.find((item) => item.url === urlArtigo);
    if (resumoExistente) {
      setResumo(resumoExistente.resumo);
      return;
    }

    if (!urlArtigo.trim()) {
      setErro("Por favor, insira um URL válido.");
      return;
    }

    const url = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(urlArtigo)}&lang=pt&engine=2`;

    const opcoes = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "ca056d5851mshe7d62424eadd54bp16bd79jsnc4face8db775",
        "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };

    try {
      setCarregando(true);
      const resposta = await fetch(url, opcoes);
      if (!resposta.ok) {
        throw new Error("URL não encontrado ou inválido");
      }
      const resultado = await resposta.text();
      setResumo(resultado);
      salvarNoHistorico(urlArtigo, resultado);
    } catch (erro) {
      console.error("Erro ao obter o resumo:", erro);
      setErro("Erro ao obter o resumo. Verifique o URL e tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const handlePaste = async () => {
    try {
      const textoCopiado = await navigator.clipboard.readText();
      setUrlArtigo(textoCopiado);
    } catch (erro) {
      console.error("Erro ao colar o link:", erro);
      setErro("Erro ao colar o link. Verifique as permissões do navegador.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Conteúdo Principal */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black">Faça resumo de Artigos com</h1>
        <h1 className="text-5xl font-bold text-orange-500"> API de OpenAI</h1>
        <p className="mt-6 text-lg text-gray-600">
          Esta é uma ferramenta para transformar artigos longos em resumos claros e concisos.
        </p>
      </div>

      {/* Campo de Entrada */}
      <div className="mt-8 flex items-center justify-center w-full max-w-2xl">
        <button
          onClick={handlePaste}
          className="p-3 bg-gray-200 border-r border-gray-300 rounded-l-lg hover:bg-gray-300"
          title="Colar link"
        >
          <IoLink size={24} />
        </button>
        <input
          type="text"
          placeholder="Colar o link do artigo"
          value={urlArtigo}
          onChange={(e) => setUrlArtigo(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleResumo}
          className="px-6 py-3 text-white bg-orange-500 rounded-r-lg hover:bg-orange-600"
        >
          {carregando ? "..." : "→"}
        </button>
      </div>

      {/* Exibição de Erros */}
      {erro && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {erro}
        </div>
      )}

      {/* Exibição do Resumo */}
      {resumo && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg w-full max-w-2xl">
          <h2 className="text-lg font-bold text-gray-700">Resumo:</h2>
          <pre className="mt-2 text-gray-600 whitespace-pre-wrap">
            {JSON.parse(resumo).summary}
          </pre>
        </div>
      )}

      {/* Histórico de Resumos */}
      {historico.length > 0 && (
        <div className="mt-8 max-w-2xl">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Artigos resumidos:</h2>
          <ul className="space-y-2">
            {historico.map((item, indice) => (
              <li key={indice} className="flex items-center p-2 bg-gray-100 rounded-lg">
                <span
                  className="text-blue-500 cursor-pointer hover:underline w-1/4 truncate"
                  onClick={() => {
                    setUrlArtigo(item.url);
                    setResumo(item.resumo);
                  }}
                >
                  {item.url}
                </span>
                <span className="text-sm text-gray-500 ml-4 w-3/4 truncate">
                  {JSON.parse(item.resumo).summary.slice(0, 200)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComponenteResumo;
