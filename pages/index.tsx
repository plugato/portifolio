import { useState } from 'react';
const Home = () => {
  return (
    <div>
      <h1>home</h1>
      <Contador />
    </div>
  );
};

const Contador = () => {
  const [contador, setContador] = useState(1);
  const adicionarContador = () => {
    setContador(contador + 1);
  };

  return (
    <div>
      <h2>{contador}</h2>
      <button onClick={adicionarContador}>Click</button>
    </div>
  );
};
export default Home;
