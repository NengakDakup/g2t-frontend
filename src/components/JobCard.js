import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function JobCard({job}){
    const userData = useContext(UserContext);

    return (
        <Link to={"/job/" + job.id} className="col col-md-6">
            <div className="shadow-sm border rounded bg-white job-item job-item mr-2 mt-3 mb-3">
                <div className="d-flex align-items-center p-3 job-item-header">
                <div className="overflow-hidden mr-2">
                    <h6 className="font-weight-bold text-dark mb-0 text-truncate">
                    {job.title}
                    </h6>
                    <div className="text-truncate text-primary">
                    {job.companyName}
                    </div>
                    <div className="small text-gray-500">
                    <i className="feather-map-pin"></i> {job.location}
                    </div>
                </div>
                <img className="img-fluid ml-auto" src={job.companyImage} alt="" />
                </div>
                <div className="p-3 job-item-footer">
                <small className="text-gray-500"><i className="feather-clock"></i> {moment(job.date).format('LL')}</small>
                </div>
            </div>
        </Link>
    )
}