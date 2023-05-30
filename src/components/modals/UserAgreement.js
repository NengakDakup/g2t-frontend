import React from "react"

const UserAgreement = () => {
    return (
        <div className="modal fade" id="userAgreement" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">User Agreement</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>CCPA Privacy Rights (Do Not Sell My Personal Information)</p>
                        <p>Under the CCPA, among other rights, California consumers have the right to
                        Request that a business that collects a consumer's personal data disclose the categories and 
                        specific pieces of personal data that a business has collected about consumers.
                        Request that a business delete any personal data about the consumer that a business has 
                        collected.</p>
                        <p>
                        Request that a business that sells a consumer's personal data, not sell the consumer's personal 
                        data.
                        If you make a request, we have one month to respond to you. If you would like to exercise any of 
                        these rights, please contact us.
                        </p>
                        <p>GDPR Data Protection Rights</p>
                        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user 
                            is entitled to the following:</p>
                        <p>The right to access – You have the right to request copies of your personal data. We may charge 
                        you a small fee for this service.</p>
                        <p>The right to rectification – You have the right to request that we correct any information you 
                        believe is inaccurate. You also have the right to request that we complete the information you 
                        believe is incomplete.</p>
                        <p>The right to erasure – You have the right to request that we erase your personal data, under 
                        certain conditions.</p>
                        <p>The right to restrict processing – You have the right to request that we restrict the processing of 
                        your personal data, under certain conditions.</p>
                        <p>The right to object to processing – You have the right to object to our processing of your 
                        personal data, under certain conditions.</p>
                        <p>The right to data portability – You have the right to request that we transfer the data that we have 
                        collected to another organization, or directly to you, under certain conditions.</p>
                        <p>If you make a request, we have one month to respond to you. If you would like to exercise any of 
                         these rights, please contact us</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAgreement