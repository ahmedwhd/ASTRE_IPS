const fs = require('fs');
var data = [];
fs.readFile('./donnees.csv', 'utf8', (err, datafile) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    try {
        //data = datafile;
        console.log('data :', datafile);
        const data2 = [];
        const numEtu = [];
        const humeur = [];

        const rows = datafile.split('\n').slice(1);
        rows.forEach(row => {
            const cols = row.split('","');
            numEtu.push(cols[1]);
            humeur.push(cols[2]);
            data.push({ "numEtu": cols[1], "humeur": cols[2],"techno": cols[4],"artistique": cols[5],"creatif": cols[6],"placement": cols[9],"netflix": cols[10],"linux": cols[12],"montagePc": cols[13],"equipe": cols[17] });
            console.log(data);

            const jsonString = JSON.stringify(data);

            fs.writeFile('./nvDonnees.json', jsonString, err => {
                if (err) {
                  console.log('Error writing file', err);
                } else {
                  console.log('Successfully wrote file');
                }
              });

        });
    } catch (err) {
        console.log('Error parsing JSON:', err);
    }
});


