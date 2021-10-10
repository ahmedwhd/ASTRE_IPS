import './App.css';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ItemSeries from 'highcharts/modules/item-series';

function App() {


  const [listenum, setlistenum] = useState([]);
  const [dataAStre, setdataAStre] = useState([]);
  const [dataIps, setdataIps] = useState([]);
  const [dataNeutre, setdataNeutre] = useState([]);


  const [kTechno, setkTechno] = useState(-3);
  const [kLinux, setkLinux] = useState(-5);
  const [kEnsimElec, setkEnsimElec] = useState(-5);
  const [kMontage, setkMontage] = useState(-3);
  const [kPlacement, setkPlacement] = useState(-3);
  const [kDiriger, setkDiriger] = useState(-2);
  const [kPartirDeBase, setkPartirDeBase] = useState(-2);

  const [kEcrans, setkEcrans] = useState(4);
  const [kNetflix, setkNetflix] = useState(3);
  const [kEquipe, setkEquipe] = useState(4);
  const [kColocation, setkColocation] = useState(3);
  const [kArtistique, setkArtistique] = useState(4);
  const [kCreatif, setkCreatif] = useState(5);
  const [kSoirees, setkSoirees] = useState(3);

  const [kEnsimElec_MontagePC_Linux, setkEnsimElec_MontagePC_Linux] = useState(-8);
  const [kNetflix_PlusieursEcrans, setkNetflix_PlusieursEcrans] = useState(5);
  const [kLinux_Actualite_Devant_, setkLinux_Actualite_Devant_] = useState(-5);
  const [kCreatif_Artistique_Soirees_Equipe_Mac, setkCreatif_Artistique_Soirees_Equipe_Mac] = useState(7);
  const [kColocation_PartirDeBase, setkColocation_PartirDeBase] = useState(3);
  const [kDiriger_MontagePC, setkDiriger_MontagePC] = useState(-2);

  var donneesAtre = [];
  var donneesIps = [];
  var donneesNeutre = [];

  let listEtudiant = [];
  let listEtudiantAstre = [];
  let listEtudiantIps = [];
  let listEtudiantNeutre = [];

  const [listeNumIPS, setlisteNumIPS] = useState([]);
  const [listeNumAstre, setlisteNumAstre] = useState([]);
  const [listeNumNeutre, setlisteNumNeutre] = useState([]);



  var score = [];

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
          var EnsimElec;
          var Ecrans;
          var Diriger;
          var Colocation;
          var PartirDuneBase

          var BDE;
          var BDLC;
          var EnsimElec_MontagePC_Linux;
          var Netflix_PlusieursEcrans;
          var Linux_Actualite_Devant;
          var Creatif_Artistique_Soirees_Equipe_Mac;
          var Colocation_PartirDeBase;
          var Diriger_MontagePC;

          //Recuperation de las liste des assos de l'etudiant
          var assos = data[key].assos;
          var listeAssos = assos.split(";");

          //Prelevement des criteres simples
          if (listeAssos.includes("EnsimElec")) {
            EnsimElec = 1;

          } else {
            EnsimElec = -1;
          }

          if (listeAssos.includes("BDE")) {
            BDE = 1;
          } else {
            BDE = -1;
          }

          if (listeAssos.includes("BDLC")) {
            BDLC = 1;
          } else {
            BDLC = -1;
          }


          if (data[key].netflix == "Oui") {
            netflix = 1;
          } else {
            netflix = -1;
          }

          if (data[key].linux == "Linux") {
            linux = 1;
          } else if (data[key].linux == "Windows") {
            linux = 0;
          }
          else {
            linux = -1;
          }

          if (data[key].placement == "PLutôt devant") {
            placement = 1;
          } else {
            placement = -1;
          }

          if (data[key].montagePc == "Plus d'une fois") {
            montagePc = 1;
          } else {
            montagePc = -1;
          }

          if (data[key].nbEcrans == "Oui") {
            Ecrans = 1;
          } else {
            Ecrans = -1;
          }

          if (data[key].diriger == "Diriger") {
            Diriger = 1;
          } else {
            Diriger = -1;
          }

          if (data[key].colocation == "Oui") {
            Colocation = 1;
          } else {
            Colocation = -1;
          }

          if (data[key].partirDuneBase == "A partir d'une base") {
            PartirDuneBase = 1;
          } else {
            PartirDuneBase = -1;
          }

          // Hypotheses
          EnsimElec_MontagePC_Linux = kEnsimElec * EnsimElec + kMontage * montagePc + kLinux * linux;
          Netflix_PlusieursEcrans = kNetflix * netflix + kEcrans * Ecrans;
          console.log(Netflix_PlusieursEcrans);

          Linux_Actualite_Devant = kPlacement * placement + kLinux * linux;
          Creatif_Artistique_Soirees_Equipe_Mac = kCreatif * parseInt(data[key].creatif)/4 /*+ kArtistique * parseInt(data[key].artistique)*/ + kSoirees * parseInt(data[key].soirees)/4 + kEquipe * parseInt(data[key].equipe)/4 /*+ kLinux * linux*/;

          Colocation_PartirDeBase = kColocation * Colocation + kPartirDeBase * PartirDuneBase;
          Diriger_MontagePC = kDiriger * Diriger + kMontage * montagePc;
         
          // Calcul score
          score[key] = ( (kEnsimElec_MontagePC_Linux * EnsimElec_MontagePC_Linux) + (kTechno * parseInt(data[key].techno)/4) + (kNetflix * netflix) + (kLinux * linux) + (kMontage * montagePc) + (kEquipe * parseInt(data[key].equipe)/4) + (kArtistique * parseInt(data[key].artistique)/4) + (kCreatif * parseInt(data[key].creatif)/4) + kPartirDeBase * PartirDuneBase + kColocation*Colocation + (kSoirees* parseInt(data[key].soirees)/4) +kDiriger*Diriger
            + (kNetflix_PlusieursEcrans * Netflix_PlusieursEcrans) + (kLinux_Actualite_Devant_ * Linux_Actualite_Devant) + (kCreatif_Artistique_Soirees_Equipe_Mac * Creatif_Artistique_Soirees_Equipe_Mac))+ (kColocation_PartirDeBase * Colocation_PartirDeBase) + (kDiriger_MontagePC*Diriger_MontagePC)/10;  

          //Insertion des etudiants dans l'une des trois categories
          if ((score[key]) < 0) {

            donneesAtre[key] = [data[key].numEtu, score[key]];
            listEtudiantAstre.push(data[key].numEtu);
            donneesIps[key] = [data[key].numEtu, null];
            donneesNeutre[key] = [data[key].numEtu, null];

          } if ((score[key]) == 0) {

            donneesNeutre[key] = [data[key].numEtu, score[key]];
            listEtudiantNeutre.push(data[key].numEtu);
            donneesAtre[key] = [data[key].numEtu, null];
            donneesIps[key] = [data[key].numEtu, null];

          } if ((score[key]) > 0) {

            donneesIps[key] = [data[key].numEtu, score[key]];
            listEtudiantIps.push(data[key].numEtu);
            donneesAtre[key] = [data[key].numEtu, null];
            donneesNeutre[key] = [data[key].numEtu, null];
          }
        });

        Object.keys(data).map((key) => { var num = data[key].numEtu; listEtudiant.push(num) });

        setdataAStre(donneesAtre);
        setdataIps(donneesIps);
        console.log(donneesNeutre);
        setdataNeutre(donneesNeutre);

        setlistenum(listEtudiant);
        setlisteNumAstre(listEtudiantAstre);
        setlisteNumIPS(listEtudiantIps);
        setlisteNumNeutre(listEtudiantNeutre);
        console.log(listenum);
        console.log(listEtudiantAstre);

      })
  },
    [kNetflix, kTechno, kLinux, kEquipe, kCreatif, kArtistique, kMontage, kEnsimElec_MontagePC_Linux, kLinux_Actualite_Devant_, kNetflix_PlusieursEcrans, kCreatif_Artistique_Soirees_Equipe_Mac,kPlacement,kEcrans, kEnsimElec, kEcrans,kColocation])

  const options = {
    chart: {
      type: 'bar',
      height: 1500,
      width: 1500,
    },
    title: {
      text: 'Score des etudiants'
    },
    xAxis:
      [{
        categories: listenum,
      },
      {
        opposite: true,
        reversed: false,
        categories: listenum,
        linkedTo: 0,
      }
      ],
    yAxis:
    {
      title: "score",
    },
    series:
      [{
        name: 'ASTRE ' + listeNumAstre.length,
        data: dataAStre,
        color: '#990000',
      }, {
        name: 'IPS ' + listeNumIPS.length,
        data: dataIps,
        color: "#95CEFF"
      },
      {
        name: 'Neutre ' + listeNumNeutre.length,
        data: dataNeutre,
        color: "4dffc3"
      }],
  };

  ItemSeries(Highcharts);

  const options1 = {
    chart: {
      type: 'item'
    },
    title: {
      text: 'Prediction choix des options'
    },
    subtitle: {
      text: ''
    },
    legend: {
      labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
    },
    series: [{
      name: 'Representatives',
      keys: ['name', 'y', 'color', 'label'],
      data: [['ASTRE', listeNumAstre.length, '#990000', 'Nombre d\'ASTRE'],
      ['IPS', listeNumIPS.length, '#95CEFF', 'Nombre d\'IPS'],
      ['Neutre', listeNumNeutre.length, '#4dffc3', 'Nombre de neutre']],
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


  const options2 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Prediction <br>choix des <br> options',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '<b>{point.y:f}</b> : {point.percentage:.1f}% '
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Browser share',
      innerSize: '50%',
      data: [

        ['ASTRE', listeNumAstre.length],
        ['Neutre', listeNumNeutre.length],
        ['IPS', listeNumIPS.length, "red"],

      ],
      colors: ["#990000", "#4dffc3", "#95CEFF"]
    }]
  };


  return (
    <>
      <h1>Hello</h1>
      <div className="range" >
        <div className="inputRange" >
          <label style={{ width: "5em" }}>Netflix</label>
          <input type="range" min="-5" max="10" value={kNetflix} onChange={(e) => { setkNetflix(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kNetflix}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Techno</label>
          <input type="range" min="-5" max="10" value={kTechno} onChange={(e) => { setkTechno(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kTechno}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>Linux</label>
          <input type="range" min="-5" max="10" value={kLinux} onChange={(e) => { setkLinux(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kLinux}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>EnsimElec</label>
          <input type="range" min="-5" max="10" value={kEnsimElec} onChange={(e) => { setkEnsimElec(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kEnsimElec}</label>
        </div>
        <div className="inputRange" >
          <label style={{ width: "5em" }}>Ecrans</label>
          <input type="range" min="-5" max="10" value={kEcrans} onChange={(e) => { setkEcrans(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kEcrans}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Montage</label>
          <input type="range" min="-5" max="10" value={kMontage} onChange={(e) => { setkMontage(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kMontage}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>Artistique</label>
          <input type="range" min="-5" max="10" value={kArtistique} onChange={(e) => { setkArtistique(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kArtistique}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>Creatif</label>
          <input type="range" min="-5" max="10" value={kCreatif} onChange={(e) => { setkCreatif(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kCreatif}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>Equipe</label>
          <input type="range" min="-5" max="10" value={kEquipe} onChange={(e) => { setkEquipe(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kEquipe}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Colocation</label>
          <input type="range" min="-5" max="10" value={kColocation} onChange={(e) => { setkColocation(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kColocation}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Placement</label>
          <input type="range" min="-5" max="10" value={kPlacement} onChange={(e) => { setkPlacement(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kPlacement}</label>
        </div>

      </div>

      <div className="range" >
        <div className="inputRange1" >
          <label style={{ width: "15em" }}>EnsimElec + Linux + MontagePc</label>
          <input type="range" min="-10" max="10" value={kEnsimElec_MontagePC_Linux} onChange={(e) => { setkEnsimElec_MontagePC_Linux(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kEnsimElec_MontagePC_Linux}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}>Creatif, soirees et equipe</label>
          <input type="range" min="-5" max="10" value={kCreatif_Artistique_Soirees_Equipe_Mac} onChange={(e) => { setkCreatif_Artistique_Soirees_Equipe_Mac(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kCreatif_Artistique_Soirees_Equipe_Mac}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}> Netflix et plus d'un ecran + </label>
          <input type="range" min="-5" max="10" value={kNetflix_PlusieursEcrans} onChange={(e) => { setkNetflix_PlusieursEcrans(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kNetflix_PlusieursEcrans}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}> Linux, actualite et devant</label>
          <input type="range" min="-10" max="10" value={kLinux_Actualite_Devant_} onChange={(e) => { setkLinux_Actualite_Devant_(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kLinux_Actualite_Devant_}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}>Colocation et PartirDeBase</label>
          <input type="range" min="-5" max="10" value={kColocation_PartirDeBase} onChange={(e) => { setkColocation_PartirDeBase(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kColocation_PartirDeBase}</label>
        </div>
      </div>
      <figure className="graphes">
        <HighchartsReact highcharts={Highcharts} options={options1} />
        <HighchartsReact highcharts={Highcharts} options={options2} />
      </figure>

      <HighchartsReact highcharts={Highcharts} options={options} />

    </>
  );
}

export default App;
