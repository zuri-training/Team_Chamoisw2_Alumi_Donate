import { useEffect, useState, useMemo } from "react";
import { PencilSquare, PlusSquareDotted, TrashFill } from "react-bootstrap-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EDIT_ADMIN_DETAILS } from "../../../redux/actions";
import useUserProfile from "../../../hooks/profile";
import useAuth from "../../../hooks/auth";
import Sidebar from "../Sidebar";
import './../../styles/dashboard.scss'

const AdminPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { deleteAdmin, getAdmins } = useUserProfile()
    const { userIsAdmin } = useAuth()
    const [admins, setAdmins] = useState([])
    const adminHomeRoute = useMemo(() => (location.pathname === '/admin'), [location.pathname])
    const isAdmin = useMemo(() => (userIsAdmin()), [location.pathname])
    const adminsList = useMemo(() => (getAdmins()),[location.pathname])

    useEffect(() => {
        if(!isAdmin) {
            navigate("/admin/login")
        }
    },[isAdmin])

    useEffect(() => {
        
        adminsList.then((res) => {
            setAdmins(res)
        })
        
    }, [adminsList])

    const handleAdminEdit = adminDetails => {
        dispatch({
            type: EDIT_ADMIN_DETAILS,
            payload: adminDetails
        })

        navigate('/admin/edit')
    }

    const handleAdminDelete = async adminId => {
        const response = await deleteAdmin(adminId)

        if(response === true){
            // Remove the deleted admin details
            setAdmins(prevValues => {
                return prevValues.filter(admin => admin._id !== adminId)
            })
        }
    }

    return (
        <section className="col-12 mb-5">
            <div className="row">
            {/* Admin sidebar */}
            {
                isAdmin && 
                <div className="col-lg-2 col-md-3 col-sm-12 d-flex justify-content-center">
                    <nav className="sidebar sidebar-offcanvas position-sticky" id="sidebar">
                    <Sidebar isAdmin={true} />
                    </nav>
                </div>
            }
            

            { admins && admins.length > 0 && adminHomeRoute
              && <div className="offset-md-1 offset-lg-1 col-lg-9 col-md-8 col-sm-12">
                <div className="row">
              {/* Button to add new admin and a tabular list of registered admins */}
                <div className="col-12 mb-5 d-flex justify-content-md-end justify-content-center">
                    <button type="button" className="btn btn-medium btn-success" onClick={() => { navigate('/admin/register') }}><PlusSquareDotted className="text-white mx-3" /> Add Admin</button>
                </div>
                <br/>
                    {/* Table showing list of admins */}
                    <div className="col-md-12 table-responsive">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone no</th>

                        {/* Action buttons header */}
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.length > 0 && admins.map((admin, index) => {
                                    return <tr key={admin._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{admin.fullName}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.phoneNumber}</td>

                                    {/* Action buttons */}
                                        <td colSpan={2} className="d-flex justify-content-around pb-4 align-items-start">
                                            <button className="btn btn-small btn-primary d-flex" onClick={() => handleAdminEdit(admin)}>
                                                <PencilSquare className="fs-5 text-white mx-1" /> Edit
                                            </button>

                                            <button className="btn btn-small btn-danger d-flex" onClick={() => handleAdminDelete(admin._id)}>
                                                <TrashFill className="fs-5 text-white mx-1" /> Delete
                                            </button>
                                        </td>
                                    </tr>;
                                })}
                            </tbody>
                        </table>
                </div>
            </div>
            </div>
            }

            <Outlet />
            </div>
        </section>
    )
}

export default AdminPage