import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
    starsCount: number;
    commitsTitles: string[];
    avgCommitsPerWeek: number[];
}

export class RepoCard extends React.Component<Props> {
    render() {
        return (
        <Container>
            <Row>
                <Col>
                    Stars count: 
                </Col>
                <Col>
                    {this.props.starsCount}
                </Col>
            </Row>
            <Row>
                <Col>
                    Last three commits titles:
                </Col>
                <Col>
                    <ul>
                        {this.props.commitsTitles.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    Avg commits per week over last year: 
                </Col>
                <Col>
                    <ul>
                        {this.props.avgCommitsPerWeek.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                    </ul>
                </Col>
            </Row>
        </Container>
        )
    }
}
