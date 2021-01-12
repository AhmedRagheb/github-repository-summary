import React from "react";
import { Container, Row, Col } from "react-bootstrap/esm";
import { RepoCard } from "./Components/RepoCard";
import { Search } from "./Components/Search";

interface Props { }

interface State {
    starsCount: number;
    commitsTitles: string[];
    avgCommitsPerWeek: number[];
};

export class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            starsCount: 0,
            commitsTitles: [],
            avgCommitsPerWeek: []
        };

        this.updateHomeState = this.updateHomeState.bind(this);
    }

    updateHomeState(starsCount: number, commitsTitles: string[], avgCommitsPerWeek: number[]) {
        this.setState({
            starsCount,
            commitsTitles,
            avgCommitsPerWeek
        });
    }

    render() {
        return (
            <Container>
                <Row xs={3}>
                    <Col>
                        <Search updateHomeState={this.updateHomeState} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RepoCard starsCount={this.state.starsCount}
                            commitsTitles={this.state.commitsTitles}
                            avgCommitsPerWeek={this.state.avgCommitsPerWeek} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
