import React from 'react';
import Search from 'containers/Search/Search';
import Html from '../Html';
import app from '../server';
import { renderToNodeStream, getInitialData, handleErrors, generateMetaComponents } from '../utilities';

app.get('/search', (req, res, next)=> {
	return getInitialData(req)
	.then((initialData)=> {
		const newInitialData = {
			...initialData,
			searchData: { empty: 'data' },
		};
		return renderToNodeStream(res,
			<Html
				chunkName="Search"
				initialData={newInitialData}
				headerComponents={generateMetaComponents({
					initialData: newInitialData,
					title: 'Search · Prior Art Archive',
				})}
			>
				<Search {...newInitialData} />
			</Html>
		);
	})
	.catch(handleErrors(req, res, next));
});
