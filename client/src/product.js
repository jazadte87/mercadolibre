import React from 'react'
import Breadcrumb from "./breadcrumb";

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null,
            greeting: ''
        };
    }

    componentDidMount(){
        fetch("/api/items/"+this.props.match.params.id)
            .then(response => response.json())
            .then((response)=>{
                this.setState({ product:response.item ,breadcrumb:response.categories});
            });
    }

    getCondition(){
        return (this.state.product && this.state.product.condition === "used") ? "Usado" : "Nuevo";
    }

    render() {
        if(!this.state.product){
            return <div></div>
        }
        let picture =  this.state.product.picture;
        let condition = this.getCondition();
        return(
            <section className="container-fluid">
                <div className="row">
                    <div className="breadcrumb-product-description">
                        <Breadcrumb data={this.state.breadcrumb} />
                        <div className="col-md-12">
                            <div className="row bg-product">
                                <div className="col-md-9 box-img-product">
                                    <img src={picture} alt={this.state.product.title} title="iphone product"/>
                                        <h3>Descripción del producto</h3>
                                        <p>{this.state.product.moreDescriptions}</p>
                                </div>
                                <div className="col-md-3 box-description-product">
                                    <ul>
                                        <li>
                                            <span className="cant-seller">{condition} - {this.state.product.sold_quantity} Vendidos</span>
                                        </li>
                                        <li>
                                            <h2 className="title-product">{this.state.product.title}</h2>
                                        </li>
                                        <li>
                                            <span className="price">${this.state.product.price.amount}</span>
                                        </li>
                                    </ul>
                                    <button className="btn btn-ml btn-primary">Comprar</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Product