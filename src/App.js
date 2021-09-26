import './App.css';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ItemSeries from 'highcharts/modules/item-series';

function App() {

  const [resultat, setResultat] = useState([]);
  const [parliament, setParliament] = useState([]);
  const [parliamentIPS, setParliamentIPS] = useState([]);
  const [parliamentASTRE, setParliamentASTRE] = useState([]);
  const [playedOnce, setPlayedOnce] = useState(false);
  const [kNetflix, setkNetflix] = useState(4);
  const [kTechno, setkTechno] = useState(4);
  const [kLinux, setkLinux] = useState(1);
  const [kMontage, setkMontage] = useState(3);
  const [kArtistique, setkArtistique] = useState(2);
  const [kCreatif, setkCreatif] = useState(5);
  const [kEquipe, setkEquipe] = useState(2);






  var result = [];
  let resultIPS = 0;
  let resultASTRE = 0;
  const [dataAstre, setdataAstre] = useState(0);
  const [dataIPS, setdataIPS] = useState(0);


  var result1 = [];

  var score = [];
  let color = [];

  //let kTechno = 4;
  /* let kLinux = 1;
   let kMontage = 3;
   let kArtistique = 2;
   let kCreatif = 5;
   let kEquipe = 2;*/

  let colorAstre = "#BE3075";
  let colorIPS = "#009EE0";
  let colorNeutre = "#FFED00";


  let labelAstre = "ASTRE";
  let labelIPS = "IPS";
  let labelNeutre = "neutre";


  useEffect(() => {
    fetch('http://localhost:3005/etudiants')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var keys = Object.keys(data);
        var values = Object.values(data);
        console.log(keys);
        console.log(values);

        keys.forEach(function (key) {
          var netflix;
          var linux;
          var placement;
          var montagePc;




          if (data[key].netflix == "oui") {
            netflix = 1;
            console.log(netflix);

          } else {
            netflix = -1;
            console.log(netflix);

          }

          if (data[key].linux == "linux") {
            linux = 1;
            console.log(linux);

          } else {
            linux = -1;
            console.log(linux);

          }

          if (data[key].placement == "PLutôt devant") {
            placement = -1;
            console.log(placement);
          } else {
            placement = 1;
            console.log(placement);

          }

          if (data[key].montagePc == "Plus d'une fois") {
            montagePc = 1;
            console.log(montagePc);

          } else {
            montagePc = -1;
            console.log(montagePc);

          }
          score[key] = -(kTechno * parseInt(data[key].techno)) + (kNetflix * netflix) - (kLinux * linux) - (kMontage * montagePc) - (kEquipe * parseInt(data[key].equipe)) + (kArtistique * parseInt(data[key].artistique)) + (kCreatif * parseInt(data[key].creatif));



          let label;

          if (parseInt(score[key]) <= 0) {

            console.log(score[key]);

            color[key] = colorAstre;
            label = labelAstre;
            resultASTRE++;




          } /*if(score[key] ==0){

            color =colorNeutre;
            label = labelNeutre;

          }*/  if (parseInt(score[key]) > 0) {
            color[key] = colorIPS;
            label = labelIPS;
            resultIPS++;


          }






        });

        result = Object.keys(data).map((key) => [data[key].numEtu, score[key]]);

        result1 = Object.keys(data).map((key) => [data[key].numEtu, 1, color[key], score[key]]);
       /* resultIPS = Object.keys(resultIPS).map((key) => [resultIPS[key].numEtu, resultIPS.length, "#009EE0"]);
        resultASTRE = Object.keys(resultASTRE).map((key) => [resultASTRE[key].numEtu, resultIPS.length, "#BE3075"]);*/




        console.log(result);
        console.log(result1);
        console.log(resultIPS);
        console.log(resultASTRE);
        setdataAstre(resultASTRE);
        setdataIPS(resultIPS);




        setResultat(result);
        setParliament(result1);


      })

  },
    [kNetflix, kTechno, kLinux, kEquipe, kCreatif, kArtistique, kMontage])





  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: resultat
      }
    ]
  };

  ItemSeries(Highcharts);

 const options1 = {

    chart: {
      type: 'item'
    },

    title: {
      text: 'Highcharts item chart'
    },

    subtitle: {
      text: 'Parliament visualization'
    },

    legend: {
      labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
    },
    series: [{
      name: 'Representatives',
      keys: ['name', 'y', 'color', 'label'],
      data:  [['ASTRE', dataAstre, '#990000', 'Nombre d\'ASTRE'],
      ['IPS', dataIPS,'#95CEFF' , 'Nombre de personne neutre'],],
      dataLabels: {
        enabled: true,
        format: '{point.label}'
      },

      // Circular options
      center: ['50%', '88%'],
      size: '170%',
      startAngle: -100,
      endAngle: 100
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 600
        },
        chartOptions: {
          series: [{
            dataLabels: {
              distance: -30
            }
          }]
        }
      }]
    }
  };



  return (
    <>
      <h1>Hello</h1>
      <div className="range" style={{ display: "flex" }}>
        <p>Netflix</p>
        <input type="range" min="-5" max="10" value={kNetflix} onChange={(e) => { setkNetflix(e.target.value) }} />
        <p>{kNetflix}</p>

        <p>Techno</p>
        <input type="range" min="-5" max="10" value={kTechno} onChange={(e) => { setkTechno(e.target.value) }} />
        <p>{kTechno}</p>

        <p>Linux</p>
        <input type="range" min="-5" max="10" value={kLinux} onChange={(e) => { setkLinux(e.target.value) }} />
        <p>{kLinux}</p>

        <p>Montage</p>
        <input type="range" min="-5" max="10" value={kMontage} onChange={(e) => { setkMontage(e.target.value) }} />
        <p>{kMontage}</p>


        <p>Artistique</p>
        <input type="range" min="-5" max="10" value={kArtistique} onChange={(e) => { setkArtistique(e.target.value) }} />
        <p>{kArtistique}</p>

        <p>Creatif</p>
        <input type="range" min="-5" max="10" value={kCreatif} onChange={(e) => { setkCreatif(e.target.value) }} />
        <p>{kCreatif}</p>

        <p>Equipe</p>
        <input type="range" min="-5" max="10" value={kEquipe} onChange={(e) => { setkEquipe(e.target.value) }} />
        <p>{kEquipe}</p>
      </div>
      
      <HighchartsReact highcharts={Highcharts} options={options1} />
      <HighchartsReact highcharts={Highcharts} options={options} />

    </>
  );
}

export default App;
