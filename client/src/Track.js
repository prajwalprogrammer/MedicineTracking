import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import LoadingSpinner from "./LoadingSpinner";
import QRCode from "react-qr-code";


function Track() {
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
  const [TrackTillSold, showTrackTillSold] = useState(false);
  const [TrackTillRetail, showTrackTillRetail] = useState(false);
  const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
  const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
  const [TrackTillRMS, showTrackTillRMS] = useState(false);
  const [TrackTillOrdered, showTrackTillOrdered] = useState(false);
  const [QRData, setQRData] = useState(null);
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  // useEffect(() => {
  //   AddData();
  // }, [TrackTillManufacture]);

  // const AddData = () => {
  //   if (!TrackTillManufacture) return;
  //   const dat =
  //     "Medicine:Medicine ID: " +
  //     MED[ID].id +
  //     " Name: " +
  //     MED[ID].name +
  //     " Description: " +
  //     MED[ID].description +
  //     " Current stage: " +
  //     MedStage[ID];
  //   console.log(dat);
  //   setQRData(dat);
  // };
  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i + 1] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i + 1] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  if (QRData) {
    return (
      <div className="container-xl">
      <h1 className="qrName">Scan the QR Code</h1>
        <br/>
        <QRCode title="QRCode" value={QRData} />
        <br/>
        <br/>
        <br/>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (loader) {
    return <LoadingSpinner />;
  }
  if (TrackTillSold) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
          <p className="symbolName">M</p>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span className="arrow">&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span className="arrow">&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
          <span className="arrow">&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Retailed by:</u>
            </h4>
            <p>
              <b>Retailer ID: </b>
              {RET[MED[ID].RETid].id}
            </p>
            <p>
              <b>Name:</b> {RET[MED[ID].RETid].name}
            </p>
            <p>
              <b>Place: </b>
              {RET[MED[ID].RETid].place}
            </p>
          </article>
          <span className="arrow">&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Sold</u>
            </h4>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillSold(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillRetail) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Retailed by:</u>
            </h4>
            <p>
              <b>Retailer ID: </b>
              {RET[MED[ID].RETid].id}
            </p>
            <p>
              <b>Name:</b> {RET[MED[ID].RETid].name}
            </p>
            <p>
              <b>Place: </b>
              {RET[MED[ID].RETid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRetail(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillDistribution) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillDistribution(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillManufacture) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillManufacture(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillRMS) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRMS(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillOrdered) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
          <hr />
          <br />
          <h5>Medicine Not Yet Processed...</h5>
          <button
            onClick={() => {
              showTrackTillOrdered(false);
            }}
            className="btn btn-outline-success btn-sm"
          >
            Track Another Item
          </button>
          <span
            onClick={() => {
              history.push("/");
            }}
            className="btn btn-outline-danger btn-sm"
          >
            {" "}
            HOME
          </span>
        </article>
        {/* <section className="row">
                    
                    <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                </section> */}
      </div>
    );
  }
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const redirect_to_home = () => {
    history.push("/");
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    var ctr = await SupplyChain.methods.medicineCtr().call();
    console.log(ctr, " ", ID);
    if (!(ID > 0 && ID <= ctr)) alert("Invalid Medicine ID!!!");
    else {
      // eslint-disable-next-line
      if (MED[ID].stage == 5) showTrackTillSold(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 4) showTrackTillRetail(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 3) showTrackTillDistribution(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 2) showTrackTillManufacture(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 1) showTrackTillRMS(true);
      else showTrackTillOrdered(true);
    }
  };

  const showQR = () => {
    console.log("first");
    const dat =
      "Medicine:Medicine ID: " +
      MED[ID].id +
      "\n Name: " +
      MED[ID].name +
      " Description: " +
      MED[ID].description +
      " Current stage: " +
      MedStage[ID];


   const dummy ="Medicine Details :\n Medicine ID: " + MED[ID].id + "\n Name:" +MED[ID].name +"\n Description: " +MED[ID].description + "\n\nRaw Materials Supplied by: \nSupplier ID: "+ RMS[MED[ID].RMSid].id+ " \n Name: " + RMS[MED[ID].RMSid].name +"\nPlace:"+ RMS[MED[ID].RMSid].place+"  \n -> \n Manufactured by:\n Manufacturer ID: "+ MAN[MED[ID].MANid].id+"\n Name: "+MAN[MED[ID].MANid].name+" \n Place: "+MAN[MED[ID].MANid].place+" \n -> \n Distributed by: \n Distributor ID: "+DIS[MED[ID].DISid].id+" \nName: "+DIS[MED[ID].DISid].name+" \nPlace: "+DIS[MED[ID].DISid].place+" \n -> \n Retailed by: \n Retailer ID: "+RET[MED[ID].RETid].id+" \nName: "+RET[MED[ID].RETid].name+" \nPlace: "+RET[MED[ID].RETid].place+" \n -> Sold to You";

    setQRData(dummy);
    // showTrackTillManufacture(true);
    // return <QRCode title="GeeksForGeeks" value={QRData} />;
  };

  return (
    <div className="trackBlock">
      <h1 className="registerhead">Track your medicine here</h1>
      <div className="registerBlock">
        <div className="card">
          <span className="spanRegister">
            <b>Current Account Address:</b> {currentaccount}
          </span>
          <span
            onClick={redirect_to_home}
            className="btn btn-outline-danger btn-sm"
          >
            HOME
          </span>
        </div>
      </div>
      {/* <span><b>Current Account Address:</b> {currentaccount}</span> */}
      {/* <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm"> HOME</span> */}
      <table className="table table-sm table-bordered tableTrack">
        <thead>
          <tr>
            <th scope="col">Medicine ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Processing Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h5 className="trackTitle">Enter Medicine ID to Track it</h5>

      <form onSubmit={handlerSubmit}>
        <input
          className="form-control-sm supplyInp"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Medicine ID"
          required
        />
        <button
          className="btn btn-outline-success btn-sm trackBtn"
          onSubmit={handlerSubmit}
        >
          Track
        </button>
      </form>
      <button
        className="btn btn-outline-success btn-sm trackBtn"
        onClick={() => showQR()}
      >
        Scan QR
      </button>
    </div>
  );
}

export default Track;

/*
var dat = "Medicine:
Medicine ID: " + {MED[ID].id} +
"Name: " +{MED[ID].name} + " 
Description: " +{MED[ID].description} + "
Current stage: " + {MedStage[ID]}"

Raw Materials Supplied by:
Supplier ID: 3

Name: ddd

Place: India

➔
Manufactured by:
Manufacturer ID: 1

Name: Ayush

Place: Mumbai

➔
Manufactured by:
Manufacturer ID: 1

Name: Ayush

Place: Mumbai
➔
Manufactured by:
Manufacturer ID: 1

Name: Ayush

Place: Mumbai
➔
Manufactured by:
Manufacturer ID: 1

Name: Ayush

Place: Mumbai

➔
Manufactured by:
Manufacturer ID: 1

Name: Ayush

Place: Mumbai
"

*/
