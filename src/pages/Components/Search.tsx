import React, { BaseSyntheticEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { api } from "../../services/Api/GithubApiProxy";

interface Props {
    updateHomeState(starsCount: number, commitsTitles: string[], avgCommitsPerWeek: number[]): any;
}

interface State {
    repoName: string;
    ownerName: string;
};

export class Search extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            repoName: '',
            ownerName: ''
        };

        this.search = this.search.bind(this);
        this.handleRepoChange = this.handleRepoChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
    }

    private handleRepoChange(event: BaseSyntheticEvent) {
        this.setState({ repoName: event.target.value });
    }

    private handleOwnerChange(event: BaseSyntheticEvent) {
        this.setState({ ownerName: event.target.value });
    }

    private async search(e: any) {
        e.preventDefault();

        const numberOfCommitsToRetrieve = 3;

        const repoDetails = await api.getRepoDetails(this.state.repoName, this.state.ownerName);
        const repoCommits = await api.getRepoCommits(this.state.repoName, this.state.ownerName, numberOfCommitsToRetrieve);
        const repoCommitStats = await api.getRepoCommitStats(this.state.repoName, this.state.ownerName);

        const starsCount = repoDetails.stargazers_count;
        const commitsTitles = repoCommits.map(c => c.commit.message);
        const avgCommitsPerWeek = repoCommitStats.map(c => c.total);

        this.props.updateHomeState(starsCount, commitsTitles, avgCommitsPerWeek);
    }

    render() {
        return (
            <Form id="searchForm" onSubmit={this.search} noValidate autoComplete="off">
                <Form.Group>
                    <Form.Control id="repoName" value={this.state.repoName} onChange={this.handleRepoChange} type="text" placeholder="repository name" />
                </Form.Group>

                <Form.Group>
                    <Form.Control id="ownerName" value={this.state.ownerName} onChange={this.handleOwnerChange} type="text" placeholder="owner name" />
                </Form.Group>

                <Button id="search" variant="primary" type="submit">search</Button>
            </Form>
        )
    }
}
