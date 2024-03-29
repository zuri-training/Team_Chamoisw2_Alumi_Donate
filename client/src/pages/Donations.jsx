import React, { useEffect, useState } from 'react'
import useDonations from './../hooks/donations';

const Donations = () => {
    const { getDonations } = useDonations()
    const [donationsList, setDonationsList] = useState([])

    useEffect(() => {
        (async () => {
            setDonationsList(await getDonations())
        })()
    }, [])

    return (
        <>
        <main className='container h-auto'>
            {/* Tabular list of donations sorted by most recent from top to bottom*/}
            <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Institution</th>
                    <th>Location</th>
                    <th>Donated by</th>
                    <th>Graduation Year</th>
                    <th>Amount Donated</th>
                </tr>
            </thead>
            <tbody>
                {
                  donationsList.length > 0 && donationsList.map((donationInfo, index) => {
                    return <tr key={ donationInfo._id }>
                                <th scope="row">{ index + 1 }</th>
                                <td>{ donationInfo.collegeId.name }</td>
                                <td>{ donationInfo.collegeId.location }</td>
                                <td>{ donationInfo.isAnonymous === true ? 'Anonymous Alumni' : donationInfo.userId.fullName }</td>
                                <td>{ donationInfo.userId.gradYear }</td>
                                <td>{ donationInfo.amount }</td>
                            </tr>
                  })
                  
                }
                {
                    donationsList.length === 0 && <tr><td colSpan="6">No donations found</td> </tr>
                }
            </tbody>
            </table>
        </main>
        </>
    )
}

export default Donations