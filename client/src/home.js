import React from 'react'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            greeting: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.name){
            this.props.history.push(`/list/${this.state.name}`)
        }
    }

    render() {
        return(
            <div>
                <header className="bg-ml">
                    <div className="box-brand-form">
                        <nav className="navbar navbar-light">
                            <div className="input-group form-width">
                                <div className="input-group-prepend">
                                    <label className="brand-ml">
                                        <img alt="logo" src="/assets/Logo_ML@2x.png.png"/>
                                    </label>
                                </div>
                                <input type="text" className="form-control" placeholder="Nunca dejes de buscar" value={this.state.name} onChange={this.handleChange}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.handleSubmit}>
                                            <i className="icon-search"></i>
                                        </button>
                                    </div>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}
export default Home