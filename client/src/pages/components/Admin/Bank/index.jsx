import { useState, useEffect,  useMemo } from "react";
import { PencilSquare, PlusSquareDotted, TrashFill } from "react-bootstrap-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EDIT_BANK_DETAILS } from "./../../../../redux/actions";
import './../../../styles/dashboard.scss'
import useBanks from "./../../../../hooks/banks"

const BankPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [banks, setBanks] = useState([])
    const { deleteBank, getBanks } = useBanks() 

    const bankHomeRoute = useMemo(() => (location.pathname === '/admin/banks'), [location.pathname])

    useEffect(() => {
        if(bankHomeRoute){
            (async () => {
                const response = await getBanks()
                setBanks(prev => (response))
            })()
        }
    },[bankHomeRoute])

    const handleBankEdit = bankDetails => {
        dispatch({
            type: EDIT_BANK_DETAILS,
            payload: bankDetails
        })

        navigate('/admin/banks/edit')
    }

    const handleBankDelete = async bankId => {
        const response = await deleteBank(bankId)

        if(response === true){
            // Remove the deleted bank details
            setBanks(prevValues => {
                return prevValues.filter(bank => bank._id !== bankId)
            })
        }
    }

    return (
        <section className="col-md-9 col-sm-12 mb-5">
            <div className="row">            

            { bankHomeRoute
              && <div className="offset-md-1 offset-lg-1 col-lg-9 col-md-8 col-sm-12">
                <div className="row">
              {/* Button to add new bank and a tabular list of registered banks */}
                <div className="col-12 mb-5 d-flex justify-content-md-end justify-content-center">
                    <button type="button" className="btn btn-medium btn-success" onClick={() => { navigate('/admin/banks/register') }}><PlusSquareDotted className="text-white mx-3" /> Add Bank</button>
                </div>
                <br/>
                    {/* Table showing list of banks */}
                    <div className="col-md-12 table-responsive">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Code</th>

                        {/* Action buttons header */}
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {banks.length > 0 && banks.map((bank, index) => {
                                    return <tr key={bank._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{bank.name}</td>
                                        <td>{bank.slug}</td>
                                        <td>{bank.code}</td>

                                    {/* Action buttons */}
                                        <td colSpan={2} className="d-flex justify-content-around pb-4 align-items-start">
                                            <button className="btn btn-small btn-primary d-flex" onClick={() => handleBankEdit(bank)}>
                                                <PencilSquare className="fs-5 text-white mx-1" /> Edit
                                            </button>

                                            <button className="btn btn-small btn-danger d-flex" onClick={() => handleBankDelete(bank._id)}>
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

export default BankPage