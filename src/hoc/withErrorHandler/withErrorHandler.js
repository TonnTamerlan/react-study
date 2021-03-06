import React, { Component } from 'react';
import Auxwrap from '../Auxwrap/Auxwrap';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {

            this.reqIntercetor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.respIntersetor = axios.interceptors.response.use(resp => resp, error => {
                this.setState({ error: error })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqIntercetor);
            axios.interceptors.response.eject(this.respIntersetor);
        }

        errorConfirmHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxwrap>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxwrap>
            )
        }
    }
}

export default withErrorHandler;
