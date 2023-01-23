/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   Este es un archivo de test que demuestra como ejecutar pruebas
 * 		   sobre componentes que no utilizan Hooks.
 *
 *
 * IMPORTANTE:
 *  			  - <describe()> = Engloba una prueba bajo un título, la
 * 								   misma puede estar anidada.
 *  			  - <it()> = Ejecuta la lógica para verificar la prueba, es
 * 							 acompañada de una breve descripción.
 *  			  - <expect().toBe()> = Verifica la igualdad del <expect()> con
 * 										el <toBe()>.
 *  			  - <expect().toEqual()> = Verifica la igualdad del contenido
 * 										   del <expect()> con la del <toEqual()>.
 *  			  - <expect().toBeInTheDocument()> = Verifica que el elemento
 * 													 del <expect()> se encuentre
 * 													 en el documento.
 *  			  - <getByText()> = Obtiene el texto del elemento.
 *  			  - <getByTestId()> = Obtiene un elemento de la página gracias
 * 									  a su atributo personalizado <data-testid>.
 *  			  - <getAttribute()> = Obtiene un atributo del elemento.
 *  			  - <screen> = Referencia a todo el contenido de la página.
 *  			  - <render()> = Renderiza un componente para luego aplicarle
 * 								 lógica.
-------------------------------------------------------------------------- */

import { render, screen } from '@testing-library/react';

import Index, { getStaticProps } from '../pages/index';

const add = () => 2 + 2;

// Pruebas
describe('Index', () => {
	// Ejemplo básico
	// describe('Operación Matemática', () => {
	// 	it('Sumar: 2 + 2', () => {
	// 		expect(add()).toBe(4);
	// 	});
	// });

	describe('Component', () => {
		it('Se renderiza', () => {
			render(
				<Index
					pokemons={[{ name: 'Cerdito Feliz', url: '/pokemon/detalle/1' }]}
				/>
			);

			const paragraph = screen.getByTestId('title');
			expect(paragraph).toBeInTheDocument();

			const pig = screen.getByText('Cerdito Feliz');
			const urlPig = pig.getAttribute('href');
			expect(pig).toBeInTheDocument();
			expect(urlPig).toEqual('pokemons/1');
		});
	});

	// Prueba de la API Pokémon
	describe('getStaticProps', () => {
		it('return pokemons', async () => {
			global.fetch = jest.fn().mockImplementation((url) => {
				expect(url).toBe('https://pokeapi.co/api/v2/pokemon?limit=151');
				return new Promise((resolve) => {
					resolve({
						json: () =>
							Promise.resolve({
								results: 'Pokemons'
							})
					});
				});
			});

			const { props } = await getStaticProps();
			expect(props.pokemons).toBe('Pokemons');
		});
	});
});
