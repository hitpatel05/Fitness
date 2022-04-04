import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { verifytokenCall } from '../Others/Utils.js';
import swal from 'sweetalert';
import { apiUrl, PORT } from '../../environment/environment';

function Trainer({ type, flterValue }) {
    const history = useHistory();
    const [List, setList] = useState([]);
    const [workoutList, setWorkOutList] = useState([]);
    const [status, setStatus] = useState(1);
    const [filterObj, setFilterObj] = useState({ availablestatus: status, isfilter: false, isStandardTrainers: true, ratings: "", typeOfWorkout: "", gender: "" });
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        document.body.classList.add('scrollHide');
        callToken();
        getTypeOfWorkout();
        GetList(1);
    }, []);

    const callToken = () => {
        verifytokenCall();
        setTimeout(() => {
            callToken();
        }, 3000);
    }

    const loadData = async (list, status) => {
        let finalList = [];
        for (var i = 0; i < 3; i++) {
            finalList.push({ "id": i + 1, "List": [], "bookmarktrainerList": list.bookmarktrainer });
        }
        for (var j = 0; j < list.length; j++) {
            for (var k = 0; k < finalList.length; k++) {
                if (j < list.length)
                    finalList[k].List.push(list[j]);
                if (k < finalList.length - 1)
                    j++;
            }
        }
        if (list.length === 0) {
            const updatedList = <div className="col-12">
                <h4 className="no-record-box">
                    <i className="fa fa-exclamation-triangle alerticon"></i>
                    No Record Found
                </h4>
            </div>
            setList(updatedList);
            setIsLoader(false);
        }
        else {
            const updatedList = finalList.map((listitem, index) => {
                return (<div key={'mainkey' + index} className="col-xl-4 col-md-6 col-12">
                    <div className="loading d-none">
                        <div className="mainloader"></div>
                    </div>
                    <div className="wrap" style={{ height: '95%', overflow: 'auto', paddingRight: '5px' }}>
                        <div className="frame smart" id={'smart' + index} style={{ overflow: 'auto', height: '800px', scrollbarWidth: 'none' }}>
                            <ul className="items">
                                {listitem.List.filter(tainerlist => tainerlist.availablestatus === status || status === 0).map((tainerlist, sindex) => {
                                    // if (status === 0 || tainerlist.availablestatus === status) {
                                    return (<li key={'subkey' + sindex} className="col-12 p-0">
                                        <div title={tainerlist.firstname}>
                                            <div className="banner-img">
                                                <img src={`${apiUrl + PORT + tainerlist.coverprofile}`} onError={(e) => { e.target.src = "/img/Back-No-Image.png" }} alt="" />
                                                <div className="img-content">
                                                    <div className="banner-i d-flex justify-content-between">
                                                        <span>{tainerlist.type || ''}</span>
                                                        <button className="bookmark" onClick={(e) => { e.preventDefault(); bookmarkTainer(tainerlist, status); }}>
                                                            <i className={`${(listitem.bookmarktrainerList.filter(f => f === tainerlist._id).length > 0) ? "fa" : "far"} fa-bookmark`}></i>
                                                        </button>
                                                    </div>
                                                    <div className="banner-user">
                                                        <div className="d-sm-flex justify-content-between">
                                                            <div className="d-flex">
                                                                <Link to={'/trainerinformation?Id=' + tainerlist._id} title={tainerlist.firstname}>
                                                                    <div className="user-pro">
                                                                        <img src={`${apiUrl + PORT + tainerlist.profile}`} onError={(e) => { e.target.src = "/img/Small-no-img.png" }} alt="" />
                                                                    </div>
                                                                    <div className="">
                                                                        <span>{tainerlist.firstname}</span>
                                                                        <i className={tainerlist.availablestatus === 1 ? "fas fa-circle text-success circle-i" : (tainerlist.availablestatus === 2 ? "fas fa-circle text-danger circle-i" : "fas fa-circle text-secondary circle-i")}></i>
                                                                        <Rating ratingValue={tainerlist.rankingtrainer} size="20" readonly="true" allowHover="false" allowHalfIcon="true" />
                                                                        <p className="mb-0">
                                                                            {tainerlist.trainingstyle !== "" && tainerlist.trainingstyle ?
                                                                                <span>{tainerlist.trainingstyle.substr(1, 10)}</span> : <></>
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="">
                                                                <Link to="/mysession" className="banner-btn">Start Training</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>)
                                    // } else {
                                    //         return <></>
                                    //     }
                                })}
                            </ul>
                        </div>
                    </div>
                </div>)
            });
            setIsLoader(false);
            setList(updatedList);
        }
    };

    const bookmarkTainer = async (e, status) => {
        const formData = new FormData();
        formData.append('tainerId', e._id);
        setIsLoader(true);
        await axios.post(`${apiUrl}${PORT}/client/bookmarktrainer`, formData, {
        }).then(function (response) {
            setIsLoader(false);
            if (response.data.status === 1) {
                GetList(status);
            }
            else {
                swal({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error",
                    button: true
                });
            }
        }).catch(function (error) {
            console.log(error);
            setIsLoader(false);
        });
    }

    async function GetList(status) {
        setIsLoader(true);
        var obj = { availablestatus: status, isfilter: false };
        if (flterValue !== "") { obj.name = flterValue; obj.isfilter = true; }

        await axios.post(`${apiUrl}${PORT}/trainer/trainer/trainerlist`, obj).then(function (response) {
            if (response.data.status === 1) {
                response.data?.result?.trainerlist.forEach(element => {
                    var seesionrankinglist = response.data?.result?.rankinglist.filter(s => s.trainerid === element._id).map(x => x.sessionrating);
                    element.rankingtrainer = (seesionrankinglist.length > 0) ? (((seesionrankinglist.reduce((a, v) => a = a + v.rate, 0)) / seesionrankinglist.length)) : 0;
                });
                response.data.result.trainerlist.bookmarktrainer = response.data?.result?.client_data?.bookmarktrainer;
                loadData(response.data?.result?.trainerlist, status);
            }
        }).catch(function (error) {
            console.log(error);
            setIsLoader(false);
        });
    };

    async function getTypeOfWorkout() {
        setIsLoader(true);
        await axios.get(`${apiUrl}${PORT}/trainer/trainer/getworkoutcategory`, {}, {})
            .then(function (response) {
                if (response.data.status === 1)
                    setWorkOutList(response.data.result);
                else {
                    swal({
                        title: "Error!",
                        text: response.data.message,
                        icon: "error",
                        button: true
                    });
                }
            }).catch(function (error) {
                setIsLoader(false);
                window.alert(error);
            });
    };

    const onSubmitFilter = async () => {
        filterObj.isfilter = true;
        setIsLoader(true);
        await axios.post(`${apiUrl}${PORT}/trainer/trainer/trainerlist`, filterObj).then(function (response) {
            if (response.data.status === 1) {
                response.data?.result?.trainerlist.forEach(element => {
                    var seesionrankinglist = response.data?.result?.rankinglist.filter(s => s.trainerid === element._id).map(x => x.sessionrating);
                    element.rankingtrainer = (seesionrankinglist.length > 0) ? (((seesionrankinglist.reduce((a, v) => a = a + v.rate, 0)) / seesionrankinglist.length)) : 0;
                });
                response.data.result.trainerlist.bookmarktrainer = response.data?.result?.client_data?.bookmarktrainer;
                if (filterObj?.ratings) {
                    if (filterObj?.ratings === "Ascending") {
                        response.data?.result?.trainerlist.sort((a, b) => {
                            return a.rankingtrainer > b.rankingtrainer;
                        });
                    } else {
                        response.data?.result?.trainerlist.sort((a, b) => {
                            return a.rankingtrainer < b.rankingtrainer;
                        });
                    }
                }
                loadData(response.data?.result?.trainerlist, status);
            }
            else {
                swal({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error",
                    button: true
                })
            }
        }).catch(function (error) {
            setIsLoader(false);
            console.log(error);
        });
    }

    const handleChange = (objName, val) => {
        if (objName === "isEliteTrainers")
            setFilterObj(prevState => ({ ...prevState, "isStandardTrainers": false }));
        else {
            if (val)
                setFilterObj(prevState => ({ ...prevState, [objName]: val }));
        }
    }

    return (
        <>{isLoader &&
            <div className="loading">
                <div className="mainloader"></div>
            </div>
        }
            <div className="container-fluid">
                <div className="col-12 p-0">
                    <div className="row mb-3">
                        <div className="col-md-2 col-12">
                            <h1 className="main_title">Trainers</h1>
                        </div>
                        <div className="col-md-10 col-12">
                            <ul className="filter_nav list-inline">
                                <li className={`list-inline-item ${status === 1 ? "active" : ""}`} onClick={() => { GetList(1); setStatus(1) }}> <button>Available Now</button></li>
                                <li className={`list-inline-item ${status === 2 ? "active" : ""}`} onClick={() => { GetList(2); setStatus(2) }}><button>Online</button></li>
                                <li className={`list-inline-item ${status === 0 ? "active" : ""}`} onClick={() => { GetList(0); setStatus(0) }}><button>All</button></li>
                            </ul>
                        </div>
                    </div>
                    {type === "openFilter" &&
                        <div>
                            <div className="row filter-box">
                                <div className="col-md-5 col-12 mb-3">
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" onChange={(e) => { handleChange("isStandardTrainers", e.currentTarget.checked) }} />
                                        <label className="custom-control-label" htmlFor="customRadioInline1">Standard Trainers</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" onChange={(e) => { handleChange("isEliteTrainers", e.currentTarget.checked) }} />
                                        <label className="custom-control-label" htmlFor="customRadioInline2">Elite Trainers</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row filter-input mb-3">
                                        <div className="col-md-3 col-12">
                                            <div className="position-relative">
                                                <label>Ratings</label>
                                                <select className="input-box" onChange={(e) => { handleChange("ratings", e.target.value) }}>
                                                    <option>Ascending</option>
                                                    <option>Descending </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-12">
                                            <div className="position-relative">
                                                <label>Type Of Workout</label>
                                                <select className="input-box" onChange={(e) => { handleChange("typeOfWorkout", e.target.value) }}>
                                                    <option>Choose Workout</option>
                                                    {workoutList.map(({ _id, name }, index1) => <option key={'wprkoptionkey' + index1} value={_id} >{name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-12">
                                            <div className="position-relative">
                                                <label>Gender</label>
                                                <select className="input-box" onChange={(e) => { handleChange("gender", e.target.value) }}>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-12">
                                            <div className="training_btn bg-transparent text-primary mb-3" onClick={() => { onSubmitFilter() }}>Submit</div>
                                            <div className="training_btn" onClick={() => { setFilterObj({ availablestatus: status, isfilter: false, isStandardTrainers: true, ratings: "", typeOfWorkout: "", gender: "" }); GetList(status) }}>Cancel</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="row">
                        {List}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Trainer;