import { useState, FormEvent } from "react";
import "./App.css";

import logoImg from "./assets/logo.png";

/* Base de cáclulo:
    Alcool / gasolina = 
      {se menor que 0.7} = compensa alcool
      {se maior que 0.7} = compensa gasolina
*/

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calcular(event: FormEvent) {
    event.preventDefault();

    let calculo = alcoolInput / gasolinaInput;

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usa álcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    } else {
      setInfo({
        title: "Compensa usa gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    }
  }

  function formatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return valorFormatado;
  }

  return (
    <>
      <main className="container">
        <img
          src={logoImg}
          className="logo"
          alt="Logo da calculadora de gasolina ou alcool"
        />
        <h1 className="title">Qual melhor opção?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
            required
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
            required
          />

          <input type="submit" className="button" value="Calcular" />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>

            <span>Álcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
