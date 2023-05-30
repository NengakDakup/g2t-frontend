import React from "react"

const PrivacyPolicy = () => {
    return (
        <div className="modal fade" id="privacyPolicy" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Privacy Policy</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
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
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy