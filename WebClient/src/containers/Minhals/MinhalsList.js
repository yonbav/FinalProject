import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { defaultFilterMethod, EnumFunctions, Constants } from '../../Common';
import { deleteMinhal, getAllMinhals, deleteGuidance, getAllGuidances } from '../../store/api';
import { getAllMinhalsSuccess, deleteMinhalSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class MinhalsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteMinhal = this.deleteMinhal.bind(this);
        this.deleteGuidance = this.deleteGuidance.bind(this);
        this.deleteAdministration = this.deleteAdministration.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllMinhals(this.props.loggedUser.token).then(res => {
            // If failed to get all minhals
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to get all administrations.'
                })
            }

            let allAdministrations = [];

            res.data.forEach(minhal => {
                minhal.type = Constants.ADMINISTRATIONS.MINHAL;                
                allAdministrations.push(minhal)
            });

            getAllGuidances(this.props.loggedUser.token).then(res => {
                
                // If failed to get all guidances
                if (res.status < 200 || res.status >= 300) {
                    this.props.showMessage({
                        type: 'error',
                        msg: 'Failed to get all administrations.'
                    })
                }

                res.data.forEach(guidance => {
                    guidance.type = Constants.ADMINISTRATIONS.GUIDANCE;                    
                    allAdministrations.push(guidance)
                });

                this.props.getAllMinhalsSuccess(allAdministrations);
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all Administrations.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    componentDidMount() {
        document.getElementById("minhalTable").scrollIntoView();
    }

    deleteAdministration(id, type) {
        if(type === Constants.ADMINISTRATIONS.MINHAL)
        {
            this.deleteMinhal(id);
        }
        else if (type === Constants.ADMINISTRATIONS.GUIDANCE)
        {
            this.deleteGuidance(id);
        }
        else 
        {
            this.props.showMessage({
                type: 'error',
                msg: 'Unknown administration type!'
            })
        }
    }

    deleteGuidance(guidanceId) {
        this.props.showFullLoader();
        deleteGuidance({ _id: guidanceId }, this.props.loggedUser.token).then(res => {
            // If failed to delete the guidance
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to delete administration.'
                })
                return;
            }

            this.props.deleteMinhalSuccess(guidanceId);
            this.props.showMessage({
                type: 'success',
                msg: 'Administration was deleted.'
            });
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to delete administration.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        })

    }

    deleteMinhal(minhalid) {
        this.props.showFullLoader();
        deleteMinhal({ _id: minhalid }, this.props.loggedUser.token).then(res => {
            // If failed to delete the minhal
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to delete administration.'
                })
                return;
            }

            this.props.deleteMinhalSuccess(minhalid);
            this.props.showMessage({
                type: 'success',
                msg: 'Administration was deleted.'
            });
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to delete administration.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        })
    }

    render() {
        const columns = [{
            Header: 'Title',
            accessor: 'title',
            Cell: props => <div>{props.value}</div>
        }, {
            Header: 'Type',
            id: "type",
            accessor: item => EnumFunctions.AdministrationEnumToString(item.type),
            Cell: props => <div>{props.value}</div>,
        },{
            Header: 'File Name',
            accessor: 'image',
            Cell: props => <a href={`${Constants.SERVER_URL}${Constants.PDF_FOLDER_NAME}${props.value}`}>{props.value}</a>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <Link to={"/Minhals/EditMinhal/" + props.value}>Edit</Link>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <button onClick={() => this.deleteAdministration(props.value, props.original.type)} className="btn btn-link">Delete</button>
        }];

        return <div id="minhalTable"><ReactTable filterable defaultFilterMethod={(filter, row) => defaultFilterMethod(filter, row)} defaultPageSize={10} className="react-table-default" data={this.props.minhalsList} columns={columns} /></div>
    }
}


const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { minhalsList } = state.minhals;
    return { minhalsList, loggedUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllMinhalsSuccess: (allMinhals) => { dispatch(getAllMinhalsSuccess(allMinhals)) },
        deleteMinhalSuccess: (minhalId) => { dispatch(deleteMinhalSuccess(minhalId)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MinhalsList)