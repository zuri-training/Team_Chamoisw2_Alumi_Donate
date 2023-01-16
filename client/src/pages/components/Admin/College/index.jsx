import { useState, useEffect, useMemo } from "react";
import useColleges from "../../../../hooks/colleges";
import { PencilSquare, PlusSquareDotted, TrashFill } from "react-bootstrap-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { EDIT_COLLEGE_DETAILS } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const CollegesPage = () => {
    const { getCollegesFullDetails, deleteCollege } = useColleges()
    const [colleges, setColleges] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const isCollegeHomeRoute = useMemo(() => (location.pathname === '/admin/colleges'), [location.pathname])

    // Fetch all registered colleges
    useEffect(() => {
        if(isCollegeHomeRoute){
            (async () => {
                setColleges(await getCollegesFullDetails())
            })()
        }
    }, [isCollegeHomeRoute])

    const handleCollegeEdit = collegeDetails => {
        dispatch({
            type: EDIT_COLLEGE_DETAILS,
            payload: collegeDetails
        })

        navigate('/admin/colleges/edit')
    }

    const handleCollegeDelete = async collegeId => {
        const response = await deleteCollege(collegeId)

        if(response === true){
            // Remove the deleted college from the list of colleges
            setColleges(prevValues => {
                return prevValues.filter(college => college._id !== collegeId)
            })
        }
    }

    return (
        <section className="col-md-9 mb-5">
            {/* Button to add new college and a tabular list of registered colleges */}
            { colleges.length >= 0 && isCollegeHomeRoute
              && <>
                <div className="col-12 mb-5 d-flex justify-content-md-end justify-content-sm-center">
                    <button type="button" className="btn btn-medium btn-success" onClick={() => navigate('/admin/colleges/register')}><PlusSquareDotted className="text-white mx-3" /> Register College (Institution)</button>
                </div>

                <br/>
                    {/* Table showing list of colleges */}
                    <div className="col-12 table-responsive">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>College (Institution)</th>
                                    <th>Location</th>
                                    <th>Email</th>
                                    <th>Phone nos</th>
                                    <th>Total Donations</th>

                        {/* Action buttons header */}
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colleges.length > 0 && colleges.map((singleCollege, index) => {
                                    return <tr key={singleCollege._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{singleCollege.name}</td>
                                        <td>{singleCollege.location}</td>
                                        <td>{singleCollege.contact.email}</td>
                                        <td dangerouslySetInnerHTML={{__html: singleCollege.contact.phoneNumbers.join('<br/>')}}></td>
                                        <td>{singleCollege.totalDonations}</td>

                                    {/* Action buttons */}
                                        <td>
                                            <button className="btn btn-small btn-primary d-flex" onClick={() => handleCollegeEdit(singleCollege)}>
                                                <PencilSquare className="fs-5 text-white mx-1" /> Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-small btn-danger d-flex" onClick={() => handleCollegeDelete(singleCollege._id)}>
                                                <TrashFill className="fs-5 text-white mx-1" /> Delete
                                            </button>
                                        </td>
                                    </tr>;
                                })}
                                {
                                    colleges.length === 0 && <tr><td colSpan={8}>You haven't registered any college yet</td></tr>
                                }
                            </tbody>
                        </table>
                </div>
            </>
            }

            <Outlet />
        </section>
    )
}

export default CollegesPage