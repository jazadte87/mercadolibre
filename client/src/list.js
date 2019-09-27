import React from 'react'
import Breadcrumb from "./breadcrumb";

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            fetched:false,
            query:""
        };
    }

    fetchData = ()=> {
        fetch("/api/items?search=" + this.props.match.params.search)
            .then(response => response.json())
            .then((response)=>{
                this.setState({ products : response.items , query : this.props.match.params.search ,fetched : false , breadcrumb:response.categories});
            });
    }

    componentDidMount(){
        this.fetchData();
    }

    componentDidUpdate(){
        if(!this.state.fetched && this.props.match.params.search !== this.state.query){
            this.setState({fetched:true},this.fetchData)
        }
    }

    generateLi(){
        let li = [];
        for (var i in this.state.products) {
            li.push({link:"/product/"+this.state.products[i].id,img:this.state.products[i].picture,price:this.state.products[i].price.amount,descr:this.state.products[i].title,location:this.state.products[i].state_name})

        }
        return li;
    }

    render() {
        if(!this.state.products){
            return <div></div>
        }
        let li = this.generateLi();


        return (

        <section className="container-fluid">
            <div className="row">
                <div className="breadcrumb-product-description">
                    <Breadcrumb data={this.state.breadcrumb} />
                    <div className="row bg-product product-list">
                        <ul className="col-md-12">
                            {
                                li.map((item, i)=>{
                                    return (
                                        <a href={item.link} key={i} className="cart-product link-list-product">
                                        <li className=" row">
                                            <div className="img-cart col-md-auto">
                                                <div className="mask-img">
                                                    <img src={item.img} alt={item.descr} title={item.descr}/>
                                                </div>
                                            </div>
                                            <div className="info-cart col-md-6">
                                                <h3 className="price">${item.price} <i className="icon-shipping"></i></h3>
                                                <p> {item.descr}</p>
                                            </div>
                                            <div className="location col-md-2">
                                                <h4>{item.location}</h4>
                                            </div>
                                        </li>
                                        </a>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
export default List