const epxress = require('express');
const app = epxress();
const routes = require('./routes/route');


app.use(epxress.json());

const PORT = process.env.PORT || 4000;


// main route
app.use('/api', routes);



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
