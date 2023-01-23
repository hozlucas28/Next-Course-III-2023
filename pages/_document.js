/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   La configuración presente en este archivo me permite
 * 		   utilizar 'styled-components' cuando utilizo SSR (Server Side
 * 		   Rendering).
 *
 *
 * IMPORTANTE:
 *  			  Esta configuración va acompañada del archivo: <.babelrc>, y
 * 				  sus dependencias correspondientes.
-------------------------------------------------------------------------- */

import Document from 'next/document';

import { ServerStyleSheet } from 'styled-components';

export default class myDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanced: (App) => (props) => sheet.collectStyles(<App {...props} />)
				});

			const initialProps = await Document.getInitialProps(ctx);

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}
}
