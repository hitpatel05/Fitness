import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';

function Notifications() {
    const [open, setOpen] = useState(true);
    const [openTextNotification, setTextNotification] = useState(true);
    const [openMailingNotification, setMailingNotification] = useState(true);
    const [openEmailNotification, setEmailNotification] = useState(true);

    const [isActiveAppNotification, setActive] = useState(true);
    const [isActiveTextNotification, setActiveTextNotification] = useState(true);
    const [isActiveMailingNotification, setActiveMailingNotification] = useState(true);
    const [isActiveEmailNotification, setActiveEmailNotification] = useState(true);

    const onRadioClick = async (source) => {
        setOpen(!open)
        setActive(!isActiveAppNotification);
    };

    const onRadioClickTextNotification = async (source) => {
        setTextNotification(!openTextNotification)
        setActiveTextNotification(!isActiveTextNotification);
    };

    const onRadioClickMailingNotification = async (source) => {
        setMailingNotification(!openMailingNotification)
        setActiveMailingNotification(!isActiveMailingNotification);
    };

    const onRadioClickEmailgNotification = async (source) => {
        setEmailNotification(!openEmailNotification)
        setActiveEmailNotification(!isActiveEmailNotification);
    };
    return (
        <>
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
                                            {/* <button type="button" className="btn btn-sm btn-toggle active" onClick={onRadioClick(this)} data-target="#collapsible" data-toggle="collapse" aria-pressed="true" autocomplete="off">
                                    <div className="handle"></div>
                                </button> */}
                                        </div>
                                        <Collapse in={open}>
                                            <div className="well notifi-box">
                                                <div className="position-relative">
                                                    <label>Session Reminder</label>
                                                    <select className="input-box">
                                                        <option>15 mins</option>
                                                        <option>10 mins</option>
                                                    </select>
                                                    <i className="fas fa-chevron-down arrow_i"></i>
                                                </div>
                                                <div className="">
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb1" />
                                                        <label className="custom-control-label" htmlFor="chkb1">Session Request Approved</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb2" />
                                                        <label className="custom-control-label" htmlFor="chkb2">Session Cancellation Notice</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb3" />
                                                        <label className="custom-control-label" htmlFor="chkb3">Payment Processing Information</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb4" />
                                                        <label className="custom-control-label" htmlFor="chkb4">New Workout Summary Posted</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb5" />
                                                        <label className="custom-control-label" htmlFor="chkb5">Workout at least 3x per week</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb6" />
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
                                            {/* <button type="button" className="btn btn-sm btn-toggle active" data-target="#collapsible2" data-toggle="collapse" aria-pressed="true" autocomplete="off">
                                    <div className="handle"></div>
                                </button> */}
                                        </div>
                                        <Collapse in={openTextNotification}>
                                            <div className="well notifi-box">
                                                <div className="position-relative">
                                                    <label>Session Reminder</label>
                                                    <select className="input-box">
                                                        <option>15 mins</option>
                                                        <option>10 mins</option>
                                                    </select>
                                                    <i className="fas fa-chevron-down arrow_i"></i>
                                                </div>
                                                <div className="">
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb7" />
                                                        <label className="custom-control-label" htmlFor="chkb7">Session Request Approved</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb8" />
                                                        <label className="custom-control-label" htmlFor="chkb8">Session Cancellation Notice</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb9" />
                                                        <label className="custom-control-label" htmlFor="chkb9">Payment Processing Information</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb10" />
                                                        <label className="custom-control-label" htmlFor="chkb10">New Workout Summary Posted</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb11" />
                                                        <label className="custom-control-label" htmlFor="chkb11">Workout at least 3x per week</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb12" />
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
                                            {/* <button type="button" className="btn btn-sm btn-toggle active" data-target="#collapsible1" data-toggle="collapse" aria-pressed="true" autocomplete="off">
                                    <div className="handle"></div>
                                </button> */}
                                        </div>
                                        <Collapse in={openEmailNotification}>
                                            <div className="well notifi-box">
                                                <div className="position-relative">
                                                    <label>Session Reminder</label>
                                                    <select className="input-box">
                                                        <option>15 mins</option>
                                                        <option>10 mins</option>
                                                    </select>
                                                    <i className="fas fa-chevron-down arrow_i"></i>
                                                </div>
                                                <div className="">
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb13" />
                                                        <label className="custom-control-label" htmlFor="chkb13">Session Request Approved</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb14" />
                                                        <label className="custom-control-label" htmlFor="chkb14">Session Cancellation Notice</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb15" />
                                                        <label className="custom-control-label" htmlFor="chkb15">Payment Processing Information</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb16" />
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
                                            {/* <button type="button" className="btn btn-sm btn-toggle active" data-target="#collapsible3" data-toggle="collapse" aria-pressed="true" autocomplete="off">
                                    <div className="handle"></div>
                                </button> */}
                                        </div>
                                        <Collapse in={openMailingNotification}>
                                            <div className="well notifi-box">
                                                <div className="position-relative">
                                                    <label>Session Reminder</label>
                                                    <select className="input-box">
                                                        <option>15 mins</option>
                                                        <option>10 mins</option>
                                                    </select>
                                                    <i className="fas fa-chevron-down arrow_i"></i>
                                                </div>
                                                <div className="">
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb17" />
                                                        <label className="custom-control-label" htmlFor="chkb17">Session Request Approved</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3 mr-4">
                                                        <input type="checkbox" className="custom-control-input" id="chkb18" />
                                                        <label className="custom-control-label" htmlFor="chkb18">Session Cancellation Notice</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb19" />
                                                        <label className="custom-control-label" htmlFor="chkb19">Payment Processing Information</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="chkb20" />
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
