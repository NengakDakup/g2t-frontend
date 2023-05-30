import React, { useContext } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";

import UserContext from "../context/UserContext";




export default function Privacy () {
    const userData = useContext(UserContext);
    
    return (
        <MainLayout>
            <Header />
            
            <div class="py-4">
                <div class="container mx-auto col-md-8">
                    
                    <div class="row">

                        <div class="col-md-12">
                            <div id="basics">

                                <div class="mb-3 mt-0">
                                    <h4 class="font-weight-semi-bold">Privacy Policy</h4>
                                </div>


                                

                            </div>

                            <div id="privacy">

                               

                                <div id="privacyAccordion">

                                    <div class="box shadow-sm border rounded bg-white mb-2">
                                        
                                        <div id="privacyCollapseOne" class="collapse show" aria-labelledby="privacyHeadingOne"
                                            data-parent="#privacyAccordion">
                                            <div class="card-body border-top p-3 text-muted">
                                            <p> 
                            Privacy Policy for Gown2town, accessible from www.gown2town.com, one of our main priorities is the privacy history of our visitors. This Privacy Policy document contains types of information that is collected and recorded by gown2town and how we use it.
                        </p>
                        <p>
                            If you have additional questions or require more information about our Privacy Policy, do not 
                            hesitate to contact us.
                        </p>
                        <p>
                            This Privacy Policy applies only to our online activities and is valid for visitors to our website 
                            with regards to the information that they shared and/or collect in gown2town. This policy is not 
                            applicable to any information collected offline or via channels other than this website
                            Consent
                        </p>
                        <p>
                            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                            Information we collect
                            The personal information that you are asked to provide, and the reasons why you are asked to 
                            provide it, will be made clear to you at the point we ask you to provide your personal 
                            information.
                        </p>
                        <p>
                            If you contact us directly, we may receive additional information about you such as your name, 
                            email address, phone number, the contents of the message and/or attachments you may send us, 
                            and any other information you may choose to provide.
                            When you register for an Account, we may ask for your contact information, including items 
                            such as name, company name, address, email address, matric number, year of entry and 
                            telephone number.
                        </p>
                        <p>How we use your information</p>
                        <p>We use the information we collect in various ways, including to:</p>
                        <ul>
                            <li>Provide, operate, and maintain our website</li>
                            <li>Improve, personalize, and expand our website</li>
                            <li>Understand and analyze how you use our website</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you, either directly or through one of our partners, including for 
                                customer service, to provide you with updates and other information relating to the 
                                website, and for marketing and promotional purposes
                            </li>
                            <li>Send you emails</li>
                        </ul>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}