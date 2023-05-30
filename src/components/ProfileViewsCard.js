import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function ProfileViewsCard({}){
    const userData = useContext(UserContext);

    return (
        <div class="box mb-3 shadow-sm rounded bg-white view-box overflow-hidden">
            <div class="box-title border-bottom p-3">
            <h6 class="m-0">Profile Views</h6>
            </div>
            <div class="d-flex text-center">
            <div class="col-6 border-right py-4 px-2">
                <h5 class="font-weight-bold text-info mb-1">
                08 <i class="feather-bar-chart-2"></i>
                </h5>
                <p class="mb-0 text-black-50 small">last 5 days</p>
            </div>
            <div class="col-6 py-4 px-2">
                <h5 class="font-weight-bold text-success mb-1">
                + 43% <i class="feather-bar-chart"></i>
                </h5>
                <p class="mb-0 text-black-50 small">Since last week</p>
            </div>
            </div>
            <div class="overflow-hidden border-top text-center">
            <img src="./img/chart.png" class="img-fluid" alt="Responsive image" />
            </div>
        </div>
    )
}