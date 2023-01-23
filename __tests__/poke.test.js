/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   Este es un archivo de test que demuestra como ejecutar pruebas
 * 		   sobre componentes que no utilizan Hooks.
-------------------------------------------------------------------------- */

import { render, screen, waitFor } from '@testing-library/react';

import Poke from '../pages/poke';

// Pruebas
describe('Poke', () => {
	it('renders pokemons', async () => {
		const mockResults = [
			{ name: 'Cerdito', url: 'https://www.dominio.com/pokemons/1' }
		];

		global.fetch = jest.fn().mockImplementation((url) => {
			return new Promise((resolve) => {
				resolve({
					json: () =>
						Promise.resolve({
							results: mockResults
						})
				});
			});
		});

		render(<Poke />);

		const loading = screen.getByText('Cargando...');
		expect(loading).toBeInTheDocument();
		await waitFor(() => screen.getByText('Mi App de Pokémones'));

		const anchor = screen.getByTestId(1);
		expect(anchor).toHaveAttribute('href', 'pokemons/1');
		expect(anchor).toHaveTextContent('Cerdito');
	});
});
