/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   En este archivo se demuestra como generar una página estática.
 *
 *
 * IMPORTANTE:
 *  			  - <getStaticProps> = Indica una carga de propiedades,
 * 									   de una página/s estática/s, que se
 * 									   le pasarán al componente <Pokemons>.
 * 									   El cliente recibe un HTML.
-------------------------------------------------------------------------- */

import Link from 'next/link';

// Componente
const Pokemon = ({ pokemon }) => {
	const id = pokemon.url
		.split('/')
		.filter((x) => x)
		.pop();

	return (
		<li>
			<Link href={`pokemons/${id}`}>{pokemon.name}</Link>
		</li>
	);
};

// Página que se carga por defecto al acceder a la ruta: http://localhost:3000/
export default function Pokemons({ pokemons }) {
	return (
		<div>
			<p data-testid="title">Mi App de Pokémones</p>
			<ul>
				{pokemons.map((pokemon) => (
					<Pokemon
						key={pokemon.name}
						pokemon={pokemon}
					/>
				))}
			</ul>
		</div>
	);
}

// Obtengo los datos de los Pokémons
export const getStaticProps = async () => {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
	const data = await response.json();

	return {
		props: {
			pokemons: data.results
		}
	};
};
