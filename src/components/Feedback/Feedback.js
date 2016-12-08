/**
 * Created by vuchien on 8/25/16.
 */

import React from 'react';
import s from './Feedback.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MainSection from './section/MainSection';
import {maskBody} from '../../core/ui/modal';

class Feedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formMainFeedback: ""
        };
        this.idPopup = "formFeedback";
    }

    showFormFeedback() {
        this.setState({formMainFeedback: ""}, function () {
            this.setState({formMainFeedback: <MainSection idPopup={this.idPopup}/>});
        });
        maskBody();
    }

    render() {
        let {marginTop} = this.props;
        if (marginTop == undefined) {
            marginTop = "";
        }
        return (
                <div className={s.wrapperFeedback} style={{marginTop: marginTop}}>
                    {this.state.formMainFeedback}
                    <div className={s.feedback}>
                        <a onClick={this.showFormFeedback.bind(this)}>Phản hồi & Yêu cầu</a>
                    </div>
                </div>
                            )
                }
    }

    export default withStyles(s)(Feedback);
