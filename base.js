log = (title, value, format) => {
    console.log(`----------------`);
    console.log(`${title} - start`);

    console.log(format ? JSON.stringify(value, null, 2) : value);

    console.log(`${title} - end`);

};
