import React from 'react'

class Breadcrumb extends React.Component {

    _breadcrumb(data){
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {data.map(data => <li className="breadcrumb-item" key={`data_${data}`}><a href={`/list/${data}`}>{data}</a></li>)}
                </ol>
            </nav>
        )
    }

    render() {
        return(
            <div className="container-fluid breadcrumb-product-description">
                {this._breadcrumb(this.props.data)}
            </div>
        )
    }

}

export default Breadcrumb