const epxress = require('express');
const app = epxress();

app.use(epxress.json());

const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})