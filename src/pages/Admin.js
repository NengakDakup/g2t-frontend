import Card from "../components/card/Card"
import Header from "../components/Header"
import MainLayout from "../components/layouts/MainLayout"

import GeoChart from "../components/chart/geechart"
import {LineChart} from "../components/chart/linechart"
import {PieChart} from "../components/chart/piechart"
import {DoughnutChart} from "../components/chart/doughnutchart"
import {PolarChart} from "../components/chart/polarchart"
import AdminLayout from "../components/layouts/AdminLayout"

export default function Admin(){
    return (
        <MainLayout>
        <Header />

        
        <AdminLayout>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <p className="text-primary">Users Distribution Graph</p>
                        <GeoChart />
                    </Card>
                </div>
                
                <div className="col-md-6">
                    <Card>
                        <p className="text-primary">Proportion of Graduate Without Job After Six Months</p>
                        <PieChart />
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card>
                        <p className="text-primary">Jobless Graduate Diploma by Gender</p>
                        <DoughnutChart />
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card>
                        <p className="text-primary">Graduates Pursuing Higher Degree</p>
                        <PolarChart />
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card>
                        <p className="text-primary">Users Salary Graph</p>
                        <LineChart />
                    </Card>
                </div>
            </div>
        </AdminLayout>
    </MainLayout>
    )
}