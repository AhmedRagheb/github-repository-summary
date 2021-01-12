import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Search } from "./Search";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { api } from "../../services/Api/GithubApiProxy";
import { Commit } from "../../services/Models/Commit";
import { RepoDetails } from "../../services/Models/RepoDetails";
import { CommitActivity } from "../../services/Models/CommitActivity";

describe('Search', () => {
    let container: HTMLElement;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("render", () => {
        act(() => {
            const updateHomeState = jest.fn();
            render(<Search updateHomeState={updateHomeState} />, container);
        });
        let submit = container.querySelector('Button[type="submit"]');
        expect(submit).toBeVisible();
    });

    it('should set state of repoName when value changed', () => {
        const updateHomeState = jest.fn();
        const event = {
            preventDefault() { },
            target: { value: 'repo name' }
        };
        const wrapper = shallow(<Search updateHomeState={updateHomeState} />);
        const instance = wrapper.instance();
        wrapper.find('#repoName').simulate('change', event);

        expect(instance.state.repoName).toBe('repo name');
    });

    it('should set state of ownerName when value changed', () => {
        const updateHomeState = jest.fn();
        const event = {
            preventDefault() { },
            target: { value: 'owner name' }
        };
        const wrapper = shallow(<Search updateHomeState={updateHomeState} />);
        const instance = wrapper.instance();
        wrapper.find('#ownerName').simulate('change', event);

        expect(instance.state.ownerName).toBe('owner name');
    });

    it('should update home state when click search', () => {
        const updateHomeState = { starsCount: 5, commitsTitles: ['merge to master'], avgCommitsPerWeek: [2] };
        const event = {
            preventDefault() { }
        };
        const wrapper = shallow(<Search updateHomeState={updateHomeState} />);
        const instance = wrapper.instance();
        const searchBtn = wrapper.find('#searchForm');

        searchBtn.simulate('submit', event);

        const repoCommits = Promise.resolve([
            {
                commit: {
                    message: 'merge to master'
                }
            }
        ] as Commit[]);
        const repoDetails = Promise.resolve(
            {
                stargazers_count: 5
            } as RepoDetails);
        const commitStats = Promise.resolve([
            {
                total: 2
            }
        ] as CommitActivity[]);

        jest.spyOn(api, 'getRepoDetails').mockImplementation(() => repoDetails);
        jest.spyOn(api, 'getRepoCommits').mockImplementation(() => repoCommits);
        jest.spyOn(api, 'getRepoCommitStats').mockImplementation(() => commitStats);

        expect(instance.props.updateHomeState).toBe(updateHomeState);
    });
});
