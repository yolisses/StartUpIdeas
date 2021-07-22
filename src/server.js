import express from 'express';
import routes from './routes.js';

import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
