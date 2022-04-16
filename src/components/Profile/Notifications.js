import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Collapse } from "react-bootstrap";
import swal from 'sweetalert';
import { apiUrl, PORT } from '../../environment/environment';


function Notifications() {
    const [open, setOpen] = useState(true);
    const [isLoader, setIsLoader] = useState(true);
    const [openTextNotification, setTextNotification] = useState(true);
    const [openMailingNotification, setMailingNotification] = useState(true);
    const [openEmailNotification, setEmailNotification] = useState(true);

    const [isActiveAppNotification, setActive] = useState(true);
    const [isActiveTextNotification, setActiveTextNotification] = useState(true);
    const [isActiveMailingNotification, setActiveMailingNotification] = useState(true);
    const [isActiveEmailNotification, setActiveEmailNotification] = useState(true);
    const setMins = [10, 15, 20, 30, 40, 50];
    const [appNotif, setAppNotif] = useState({ isApp: true, appSessionReminder: '', appRequestApproved: false, appCancellationNotice: false, appProcessingInformation: false, appNewWorkoutSummaryPosted: false, appWorkoutatleastperweek: false, appUploadProgressPhotos: false });
    const [textNotif, setTextNotif] = useState({ isText: true, textSessionReminder: '', textRequestApproved: false, textCancellationNotice: false, textProcessingInformation: false, textNewWorkoutSummaryPosted: false, textWorkoutatleastperweek: false, textUploadProgressPhotos: false });
    const [emailNotif, setEmailNotif] = useState({ isEmail: true, emailSessionReminder: '', emailRequestApproved: false, emailCancellationNotice: false, emailProcessingInformation: false, emailNewWorkoutSummaryPosted: false });
    const [mailingNotif, setMailingNotif] = useState({ ismailing: true, mailingSessionReminder: '', mailingRequestApproved: false, mailingCancellationNotice: false, mailingProcessingInformation: false, mailingNewWorkoutSummaryPosted: false });

    useEffect(() => {
        GetList();
    }, []);


    const onRadioClick = async (source) => {
        setOpen(!open)
        setActive(!isActiveAppNotification);
        setAppNotif({ ...appNotif, isApp: isActiveAppNotification });
    };

    const onRadioClickTextNotification = async (source) => {
        setTextNotification(!openTextNotification)
        setActiveTextNotification(!isActiveTextNotification);
        setTextNotif({ ...textNotif, isText: isActiveTextNotification });
    };

    const onRadioClickMailingNotification = async (source) => {
        setMailingNotification(!openMailingNotification)
        setActiveMailingNotification(!isActiveMailingNotification);
        setMailingNotif({ ...mailingNotif, ismailing: isActiveMailingNotification });
    };

    const onRadioClickEmailgNotification = async (source) => {
        setEmailNotification(!openEmailNotification)
        setActiveEmailNotification(!isActiveEmailNotification);
        setEmailNotif({ ...emailNotif, isEmail: isActiveEmailNotification });
    };

    async function GetList() {
        setIsLoader(true);
        await axios.get(`${apiUrl}${PORT}/client/account/getNotification`, {}, {})
            .then(function (response) {
                setIsLoader(false);
                if (response.data.status === 1) { }
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
                swal({
                    title: "Error!",
                    text: error,
                    icon: "error",
                    button: true
                });
            });
    };

    async function updateNotification() {
        debugger
        let notifications = {
            app: appNotif,
            text: textNotif,
            email: emailNotif,
            Mailing: mailingNotif
        }
        debugger
        setIsLoader(true);
        await axios.post(`${apiUrl}${PORT}/client/account/updateNotification`, { notification: notifications}).then(function (response) {
            setIsLoader(false);
            if (response.data.status === 1)
                debugger
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
            swal({
                title: "Error!",
                text: error,
                icon: "error",
                button: true
            });
        });
    };
    return (
        <>
            {isLoader &&
                <div className="loading">
                    <div className="mainloader"></div>
                </div>
            }
            <div className="container-fluid">
                <div className="col-md-12 col-12 p-0">
                    <div className="noti_fications">
                        <div className="row">
                            <div className="col-md-12 col-12">
                                <h1 className="main_title mb-4">Notifications</h1>
                            </div>
                            <div className="col-md-6 col-12 pr-lg-5">
                                <div className="row">
                                    <div className="col-md-12 col-12 mb-3">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h4 className="title_notifi">In-App Notifications</h4>
                                            <button className={isActiveAppNotification ? "btn btn-sm btn-toggle active" : "btn btn-sm btn-toggle"} onClick={() => onRadioClick()} aria-controls="collapsible" aria-expanded={open}>
                                                <div className="handle"></div>
                                            </button>
                                        </div>
                                        <Collapse in={open}>
                                            <div className="well notifi-box">
                                                <div className="position-relative">
                                                    <label>Session Reminder</label>
                                                    <select className="input-box" value={appNotif.appSessionReminder} onChange={(e) => {debugger;  setAppNotif({ ...appNotif, appSessionReminder: e.target.value }); updateNotification(); }}>
                                                        <option value=''> Select session reminder</option>
                                                        {setMins.map((ele) => {
                                                            return <option value={`${ele} mins`}> {ele} mins</option>
                                                        })}
                                                    </select>
                                                    <i className="fas fa-chevron-down arrow_i"></i>
                                                </div>
                                                <div className="">
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb1" checked={appNotif.appRequestApproved} onChange={(e) => { setAppNotif({ ...appNotif, appRequestApproved: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb1">Session Request Approved</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb2" checked={appNotif.appCancellationNotice} onChange={(e) => { setAppNotif({ ...appNotif, appCancellationNotice: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb2">Session Cancellation Notice</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb3" checked={appNotif.appProcessingInformation} onChange={(e) => { setAppNotif({ ...appNotif, appProcessingInformation: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb3">Payment Processing Information</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb4" checked={appNotif.appNewWorkoutSummaryPosted} onChange={(e) => { setAppNotif({ ...appNotif, appNewWorkoutSummaryPosted: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb4">New Workout Summary Posted</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb5" checked={appNotif.appWorkoutatleastperweek} onChange={(e) => { setAppNotif({ ...appNotif, appWorkoutatleastperweek: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb5">Workout at least 3x per week</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb6" checked={appNotif.appUploadProgressPhotos} onChange={(e) => { setAppNotif({ ...appNotif, appUploadProgressPhotos: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb6">Upload Progress Photos</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className="col-md-12 col-12 mb-3">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h4 className="title_notifi">Text Notifications</h4>
                                            <button className={isActiveTextNotification ? "btn btn-sm btn-toggle active" : "btn btn-sm btn-toggle"} onClick={() => onRadioClickTextNotification()} aria-controls="collapsible" aria-expanded={openTextNotification}>
                                                <div className="handle"></div>
                                            </button>
                                        </div>
                                        <Collapse in={openTextNotification}>
                                            <div className="well notifi-box">
                                                <div className="position-relative">
                                                    <label>Session Reminder</label>
                                                    <select className="input-box" value={textNotif.textSessionReminder} onChange={(e) => { setTextNotif({ ...textNotif, textSessionReminder: e.target.value }); }}>
                                                        <option value=''> Select session reminder</option>
                                                        {setMins.map((ele) => {
                                                            return <option value={`${ele} mins`}> {ele} mins</option>
                                                        })}
                                                    </select>
                                                    <i className="fas fa-chevron-down arrow_i"></i>
                                                </div>
                                                <div className="">
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb7" checked={textNotif.textRequestApproved} onChange={(e) => { setTextNotif({ ...textNotif, textRequestApproved: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb7">Session Request Approved</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb8" checked={textNotif.textCancellationNotice} onChange={(e) => { setTextNotif({ ...textNotif, textCancellationNotice: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb8">Session Cancellation Notice</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb9" checked={textNotif.textProcessingInformation} onChange={(e) => { setTextNotif({ ...textNotif, textProcessingInformation: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb9">Payment Processing Information</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb10" checked={textNotif.textNewWorkoutSummaryPosted} onChange={(e) => { setTextNotif({ ...textNotif, textNewWorkoutSummaryPosted: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb10">New Workout Summary Posted</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb11" checked={textNotif.textWorkoutatleastperweek} onChange={(e) => { setTextNotif({ ...textNotif, textWorkoutatleastperweek: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb11">Workout at least 3x per week</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb12" checked={textNotif.textUploadProgressPhotos} onChange={(e) => { setTextNotif({ ...textNotif, textUploadProgressPhotos: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb12">Upload Progress Photos</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 pl-lg-5">
                                <div className="row">
                                    <div className="col-md-12 col-12 mb-3">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h4 className="title_notifi">Email Notifications</h4>
                                            <button className={isActiveEmailNotification ? "btn btn-sm btn-toggle active" : "btn btn-sm btn-toggle"} onClick={() => onRadioClickEmailgNotification()} aria-controls="collapsible" aria-expanded={openEmailNotification}>
                                                <div className="handle"></div>
                                            </button>
                                        </div>
                                        <Collapse in={openEmailNotification}>
                                            <div className="well notifi-box">
                                                <div className="position-relative">
                                                    <label>Session Reminder</label>
                                                    <select className="input-box" value={emailNotif.emailSessionReminder} onChange={(e) => { setEmailNotif({ ...emailNotif, emailSessionReminder: e.target.value }); }}>
                                                        <option value=''> Select session reminder</option>
                                                        {setMins.map((ele) => {
                                                            return <option value={`${ele} mins`}> {ele} mins</option>
                                                        })}
                                                    </select>
                                                    <i className="fas fa-chevron-down arrow_i"></i>
                                                </div>
                                                <div className="">
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb13" checked={emailNotif.emailRequestApproved} onChange={(e) => { setEmailNotif({ ...emailNotif, emailRequestApproved: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb13">Session Request Approved</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb14" checked={emailNotif.emailCancellationNotice} onChange={(e) => { setEmailNotif({ ...emailNotif, emailCancellationNotice: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb14">Session Cancellation Notice</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb15" checked={emailNotif.emailProcessingInformation} onChange={(e) => { setEmailNotif({ ...emailNotif, emailProcessingInformation: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb15">Payment Processing Information</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb16" checked={emailNotif.emailNewWorkoutSummaryPosted} onChange={(e) => { setEmailNotif({ ...emailNotif, emailNewWorkoutSummaryPosted: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb16">New Workout Summary Posted</label>
                                                    </div>

                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>

                                    <div className="col-md-12 col-12 mb-3">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h4 className="title_notifi">Mailing List</h4>
                                            <button className={isActiveMailingNotification ? "btn btn-sm btn-toggle active" : "btn btn-sm btn-toggle"} onClick={() => onRadioClickMailingNotification()} aria-controls="collapsible" aria-expanded={openMailingNotification}>
                                                <div className="handle"></div>
                                            </button>
                                        </div>
                                        <Collapse in={openMailingNotification}>
                                            <div className="well notifi-box">
                                                <div className="position-relative">
                                                    <label>Session Reminder</label>
                                                    <select className="input-box" value={mailingNotif.mailingSessionReminder} onChange={(e) => { setMailingNotif({ ...mailingNotif, mailingSessionReminder: e.target.value }); }}>
                                                        <option value=''> Select session reminder</option>
                                                        {setMins.map((ele) => {
                                                            return <option value={`${ele} mins`}> {ele} mins</option>
                                                        })}
                                                    </select>
                                                    <i className="fas fa-chevron-down arrow_i"></i>
                                                </div>
                                                <div className="">
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb17" checked={mailingNotif.mailingRequestApproved} onChange={(e) => { setMailingNotif({ ...mailingNotif, mailingRequestApproved: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb17">Session Request Approved</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb18" checked={mailingNotif.mailingCancellationNotice} onChange={(e) => { setMailingNotif({ ...mailingNotif, mailingCancellationNotice: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb18">Session Cancellation Notice</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb19" checked={mailingNotif.mailingProcessingInformation} onChange={(e) => { setMailingNotif({ ...mailingNotif, mailingProcessingInformation: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb19">Payment Processing Information</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb20" checked={mailingNotif.mailingNewWorkoutSummaryPosted} onChange={(e) => { setMailingNotif({ ...mailingNotif, mailingNewWorkoutSummaryPosted: e.currentTarget.checked }); }} />
                                                        <label className="custom-control-label" htmlFor="chkb20">New Workout Summary Posted</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notifications;
