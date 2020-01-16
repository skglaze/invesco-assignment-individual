import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Link } from 'react-router-dom'

export default class Investments extends Component {
    state = {
        newInvestment: {},
        investmentList: [],
    }

    componentDidMount() {
        axios.get('/api/investments')
            .then((response) => {
                this.setState({ investmentList: response.data })
            })
    }

    addNewinvestmentToinvestmentList = (newInvestment) => {
        axios.post('/api/investments', newInvestment)
    }

    addNewinvestment = (event) => {
        event.preventDefault()
        this.addNewinvestmentToinvestmentList(this.state.newinvestment)
    }

    handleNewinvestmentChange = (event) => {
        const copyNewinvestment = { ...this.state.newinvestment }
        copyNewinvestment[event.target.name] = event.target.value

        this.setState({ newinvestment: copyNewinvestment })
    }

    render() {
        const investmentListElements = this.state.investmentList.map((investment) => {
            return (
                <div>
                    <Link to={`/${investment._id}`}>
                        <h1>{investment.name}</h1>
                    </Link>
                </div>
            )
        })
        return (
            <div>
                <ul>
                    {investmentListElements}
                </ul>
                <span>
                    <button onClick={this.toggleNewinvestmentForm}>
                        {this.state.newinvestmentForm ? "Hide New investment Form" : "Show New investment Form"}
                    </button>
                </span>
                {this.state.newinvestmentForm ?
                    < form onSubmit={this.addNewinvestment}>
                        <div>
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                value={this.state.newinvestment.name}
                                onChange={this.handleNewinvestmentChange}
                            />
                        </div>
                        <div>
                            <input
                                name="description"
                                type="text"
                                placeholder="Description"
                                value={this.state.newinvestment.description}
                                onChange={this.handleNewinvestmentChange}
                            />
                        </div>
                        <div>
                            <input
                                type="submit"
                                value="Add New investment"
                            />
                        </div>
                    </form> : null}
            </div >
        )
    }
}