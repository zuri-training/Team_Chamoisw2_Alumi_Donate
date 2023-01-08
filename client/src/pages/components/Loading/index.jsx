import './../../styles/loading.scss'

const Loader = ({ visible }) => {

 return visible && (
<div className='loading-body'>
    <div className="loading-container">
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    <div className="block"></div>
    </div>
</div>)
}

export default Loader