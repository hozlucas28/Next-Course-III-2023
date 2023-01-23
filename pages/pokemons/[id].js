/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   Este archivo es un ejemplo de una generación de páginas
 * 		   estáticas bajo demanda y de SSR (Server Side Rendering).
 *
 *
 * IMPORTANTE:
 *  			  - <getStaticPaths> = Establece los sitios ya generados
 * 									   (1 y 2) y retornar un objeto con los
 * 									   mismos y el atributo <fallback>.
 *  			  - <fallback> = Si es falso no generará páginas bajo demanda,
 * 								 pero si es verdadero lo hara.
 *  			  - <getServerSideProps> = Indica una carga de propiedades,
 * 									   	   de una página/s generada/s en el
 * 										   servidor (Backend), que se le pasarán
 * 										   al componente <Pokemon>. El cliente
 * 										   recibe un JavaScript. 
-------------------------------------------------------------------------- */

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Página que recibe los datos del Pokémon, ruta: http://localhost:3000/pokemons/5
const Pokemon = ({ data }) => {
	const router = useRouter();

	console.log(router);

	if (router.isFallback) {
		return <p>Cargando</p>;
	}

	return (
		<div>
			<h1>
				{data.name} número #{data.id}
			</h1>
			<Image
				src={data.sprites.front_default}
				alt={data.name}
				width={400}
				height={400}
			/>
			<Link href="/">Ir a Inicio</Link>
		</div>
	);
};

export const getStaticProps = async ({ params }) => {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${params.id}`
	);
	const data = await response.json();

	return { props: { data } };
};

export const getStaticPaths = async () => {
	const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];

	return {
		paths,
		fallback: true
		// fallback: 'blocking'
	};
};

// SSR (Server Side Rendering)
// export const getServerSideProps = async ({ params }) => {
// 	const response = await fetch(
// 		`https://pokeapi.co/api/v2/pokemon/${params.id}`
// 	);
// 	const data = await response.json();

// 	return { props: { data } };
// };

export default Pokemon;
