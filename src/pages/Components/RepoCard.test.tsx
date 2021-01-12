import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { RepoCard } from "./RepoCard";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

describe('RepoCard Render', () => {
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
            render(<RepoCard starsCount={1}
                commitsTitles={[]}
                avgCommitsPerWeek={[]} />, container);
        });
        expect(container.textContent).toContain("1");

        act(() => {
            render(<RepoCard starsCount={1}
                commitsTitles={['test']}
                avgCommitsPerWeek={[]} />, container);
        });
        expect(container.textContent).toContain("test");

        act(() => {
            render(<RepoCard starsCount={1}
                commitsTitles={['test']}
                avgCommitsPerWeek={[0.8, 2.5]} />, container);
        });
        expect(container.textContent).toContain("2.5");
    });

    it('should set props values', () => {
        const wrapper = shallow(<RepoCard starsCount={1} commitsTitles={['test']} avgCommitsPerWeek={[0.8, 2.5]} />);
        const componentInstance = wrapper.instance();

        expect(componentInstance.props.starsCount).toBe(1);
        expect(componentInstance.props.avgCommitsPerWeek.length).toBe(2);
        expect(componentInstance.props.commitsTitles.length).toBe(1);
    });
});
