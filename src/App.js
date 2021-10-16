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
  const [kLinux, setkLinux] = useState(-4);
  const [kEnsimElec, setkEnsimElec] = useState(-5);
  const [kMontage, setkMontage] = useState(-3);
  const [kPlacement, setkPlacement] = useState(-3);
  const [kDiriger, setkDiriger] = useState(-2);
  const [kPartirDuneBase, setkPartirDuneBase] = useState(-2);

  const [kEcrans, setkEcrans] = useState(3);
  const [kNetflix, setkNetflix] = useState(3);
  const [kEquipe, setkEquipe] = useState(3);
  const [kColocation, setkColocation] = useState(3);
  const [kArtistique, setkArtistique] = useState(5);
  const [kCreatif, setkCreatif] = useState(5);
  const [kSoirees, setkSoirees] = useState(2);

  const [kEnsimElec_MontagePC_Linux, setkEnsimElec_MontagePC_Linux] = useState(-7);
  const [kNetflix_PlusieursEcrans_Artistique, setkNetflix_PlusieursEcrans_Artistique] = useState(6);
  const [kLinux_Actualite_Devant_, setkLinux_Actualite_Devant_] = useState(-5);
  const [kCreatif_Artistique_Soirees_Equipe, setkCreatif_Artistique_Soirees_Equipe] = useState(6);
  const [kColocation_PartirDeZero, setkColocation_PartirDeZero] = useState(4);
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
          var Netflix_PlusieursEcrans_Artistique;
          var Linux_Actualite_Devant;
          var Creatif_Artistique_Soirees_Equipe;
          var Colocation_PartirDeZero;
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
          Netflix_PlusieursEcrans_Artistique = kNetflix * netflix + kEcrans * Ecrans +  kArtistique * parseInt(data[key].artistique)/4  ;

          Linux_Actualite_Devant = kPlacement * placement + kLinux * linux + kTechno * parseInt(data[key].techno)/4;
          Creatif_Artistique_Soirees_Equipe = kCreatif * parseInt(data[key].creatif)/4 + kSoirees * parseInt(data[key].soirees)/4 + kEquipe * parseInt(data[key].equipe)/4;

          Colocation_PartirDeZero = kColocation * Colocation + kPartirDuneBase * PartirDuneBase;
          Diriger_MontagePC = kDiriger * Diriger + kMontage * montagePc;
         
          // Calcul score
          score[key] = (   /*(kTechno * parseInt(data[key].techno)/4) + (kNetflix * netflix) + (kLinux * linux) + (kMontage * montagePc) + (kEquipe * parseInt(data[key].equipe)/4) + (kArtistique * parseInt(data[key].artistique)/4) + (kCreatif * parseInt(data[key].creatif)/4) + kPartirDuneBase * PartirDuneBase + kColocation*Colocation + (kSoirees* parseInt(data[key].soirees)/4) +kDiriger*Diriger +kPlacement*placement + kEcrans*Ecrans + kEnsimElec*EnsimElec*/
             (kNetflix_PlusieursEcrans_Artistique * Netflix_PlusieursEcrans_Artistique) + (kEnsimElec_MontagePC_Linux * EnsimElec_MontagePC_Linux) + (kLinux_Actualite_Devant_ * Linux_Actualite_Devant) + (kCreatif_Artistique_Soirees_Equipe * Creatif_Artistique_Soirees_Equipe)+ (kColocation_PartirDeZero * Colocation_PartirDeZero) + (kDiriger_MontagePC*Diriger_MontagePC))/10;  

          //Insertion des etudiants dans l'une des trois categories
          if ((score[key]) < -0.25) {

            donneesAtre[key] = [data[key].numEtu, score[key]];
            listEtudiantAstre.push(data[key].numEtu);
            donneesIps[key] = [data[key].numEtu, null];
            donneesNeutre[key] = [data[key].numEtu, null];

          } if ((score[key]) <= 0.25  && (score[key]) >= -0.25) {

            donneesNeutre[key] = [data[key].numEtu, score[key]];
            listEtudiantNeutre.push(data[key].numEtu);
            donneesAtre[key] = [data[key].numEtu, null];
            donneesIps[key] = [data[key].numEtu, null];

          } if ((score[key]) > 0.25) {

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
    [kNetflix, kTechno, kLinux, kEquipe, kCreatif, kArtistique, kMontage, kEnsimElec_MontagePC_Linux, kLinux_Actualite_Devant_, kNetflix_PlusieursEcrans_Artistique, kCreatif_Artistique_Soirees_Equipe,kPlacement,kEcrans, kEnsimElec, kEcrans,kColocation,kColocation_PartirDeZero,kDiriger_MontagePC,kDiriger, kPartirDuneBase])

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
        color: "#4dffc3"
      }],
     
     
  };

  const options2 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: 300,
      width: 700,
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
        ['IPS', listeNumIPS.length],
      ],
      colors: ["#990000", "#4dffc3", "#95CEFF"],
      legend: ["ASTRE", "Neutre", "IPS"]
    }],
    
    dataLabels: {
      enabled: true,
      format: '{point.name}'
    },
  };


  return (
    <>
    <h1>Astre-IPS</h1>
      <div className="range" >
        <div className="inputRange" >
          <label style={{ width: "5em" }}>Netflix</label>
          <input type="range" min="-5" max="5" value={kNetflix} onChange={(e) => { setkNetflix(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kNetflix}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Technologie</label>
          <input type="range" min="-5" max="5" value={kTechno} onChange={(e) => { setkTechno(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kTechno}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>Linux</label>
          <input type="range" min="-5" max="5" value={kLinux} onChange={(e) => { setkLinux(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kLinux}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>EnsimElec</label>
          <input type="range" min="-5" max="5" value={kEnsimElec} onChange={(e) => { setkEnsimElec(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kEnsimElec}</label>
        </div>
        <div className="inputRange" >
          <label style={{ width: "5em" }}>Ecrans</label>
          <input type="range" min="-5" max="5" value={kEcrans} onChange={(e) => { setkEcrans(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kEcrans}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Montage</label>
          <input type="range" min="-5" max="5" value={kMontage} onChange={(e) => { setkMontage(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kMontage}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>Artistique</label>
          <input type="range" min="-5" max="5" value={kArtistique} onChange={(e) => { setkArtistique(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kArtistique}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>Creatif</label>
          <input type="range" min="-5" max="5" value={kCreatif} onChange={(e) => { setkCreatif(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kCreatif}</label>
        </div>


        <div className="inputRange" >
          <label style={{ width: "5em" }}>Equipe</label>
          <input type="range" min="-5" max="5" value={kEquipe} onChange={(e) => { setkEquipe(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kEquipe}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Colocation</label>
          <input type="range" min="-5" max="5" value={kColocation} onChange={(e) => { setkColocation(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kColocation}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Placement</label>
          <input type="range" min="-5" max="5" value={kPlacement} onChange={(e) => { setkPlacement(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kPlacement}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Soirees</label>
          <input type="range" min="-5" max="5" value={kSoirees} onChange={(e) => { setkSoirees(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kSoirees}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Solution de zero</label>
          <input type="range" min="-5" max="5" value={kPartirDuneBase} onChange={(e) => { setkPartirDuneBase(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kPartirDuneBase}</label>
        </div>

        <div className="inputRange" >
          <label style={{ width: "5em" }}>Diriger</label>
          <input type="range" min="-5" max="5" value={kDiriger} onChange={(e) => { setkDiriger(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "3em" }}>{kDiriger}</label>
        </div>

      </div>

      <div className="range" >
        <div className="inputRange1" >
          <label style={{ width: "15em" }}>EnsimElec, Linux et MontagePc  + d'une fois</label>
          <input type="range" min="-10" max="10" value={kEnsimElec_MontagePC_Linux} onChange={(e) => { setkEnsimElec_MontagePC_Linux(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kEnsimElec_MontagePC_Linux}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}>Creatif, soirees ENSIM et equipe</label>
          <input type="range" min="-10" max="10" value={kCreatif_Artistique_Soirees_Equipe} onChange={(e) => { setkCreatif_Artistique_Soirees_Equipe(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kCreatif_Artistique_Soirees_Equipe}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}> Netflix, artistique  et 2 écrans ou + </label>
          <input type="range" min="-10" max="10" value={kNetflix_PlusieursEcrans_Artistique} onChange={(e) => { setkNetflix_PlusieursEcrans_Artistique(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kNetflix_PlusieursEcrans_Artistique}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}> Linux, Suivre la technologie et placement devant</label>
          <input type="range" min="-10" max="10" value={kLinux_Actualite_Devant_} onChange={(e) => { setkLinux_Actualite_Devant_(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kLinux_Actualite_Devant_}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}>Colocation et Commencer une solution de zero</label>
          <input type="range" min="-10" max="10" value={kColocation_PartirDeZero} onChange={(e) => { setkColocation_PartirDeZero(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kColocation_PartirDeZero}</label>
        </div>

        <div className="inputRange1" >
          <label style={{ width: "15em" }}>Diriger et MontagePC + d'une fois</label>
          <input type="range" min="-10" max="10" value={kDiriger_MontagePC} onChange={(e) => { setkDiriger_MontagePC(e.target.value) }} />
          <label style={{ width: "5em", marginLeft: "5em" }}>{kDiriger_MontagePC}</label>
        </div>
      </div>
      <figure className="graphes">
        <HighchartsReact highcharts={Highcharts} options={options2} />
      </figure>

      <HighchartsReact highcharts={Highcharts} options={options} />

    </>
  );
}

export default App;
