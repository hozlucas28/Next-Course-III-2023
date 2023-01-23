/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   Este archivo es utilizado para demostrar el test de archivos
 * 		   que utilizan Hooks.
-------------------------------------------------------------------------- */

import { useState, useEffect } from 'react';

import Link from 'next/link';

// Componente
const Pokemon = ({ pokemon }) => {
	const id = pokemon.url
		.split('/')
		.filter((x) => x)
		.pop();

	return (
		<li>
			<Link
				href={`pokemons/${id}`}
				data-testid={id}
			>
				{pokemon.name}
			</Link>
		</li>
	);
};

// Página que se carga por defecto al acceder a la ruta: http://localhost:3000/poke
export default function Pokemons() {
	const [loading, setLoading] = useState(true);
	const [pokemons, setPokemons] = useState([[]]);

	useEffect(() => {
		const getPokemons = async () => {
			const response = await fetch(
				'https://pokeapi.co/api/v2/pokemon?limit=151'
			);
			const data = await response.json();
			setPokemons(data.results);
			setLoading(false);
		};
		getPokemons();
	}, []);

	if (loading) {
		return <p>Cargando...</p>;
	}

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
