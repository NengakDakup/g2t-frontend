import React from "react"

const CookiePolicy = () => {
    return (
        <div className="modal fade" id="cookiePolicy" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Cookie Policy</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Log Files</p>
                        <p>gown2town follows a standard procedure of using log files. These files log visitors when they 
                        visit websites. All hosting companies do this and a part of hosting services' analytics. The 
                        information collected by log files include internet protocol (IP) addresses, browser type, Internet 
                        Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of 
                        clicks. These are not linked to any information that is personally identifiable. The purpose of the 
                        information is for analyzing trends, administering the site, tracking users' movement on the 
                        website, and gathering demographic information.</p>
                        <p>Cookies and Web Beacons</p>
                        <p>Like any other website, gown2town uses 'cookies'. These cookies are used to store information 
                        including visitors' preferences, and the pages on the website that the visitor accessed or visited. 
                        The information is used to optimize the users' experience by customizing our web page content 
                        based on visitors' browser type and/or other information.</p>
                        <p>Advertising Partners Privacy Policies</p>
                        <p>You may consult this list to find the Privacy Policy for each of the advertising partners of 
                        gown2town.</p>
                        <p>
                        Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web 
                        Beacons that are used in their respective advertisements and links that appear on gown2town, 
                        which are sent directly to users' browser. They automatically receive your IP address when this 
                        occurs. These technologies are used to measure the effectiveness of their advertising campaigns 
                        and/or to personalize the advertising content that you see on websites that you visit.
                        Note that gown2town has no access to or control over these cookies that are used by third-party 
                        advertisers.</p>
                        <p>
                        Third Party Privacy Policies</p>
                        <p>gown2town's Privacy Policy does not apply to other advertisers or websites. Thus, we are 
                        advising you to consult the respective Privacy Policies of these third-party ad servers for more 
                        detailed information. It may include their practices and instructions about how to opt-out of 
                        certain options.</p>
                        <p>
                        You can choose to disable cookies through your individual browser options. To know more 
                        detailed information about cookie management with specific web browsers, it can be found at the 
                        browsers' respective websites.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CookiePolicy